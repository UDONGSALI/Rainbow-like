import FTMain from "../../component/FT/FTMain";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import React from "react";


function FTMainPage({type}){

    let requiredModule;

    if (type === 'admin') {
        requiredModule = require('../../layout/Header/Data/AdminHeader');
    } else {
        requiredModule = require('../../layout/Header/Data/FtHeader');
    }

    const { headerInfo, urlData } = requiredModule;

    const footerTitle = type === 'admin' ? '여성인재풀': '메인'


    return(
        <div>
        <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
        <FTMain />
        </div>
    )
}

export default FTMainPage;