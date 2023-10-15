import React, { useEffect, useState } from "react";
import useFetch from "../../hook/useFetch";
import { SERVER_URL } from "../../Common/constants";
import styles from "../../../../css/component/Main/Edu/ThumbnailComponent.module.css";
import {useNavigate} from "react-router-dom";

function getStatus(currentDate, recuStdt, recuEddt) {
    if (currentDate < new Date(recuStdt)) return 'waiting';
    if (currentDate >= new Date(recuStdt) && currentDate <= new Date(recuEddt)) return 'ongoing';
    if (currentDate > new Date(recuEddt)) return 'closed';
}
function ThumbnailComponent({ basicEdus }) {
    const [edus, setEdus] = useState([]);
    const navigate = useNavigate();
    const currentDate = new Date();
    const navigateToDetail = (eduNum) => {
        navigate(`/edu/list/detail/${eduNum}`);
    };

    useEffect(() => {
        const fetchDataForEdu = async (edu) => {
            const response = await fetch(`${SERVER_URL}files/eduNum/${edu.eduNum}`);
            const data = await response.json();
            return { ...edu, files: data };
        }

        Promise.all(basicEdus.map(fetchDataForEdu))
            .then(updatedEdus => {
                setEdus(updatedEdus);
            });
    }, [basicEdus]);

    return (
        <div className={styles.thumbnailContainer}>
            {edus.map((edu, index) => (
                <div key={index} className={styles.thumbnailItem} onClick={() => navigateToDetail(edu.eduNum)}>
                    <div className={styles.imageFrame}>
                        <img src={edu.files[0].fileUri} alt={edu.title} className={styles.thumbnailImage} />
                        <div className={styles.statusBox}>
                            {getStatus(currentDate, edu.recuStdt, edu.recuEddt) === 'waiting' && <span className={styles.waiting}>접수대기</span>}
                            {getStatus(currentDate, edu.recuStdt, edu.recuEddt) === 'ongoing' && <span className={styles.ongoing}>접수중</span>}
                            {getStatus(currentDate, edu.recuStdt, edu.recuEddt) === 'closed' && <span className={styles.closed}>접수마감</span>}
                        </div>
                    </div>
                    <div className={styles.thumbnailText}>
                        <h6 className={edu.type === "EDU" ? styles.eduType : (edu.type === "BUSINESS" ? styles.businessType : "")}>
                            {edu.type === "EDU" ? "교육" : (edu.type === "BUSINESS" ? "사업" : edu.type)}
                        </h6>
                        <h5><strong>{edu.eduName}</strong></h5>
                        <p>🕒{edu.recuStdt} ~ {edu.recuEddt}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ThumbnailComponent;
