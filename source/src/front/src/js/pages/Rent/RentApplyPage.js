import React from "react";
import RentAgreeForm from "../../component/Rent/RentProcess/RentAgreeForm";
import RentSpace from "../../component/Rent/RentSpace";
import LoginMember from "../../component/Rent/LoginMember";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentSpaceInfo from "../../component/Rent/RentSpaceInfo";


function RentApplyPage() {
    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관현황 및 신청'}/>
            <RentSpace/>
            <RentAgreeForm/>
            <RentSpaceInfo/>
            <LoginMember/>

        </div>
    )
};

export default RentApplyPage;