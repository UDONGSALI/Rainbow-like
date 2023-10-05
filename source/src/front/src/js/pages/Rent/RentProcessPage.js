import React from "react";
import RentProcess from "../../component/Rent/RentProcess";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import Footer from "../../layout/Footer/footer";



function RentProcessPage() {
    return (
        <div id="rentBody">
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'절차 및 이용기준'}/>
            <RentProcess className="rentProcess"/>
            <Footer/>
        </div>
    )
}

export default RentProcessPage;