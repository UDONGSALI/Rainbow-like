import React from "react";
import SpaceApplyForm from "../../component/Rent/SpaceApplyForm";
import RentStatus from "../../component/Rent/RentStatus";
import RentCalender from "../../component/Rent/RentCalender";

function RentStatusPage() {

    return (
        <div>
            <RentStatus/>
            <RentCalender/>
            <SpaceApplyForm/>

        </div>
    );
}

export default RentStatusPage;