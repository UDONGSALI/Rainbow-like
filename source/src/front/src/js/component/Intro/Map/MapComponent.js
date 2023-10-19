import Map from './Map'
import React, {useEffect, useState} from "react";
import useFetch from "../../hook/useFetch";
import {SERVER_URL} from "../../Common/constants";
import styles from '../../../../css/component/Main/Map/MapComponent.module.css'

function MapComponent() {

    const [orgs, setOrgs] = useState([]);

    const {data: fetchedOrgs, loading} = useFetch(`${SERVER_URL}org`);
    const [selectAddress, setSelectAddress] = useState('세종특별자치시 새롬로 14'); // 선택된 주소 상태

    const handleOrgClick = (address) => {  // 클릭 시 주소 설정 핸들러
        setSelectAddress(address);
    }

    console.log(selectAddress)

    useEffect(() => {
        if (!loading) {
            setOrgs(fetchedOrgs);
        }
    }, [loading, fetchedOrgs]);


    return (
        <div className={styles.MapComponent}>
            <h2><strong>유관기관</strong></h2>
            <div className={styles.mapArea}>
                <Map address={selectAddress} org={orgs.find(org => org.addr === selectAddress)}/>
                <div style={{
                    width: '40%',
                    height: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '10px',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '25px',
                        fontWeight: "bold",
                        letterSpacing: '1px'
                    }}>
                        {
                            orgs
                                .map((org) => (
                                    <div
                                        key={org.name}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                            borderBottom: '1px solid #eee',
                                            padding: '5px 0',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleOrgClick(org.addr)}  // 클릭 이벤트 핸들러 연결
                                    >
                                        <span>{(org.name)}</span>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MapComponent;