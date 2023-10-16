import React from "react";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentReviewList from "../../component/Rent/RentReview/RentReviewList";


function RentReviewPostPage() {
    return (
        <div id="rentBody">
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewList/>
        </div>
    )
}

export default RentReviewPostPage;