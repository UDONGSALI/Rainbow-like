
import Footer from "../../layout/Footer/footer";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import React from "react";


const MyEduPage = () => {
    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 신청내역'}/>


        </div>
    );
}

export default MyEduPage;
