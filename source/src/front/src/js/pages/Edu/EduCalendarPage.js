import React from 'react';
import EduCalendar from "../../component/Edu/EduCalendar";
import UrlComponent from "../../layout/Header/UrlComponent";
import {headerInfo, urlData} from "../../layout/Header/Data/EduHeader";

function EduCalendarPage() {

    return (
        <div>
            <UrlComponent headerTitle={headerInfo} urlItems={urlData} footerTitle={'교육 일정'}/>
            <EduCalendar/>
        </div>
    );
}

export default EduCalendarPage;
