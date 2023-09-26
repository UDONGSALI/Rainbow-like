import React from "react";
import RentAgreeForm from "../../component/Rent/RentAgreeForm";
import RentSpace from "../../component/Rent/RentSpace";
import Footer from "../../layout/Footer/footer";


function RentApplicationPage() {
    return (
        <div>
            <RentSpace/>
            <RentAgreeForm/>
            <Footer className="footer"/>
        </div>
    )
};

export default RentApplicationPage;