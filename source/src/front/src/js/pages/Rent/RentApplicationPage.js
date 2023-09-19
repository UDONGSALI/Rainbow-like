import React from "react";
import RentApplicationForm from "../../component/Rent/RentApplicationForm";
import RentSpace from "../../component/Rent/RentSpace";
import Footer from "../../layout/Footer/footer";


function RentApplicationPage() {
    return (
        <div>
            <RentSpace/>
            <RentApplicationForm/>
            <Footer className="footer"/>
        </div>
    )
};

export default RentApplicationPage;