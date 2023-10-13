import React, { useState } from 'react';
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/SearchHeader";

function SearchPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'통합 검색'} />
        </div>
    );
}

export default SearchPage;