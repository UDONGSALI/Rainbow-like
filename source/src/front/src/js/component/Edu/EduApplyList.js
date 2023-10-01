// 1. React 관련
import React, {useEffect, useState} from "react";
// 2. 외부 라이브러리 관련
import {DataGrid} from "@mui/x-data-grid";
import styled from '@emotion/styled';
import {Pagination} from "@mui/material";
// 3. 프로젝트 내 공통 모듈 관련
import {SERVER_URL} from "../Common/constants";
import {useLocation, useNavigate} from "react-router-dom";
// 4. 컴포넌트 관련
import SearchComponent from "../Common/SearchComponent";
import Certificate from "./CertificateModal";
// 5. 훅 관련
import useSearch from "../hook/useSearch";
import useFetch from "../hook/useFetch";
import usePagination from "../hook/usePagination";
// 6. Helper 함수나 Renderer 관련
import {renderStatusCell} from "./statusRenderer";
import renderApprovalStatusCell from "./renderApprovalStatusCell";

const ADMIN_ROLE = "ADMIN";
const USER_ROLE = "USER";

function EduApplyList(props) {
    // 1. React Router 관련
    const navigate = useNavigate();
    const location = useLocation();
// 2. 사용자 관련
    const {memId} = props;
    const userRole = sessionStorage.getItem("role");
    const isAdmin = userRole === ADMIN_ROLE;
// 3. 로컬 상태 관리
    const {activePage, setActivePage} = usePagination(1);
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [currentCertificateData, setCurrentCertificateData] = useState({name: "", eduName: ""});
    const [eduApply, setEduApply] = useState([]);
// 4. 커스텀 훅
    const {searchTerm, setSearchTerm, handleSearch} = useSearch(`${SERVER_URL}eduHist`, setEduApply, undefined, memId);
// 상수
    const itemsPerPage = 10;
    const SEARCH_OPTIONS = [
        {value: 'eduName', label: '프로그램명', type: 'text'},
        {
            value: 'status', label: '승인 상태', type: 'select', options: [
                {label: "미승인", value: "WAIT"},
                {label: "승인", value: "APPROVE"},
                {label: "완료", value: "COMPLETE"}
            ]
        },
    ];
    if (isAdmin) {
        SEARCH_OPTIONS.push({value: 'memId', label: '신청자', type: 'text'});
    }

    const eduHistUrl = isAdmin ? SERVER_URL + 'eduHist' : SERVER_URL + `eduHist/search/memId/${memId}/${memId}`;

    const {data: rawEduApplyData, loading: eduApplyLoading} = useFetch(eduHistUrl, []);

    const {data: files, loading: filesLoading} = useFetch(SERVER_URL + 'files/table/eduHist', []);

    useEffect(() => {
        if (!eduApplyLoading && rawEduApplyData) {
            const formattedData = rawEduApplyData.map((item, index) => ({
                id: index + 1, ...item,
                eduHistNum: item.eduHistNum
            }));
            setEduApply(formattedData.reverse());
        }
    }, [rawEduApplyData, eduApplyLoading]);

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

            const hasChanged = !eduApply.every((item, index) => JSON.stringify(item) === JSON.stringify(updatedEduApply[index]));

            if (hasChanged) {
                setEduApply(updatedEduApply);
            }
        }
    }, [files, eduApply]);


    const handleTitleClick = (eduNum) => {
        navigate(`/edu/list/detail/${eduNum}`);
    }

    const handleStatusChange = (eduHistNum, newStatus) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({status: newStatus})
        };

        fetch(SERVER_URL + 'eduHist/' + eduHistNum, requestOptions)
            .then(response => {
                if (response.ok) {
                    const updatedRows = eduApply.map(row =>
                        row.eduHistNum === eduHistNum ? {...row, status: newStatus} : row
                    );
                    setEduApply(updatedRows);
                    alert('승인 상태를 변경 했습니다!');
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.error("Error updating status:", error);
                alert('승인 상태 변경 중 문제가 발생했습니다.');
            });
    }

    const handleDelete = (eduHistNum) => {
        const isConfirmed = window.confirm("정말 취소 하시겠습니까?");
        if (!isConfirmed) return;

        fetch(SERVER_URL + 'eduHist/' + eduHistNum, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    const updatedRows = eduApply.filter(row => row.eduHistNum !== eduHistNum);
                    setEduApply(updatedRows);
                    alert('성공적으로 취소 했습니다!');
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.error("Error deleting eduHist:", error);
                alert('취소 중 문제가 발생했습니다.');
            });
    }


    const handlePageChange = (event, newPage) => {
        navigate(`${location.pathname}?page=${newPage}`);
        setActivePage(newPage);
    }

    const handleCertificatePrint = (status, name, eduName) => {
        if (status === 'COMPLETE') {
            setCurrentCertificateData({name, eduName});
            setIsCertificateOpen(true);
        } else {
            alert('교육 수료 후 출력이 가능합니다!');
        }
    };

    const columns = [
        {field: 'eduHistNum', headerName: '번호', width: 40},
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
                <div onClick={() => handleTitleClick(params.row.edu.eduNum)} style={{cursor: 'pointer'}}
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
            renderCell: (params) => renderStatusCell(params.row.edu),
        },
        {field: 'memId', headerName: '신청자', width: 100, valueGetter: (params) => params.row.member?.memId},
        {
            field: 'applyDate',
            headerName: '신청 일시',
            width: 120,
            valueGetter: getApplyDate
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
            renderCell: (params) => renderApprovalStatusCell(params, isAdmin, handleStatusChange),
        },
        {
            field: 'printCertificate',
            headerName: '수료증',
            width: 70,
            renderCell: (params) => (
                <div
                    onClick={() => handleCertificatePrint(params.row.status, params.row.member?.name, params.row.edu?.eduName)}>
                    🖨️
                </div>
            ),
        },
        {
            field: 'cancel',
            headerName: '취소',
            width: 40,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.eduHistNum)}>
                    취소
                </button>
            ),
        }
    ];

    function getApplyDate(params) {
        const date = new Date(params.row.applyDate);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    }

    return (
        <Wrapper style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <SearchComponent
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={handleSearch}
                    searchOptions={SEARCH_OPTIONS}
                    totalCount={eduApply.length}
                    currentPage={activePage}
                    totalPages={Math.ceil(eduApply.length / itemsPerPage)}
                />
                {eduApplyLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '200px'
                    }}>로딩중...</div>
                ) : (
                    <StyledDataGrid
                        columns={columns}
                        rows={eduApply.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)}
                        pageSize={5}
                        hideFooter={true}
                    />
                )}
                <div className="paginationContainer" style={{marginTop: '10px'}}>
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
  -ms-overflow-style: none; // IE and Edge

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

  & .statusCell {
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