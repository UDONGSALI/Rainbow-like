import React from "react";
import RentProcess from "../../component/Rent/RentProcess";
import Footer from "../../layout/Footer/footer";


function RentPage() {
    return (
        <div id="rentBody">
            <RentProcess className="rentProcess"/>
            <Footer className="footer"/>
        </div>
    )
};

export default RentPage;
