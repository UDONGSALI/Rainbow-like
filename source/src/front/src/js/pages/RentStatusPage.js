import React from "react";
import SpaceList from "../component/SpaceList";
import RentStatus from "../component/RentStatus";
import Footer from "../layout/footer";

function RentStatusPage() {

    return (
        <div>
            <RentStatus/>
            {/*캘린더자리*/}
            <SpaceList/>
            <Footer/>
        </div>
    );
}

export default RentStatusPage;