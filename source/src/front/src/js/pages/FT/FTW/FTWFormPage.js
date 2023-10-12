import FTWForm from "../../../component/FT/FTW/FTWForm";
import UrlComponent from "../../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";

function FTWFormPage(props){
    const {memId} = props;

    return(
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <FTWForm memId={memId}/>
        </div>
    );
}

export default FTWFormPage;