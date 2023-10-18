// 1. Import Section
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Holidays from 'date-holidays';
import {SERVER_URL} from "../Common/constants";
import styles from '../../../css/component/Edu/EduCalendar.module.css';

const localizer = momentLocalizer(moment);

// 2. Constants and Utility Functions
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
                start: new Date(d),
                end: new Date(d),
                allDay: true,
                isHoliday: true
            });
        }
    });
    return events;
};

const eventStyleGetter = (event) => {
    if (event.isHoliday) {
        return {
            style: {
                backgroundColor: "transparent",
                color: "red",
                borderRadius: "5px",
            }
        };
    } else {
        // 이 부분에 교육 이벤트의 스타일을 적용하면 됩니다.
        return {
            style: {
                background:'none',  // 예를 들면, 교육 이벤트의 배경색을 파란색으로 설정
                color: "black",
                border: '1px solid red',
                height: '80px',
                overflow:'hidden',
            }
        };
    }
};

    const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
};

// 3. EduCalendar Component
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
                    start: new Date(edu.eduStdt),
                    end: new Date(edu.eduEddt),
                    allDay: edu.eduStdt.split('T')[0] === edu.eduEddt.split('T')[0],
                    eduNum: parseInt(edu._links.edu.href.slice(-1)),
                }));
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...calendarEvents,
                    ...formatHolidaysToEvents(holidays)
                ]);
            })
            .catch(err => console.error(err));
    };

    const handleEventClick = event => {
        // event.isHoliday 가 true면 이 함수의 나머지 부분은 실행되지 않습니다.
        if (event.isHoliday) return;

        window.location.href = `/edu/list/detail/${event.eduNum}`;
    };

    const CustomToolbar = toolbar => {
        const navigationActions = {
            goToBack: () => {
                toolbar.date.setMonth(toolbar.date.getMonth() - 1);
                toolbar.onNavigate('prev');
            },
            goToNext: () => {
                toolbar.date.setMonth(toolbar.date.getMonth() + 1);
                toolbar.onNavigate('next');
            },
            goToToday: () => {
                const now = new Date();
                toolbar.date.setMonth(now.getMonth());
                toolbar.date.setYear(now.getFullYear());
                toolbar.onNavigate('current');
            }
        };

        return (
            <div className={styles.rbcToolbar}>
                <span className={styles.rbcBtnGroup}>
                    <button type="button" onClick={navigationActions.goToBack}>&lt;</button>
                    <span onClick={navigationActions.goToToday}>{formatDate(toolbar.date)}</span>
                    <button type="button" onClick={navigationActions.goToNext}>&gt;</button>
                </span>
            </div>
        );
    };

    // 4. Return & Render
    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendarContent}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyleGetter}
                    components={{ toolbar: CustomToolbar }}
                />
            </div>
        </div>
    );
}

export default EduCalendar;
