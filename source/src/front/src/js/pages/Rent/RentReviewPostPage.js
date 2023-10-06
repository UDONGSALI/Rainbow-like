import React from "react";

import Footer from "../../layout/Footer/footer";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";


function RentReviewPostPage() {
    return (
        <div id="rentBody">
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>

        </div>
    )
}

export default RentReviewPostPage;