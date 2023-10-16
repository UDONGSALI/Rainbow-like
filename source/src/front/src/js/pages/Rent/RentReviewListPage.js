import React from "react";


import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";


function RentReviewPostPage() {
    return (
        <div id="rentBody">
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>

        </div>
    )
}

export default RentReviewPostPage;