import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { SERVER_URL } from "../Common/constants";
import { useNavigate, useLocation } from "react-router-dom";
import styled from '@emotion/styled';
import Pagination from "@mui/material/Pagination";
import SearchComponent from "../Common/SearchComponent";
import Certificate from "./CertificateModal";



// Define constants for the role strings
const ADMIN_ROLE = "ADMIN";
const USER_ROLE = "USER";

function EduApplyList(props) {
    const [eduApply, setEduApply] = useState([]);
    const navigate = useNavigate();
    const { memId } = props;
    const [files, setFiles] = useState([]);
    const userRole = sessionStorage.getItem("role");
    const isAdmin = userRole === ADMIN_ROLE;
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState({ term: '', value: 'eduName' });
    const location = useLocation();
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [currentCertificateData, setCurrentCertificateData] = useState({ name: "", eduName: "" });

    useEffect(() => {
        const apiUrl = isAdmin ? SERVER_URL + 'eduHist' : SERVER_URL + `eduHist/memid/${memId}`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setEduApply(formattedData.reverse());
            })
            .catch(error => console.error("Error fetching eduApply:", error));
    }, [memId, isAdmin]);

    useEffect(() => {
        fetch(SERVER_URL + 'files/table/eduHist')
            .then(response => response.json())
            .then(data => {
                setFiles(data);
            })
            .catch(error => console.error("Error fetching files:", error));
    }, []);

    useEffect(() => {
        if (files.length > 0) {
            const fileMap = {};
            files.forEach(file => {
                if (!fileMap[file.eduHist.eduHistNum]) {
                    fileMap[file.eduHist.eduHistNum] = [];
                }
                fileMap[file.eduHist.eduHistNum].push(file);
            });

            const updatedEduApply = eduApply.map(item => {
                const matchingFiles = fileMap[item.eduHistNum];
                if (matchingFiles && matchingFiles.length) {
                    return {
                        ...item,
                        files: matchingFiles
                    };
                }
                return item;
            });
            setEduApply(updatedEduApply);
        }
    }, [files]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageFromUrl = parseInt(params.get('page'), 10);

        if (!isNaN(pageFromUrl)) {
            setActivePage(pageFromUrl);
        }
    }, [location.search]);

    const handleTitleClick = (eduNum) => {
        navigate(`/edu/detail/${eduNum}`);
    }

    const handleStatusChange = (rowId, newStatus) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        };

        fetch(SERVER_URL + 'eduHist/' + (rowId + 1), requestOptions)
            .then(response => {
                if (response.ok) {
                    const updatedRows = eduApply.map(row =>
                        row.id === rowId ? { ...row, status: newStatus } : row
                    );
                    setEduApply(updatedRows);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error("Error updating status:", error);
            });
    }

    const handleDelete = (rowId) => {
        fetch(SERVER_URL + 'eduHist/' + (rowId + 1), {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const updatedRows = eduApply.filter(row => row.id !== rowId);
                    setEduApply(updatedRows);
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error("Error deleting eduHist:", error);
            });
    }

    const handleSearch = () => {
        const apiUrl = `${SERVER_URL}eduHist/search/${searchTerm.value}/${searchTerm.term}/${memId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map((item, index) => ({ id: index + 1, ...item }));
                setEduApply(formattedData);
            })
            .catch(error => console.error("Error fetching search results:", error));
    };

    const handlePageChange = (event, newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handleCertificatePrint = (status, name, eduName) => {
        if (status === 'COMPLETE') {
            setCurrentCertificateData({ name, eduName });
            setIsCertificateOpen(true);
        } else {
            alert('교육 수료 후 출력이 가능합니다!');
        }
    };

    const getCurrentPageData = () => {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return eduApply.slice(startIndex, endIndex);
    }

    const baseSearchOptions = [
        { value: 'eduName', label: '프로그램명' },
        { value: 'status', label: '승인 상태' }
    ];

    const adminSearchOption = { value: 'memId', label: '신청자' };

    const searchOptions = isAdmin ? [...baseSearchOptions, adminSearchOption] : baseSearchOptions;

    const renderStatusCell = (params) => {
        const currentDate = new Date();
        const recuStdt = new Date(params.row.edu?.recuStdt);
        const recuEddt = new Date(params.row.edu?.recuEddt);
        const eduStdt = new Date(params.row.edu?.eduStdt);
        const eduEddt = new Date(params.row.edu?.eduEddt);
        const recuPerson = params.row.edu?.recuPerson;
        const capacity = params.row.edu?.capacity;

        let eduStatusText;
        let eduStatusClass = "eduStatusCell";

        if (currentDate < recuStdt) {
            eduStatusText = '접수 대기';
            eduStatusClass += ' WAITING';
        } else if (currentDate >= recuStdt && currentDate <= recuEddt) {
            if (recuPerson >= capacity) {
                eduStatusText = '접수 마감';
                eduStatusClass += ' REGISTRATION_CLOSED';
            } else {
                eduStatusText = '접수 중';
                eduStatusClass += ' REGISTRATION_OPEN';
            }
        } else if (currentDate >= eduStdt && currentDate <= eduEddt) {
            eduStatusText = '교육 중';
            eduStatusClass += ' PROCESSING';
        } else if (currentDate > recuEddt && currentDate < eduEddt) {
            eduStatusText = '교육 대기';
            eduStatusClass += ' WAITING';
        } else if (currentDate >= eduEddt) {
            eduStatusText = '교육 종료';
            eduStatusClass += ' ENDED';
        } else {
            eduStatusText = '기타 상태';
        }

        return (
            <div className={eduStatusClass}>
                {eduStatusText}
            </div>
        );
    };

    const renderApprovalStatusCell = (params) => {
        const statusText = {
            WAIT: '미승인',
            APPROVE: '승인',
            COMPLETE: '완료'
        }[params.value] || params.value;

        return (
            isAdmin ? (
                <select
                    value={params.value}
                    onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                    className={`approvalStatus ${params.value}`}
                >
                    <option value="WAIT">미승인</option>
                    <option value="APPROVE">승인</option>
                    <option value="COMPLETE">완료</option>
                </select>
            ) : (
                <div className={`approvalStatus ${params.value}`}>
                    {statusText}
                </div>
            )
        );
    };

    const columns = [
        { field: 'id', headerName: '번호', width: 40 },
        {
            field: 'type',
            headerName: '구분',
            width: 40,
            renderCell: (row) => (
                <div className={`typeCell ${row.row.edu.type}`}>
                    {row.row.edu.type === 'BUSINESS' ? '사업' :
                        row.row.edu.type === 'EDU' ? '교육' : ''}
                </div>
            ),
        },
        {
            field: 'eduName',
            headerName: '프로그램명',
            width: 230,
            renderCell: (params) => (
                <div onClick={() => handleTitleClick(params.row.edu.eduNum)} style={{ cursor: 'pointer' }}
                     className="eduNameCell">
                    {params.row.edu?.eduName}
                </div>
            ),
        },
        {
            field: 'recuPerson+/+capacity',
            headerName: '모집 인원',
            width: 100,
            valueGetter: (params) => {
                return `${params.row.edu?.recuPerson}/${params.row.edu?.capacity}`;
            },
        },
        {
            field: 'eduStatus',
            headerName: '교육 상태',
            width: 100,
            renderCell: renderStatusCell,
        },
        { field: 'memId', headerName: '신청자', width: 100, valueGetter: (params) => params.row.member?.memId },
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 120,
            valueGetter: (params) => {
                const date = new Date(params.row.applyDate);
                return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            }
        },
        {
            field: 'applyDoc',
            headerName: '신청서',
            width: 120,
            renderCell: (params) => {
                if (params.row.files && params.row.files.length > 0) {
                    return (
                        <StyledScrollHideDiv>
                            {params.row.files.map((file, index) => (
                                <div key={index}>
                                    <a href={file.fileUri} target="_blank" rel="noopener noreferrer">
                                        {file.fileOriName}
                                    </a>
                                </div>
                            ))}
                        </StyledScrollHideDiv>
                    );
                }
                return "파일 없음";
            }
        },
        {
            field: 'status',
            headerName: '승인 상태',
            width: 100,
            renderCell: renderApprovalStatusCell,
        },
        {
            field: 'printCertificate',
            headerName: '수료증',
            width: 70,
            renderCell: (params) => (
                <div onClick={() => handleCertificatePrint(params.row.status, params.row.member?.name, params.row.edu?.eduName)}>
                    🖨️
                </div>
            ),
        },
        {
            field: 'cancel',
            headerName: '취소',
            width: 40,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)}>
                    취소
                </button>
            ),
        }
    ];

    return (
        <Wrapper style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={searchOptions}
                    totalCount={eduApply.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(eduApply.length / itemsPerPage)}
                />
                <StyledDataGrid
                    columns={columns}
                    rows={getCurrentPageData()}
                    pageSize={5}
                    hideFooter={true}
                />
                <div className="paginationContainer" style={{ marginTop: '10px' }}>
                    <Pagination
                        count={Math.ceil(eduApply.length / itemsPerPage)}
                        page={activePage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </div>
            </div>
            <Certificate
                isOpen={isCertificateOpen}
                onClose={() => setIsCertificateOpen(false)}
                name={currentCertificateData.name}
                eduName={currentCertificateData.eduName}
            />
        </Wrapper>
    );
}


const StyledScrollHideDiv = styled.div`
    max-height: 50px;
    overflow-y: auto;
    width: 100%;
    scrollbar-width: none; // Firefox
    -ms-overflow-style: none;  // IE and Edge

    &::-webkit-scrollbar {
        display: none; // Chrome, Safari, and Opera
    }
`;

const Wrapper = styled.div`
  width: fit-content;
  margin: 0 auto; // 중앙 정렬을 위한 스타일
`;
const StyledDataGrid = styled(DataGrid)`

  width: 100%;

  & .MuiDataGrid {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .MuiDataGrid-columnHeader {
    background-color: #ececec; // 옅은 회색으로 설정
  }

  & .MuiDataGrid-columnHeaderTitle {
    font-size: 14px;
  }

  & .MuiDataGrid-columnHeaderTitleContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
  }

  & .MuiDataGrid-cell {
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    padding: 3px 5px;
    margin: 0 5px;
    border: none;
    cursor: pointer;
    background-color: #3498db;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2980b9;
    }
  }

  & .MuiDataGrid-cell[data-field="eduName"] {
    justify-content: left;
  }

  & .typeCell {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    &.BUSINESS {
      color: #855cdc;
    }

    &.EDU {
      color: #1e6bfa;
    }
  }

  & .eduNameCell {
    cursor: pointer;
    white-space: nowrap; // 내용을 한 줄에 표시
    overflow: hidden; // 내용이 넘치면 숨김
    text-overflow: ellipsis; // 넘치는 내용을 '...'로 표시
    max-width: 280px; // 셀의 최대 너비. 필요에 따라 조절하세요.
  }

  & .eduStatusCell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border-radius: 3px;

    &.WAITING {
      background-color: #a38ced;
      color: white; // 글자 색상 추가
    }

    &.PROCESSING {
      background-color: #53468b;
      color: white; // 글자 색상 추가
    }

    &.REGISTRATION_CLOSED {
      background-color: gray;
      color: white; // 글자 색상 추가
    }

    &.REGISTRATION_OPEN {
      background-color: #5ae507;
      color: white; // 글자 색상 추가
    }
  }

`;

export default EduApplyList;