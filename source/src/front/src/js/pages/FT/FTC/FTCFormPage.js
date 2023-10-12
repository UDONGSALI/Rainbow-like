import FTCForm from "../../../component/FT/FTC/FTCForm";
import UrlComponent from "../../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../../layout/Header/Data/FtHeader";
import React from "react";

function FTCFormPage(props){
    const {memId} = props;

    return(
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={""}/>
            <FTCForm memId={memId}/>
        </div>
    );
}

export default FTCFormPage;