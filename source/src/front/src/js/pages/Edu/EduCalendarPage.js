import React, { useState } from 'react';
import EduCalendar from "../../component/Edu/EduCalendar";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/EduHeader";

function EduCalendarPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} />
            <EduCalendar  />
        </div>
    );
}

export default EduCalendarPage;
