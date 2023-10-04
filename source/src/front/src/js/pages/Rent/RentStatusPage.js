import React from "react";
import SpaceApplyForm from "../../component/Rent/SpaceApplyForm";
import RentStatus from "../../component/Rent/RentStatus";
import RentCalender from "../../component/Rent/RentCalender";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import Footer from "../../layout/Footer/footer";

function RentStatusPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 현황 및 신청'}/>
            <RentStatus/>
            <RentCalender/>
            <SpaceApplyForm/>
            <Footer/>
        </div>
    );
}

export default RentStatusPage;