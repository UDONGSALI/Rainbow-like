import React from "react";

import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentReviewPost from "../../component/Rent/RentReview/RentReviewPost";
import Header from "../../layout/Header/Header";
import RentReviewEdit from "../../component/Rent/RentReview/RentReviewEdit";


function RentReviewWritePage() {
    return (
        <div id="rentBody">
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewEdit/>
        </div>
    )
}

export default RentReviewWritePage;