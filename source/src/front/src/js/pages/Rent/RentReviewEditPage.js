import React from "react";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/RentHeader";
import RentReviewEdit from "../../component/Rent/RentReview/RentReviewEdit";



function RentReviewEditPage() {
    return (
        <div id="rentBody">
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'대관 이용 후기'}/>
            <RentReviewEdit/>
        </div>
    )
}

export default RentReviewEditPage;