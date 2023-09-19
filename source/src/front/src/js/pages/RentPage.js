import React from "react";
import RentProcess from "../component/RentProcess";
import Footer from "../layout/footer";


function RentPage(){
    return (
        <div id="rentBody">
        <RentProcess className="rentProcess"/>
        <Footer className="footer"/>
        </div>
    )
};

export default RentPage;
