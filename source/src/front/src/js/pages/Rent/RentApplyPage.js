import React from "react";
import RentAgreeForm from "../../component/Rent/RentAgreeForm";
import RentSpace from "../../component/Rent/RentSpace";
import LoginMember from "../../component/Rent/LoginMember";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";


function RentApplyPage() {
    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관현황 및 신청'}/>
            <RentSpace/>
            <RentAgreeForm/>
            <LoginMember/>

        </div>
    )
};

export default RentApplyPage;