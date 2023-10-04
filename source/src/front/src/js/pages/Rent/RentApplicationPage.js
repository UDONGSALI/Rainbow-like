import React from "react";
import RentAgreeForm from "../../component/Rent/RentAgreeForm";
import RentSpace from "../../component/Rent/RentSpace";
import LoginMember from "../../component/Rent/LoginMember";


function RentApplicationPage() {
    return (
        <div>
            <RentSpace/>
            <RentAgreeForm/>
            <LoginMember/>
        </div>
    )
};

export default RentApplicationPage;