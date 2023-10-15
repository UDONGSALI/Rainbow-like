import Map from './Map'
import React, {useEffect, useState} from "react";
import useFetch from "../../hook/useFetch";
import {SERVER_URL} from "../../Common/constants";
import styles from '../../../../css/component/Main/MapComponent.module.css'

function MapComponent() {

    const [orgs, setOrgs] = useState([]);

    const {data: fetchedOrgs, loading} = useFetch(`${SERVER_URL}org`);
    const [selectAddress, setSelectAddress] = useState('세종특별자치시 새롬로 14'); // 선택된 주소 상태

    const handleOrgClick = (address) => {  // 클릭 시 주소 설정 핸들러
        setSelectAddress(address);
    }

    useEffect(() => {
        if (!loading) {
            setOrgs(fetchedOrgs);
        }
    }, [loading, fetchedOrgs]);


    return (
        <div className={styles.MapComponent}>
            <Map address={selectAddress} org={orgs.find(org => org.addr === selectAddress)} />
            <div style={{ width: '40%', height: '100%', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>유관 기관</h3>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '20px' }}>
                    {
                        orgs
                            .map((org) => (
                                <div
                                    key={org.name}
                                    style={{ display: 'flex', justifyContent: 'right', borderBottom: '1px solid #eee', padding: '5px 0', cursor: 'pointer' }}
                                    onClick={() => handleOrgClick(org.addr)}  // 클릭 이벤트 핸들러 연결
                                >
                                    <span>{(org.name)}</span>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MapComponent;