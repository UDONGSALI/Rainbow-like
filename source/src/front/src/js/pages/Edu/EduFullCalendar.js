import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 클릭 및 드래그 등의 인터랙션에 필요합니다.

import 'date-holidays';
import { SERVER_URL } from "../Common/constants";
import styles from '../../../css/component/Edu/EduCalendar.module.css';

const hd = new Holidays();
hd.init('KR');
const holidays = hd.getHolidays(new Date().getFullYear());

const formatHolidaysToEvents = (holidays) => {
    const events = [];
    holidays.forEach(holiday => {
        const startDate = new Date(holiday.date);
        const endDate = holiday.end ? new Date(holiday.end) : startDate;
        for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
            events.push({
                title: holiday.name,
                start: d,
                end: d,
                allDay: true,
                isHoliday: true,
                color: 'red' // 휴일 이벤트의 색상을 빨간색으로 설정
            });
        }
    });
    return events;
};

function EduCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEdus();
    }, []);

    const fetchEdus = () => {
        fetch(SERVER_URL + 'api/edus')
            .then(res => res.json())
            .then(data => {
                const formattedEdus = data._embedded.edus.map(edu => ({
                    id: edu._links.edu.href,
                    ...edu,
                }));
                const calendarEvents = formattedEdus.map(edu => ({
                    title: edu.eduName,
                    start: edu.eduStdt,
                    end: edu.eduEddt,
                    allDay: edu.eduStdt.split('T')[0] === edu.eduEddt.split('T')[0],
                    eduNum: parseInt(edu._links.edu.href.slice(-1)),
                    color: 'blue' // 교육 이벤트의 색상을 파란색으로 설정
                }));
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...calendarEvents,
                    ...formatHolidaysToEvents(holidays)
                ]);
            })
            .catch(err => console.error(err));
    };

    const handleEventClick = info => {
        if (info.event.extendedProps && info.event.extendedProps.eduNum) {
            window.location.href = `http://localhost:3000/edu/detail/${info.event.extendedProps.eduNum}`;
        }
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendarContent}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    );
}

export default EduCalendar;
