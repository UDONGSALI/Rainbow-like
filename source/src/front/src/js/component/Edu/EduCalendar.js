import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {SERVER_URL} from "../Common/constants";
import '../../../css/component/EduCalendar.css';

const localizer = momentLocalizer(moment);

function EduCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEdus();
    }, []);

    const fetchEdus = () => {
        fetch(SERVER_URL + 'api/edus')
            .then((res) => res.json())
            .then((data) => {
                const formattedEdus = data._embedded.edus.map((edu) => ({
                    id: edu._links.edu.href,
                    ...edu,
                }));
                console.log(formattedEdus)
                const calendarEvents = formattedEdus.map((edu) => {
                    return {
                        title: edu.eduName,
                        start: new Date(edu.eduStdt),
                        end: new Date(edu.eduEddt),
                        allDay: edu.eduStdt.split('T')[0] === edu.eduEddt.split('T')[0],
                        eduNum: parseInt(edu._links.edu.href.slice(-1)),
                    };
                });
                setEvents(prevEvents => [...prevEvents, ...calendarEvents]);
            })
            .catch((err) => console.error(err));
    };

    const handleEventClick = (event) => {
        window.location.href = `http://localhost:3000/edu/detail/${event.eduNum}`;
    }

    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        return `${year}.${month}`;
    };

        const CustomToolbar = (toolbar) => {
        const goToBack = () => {
            toolbar.date.setMonth(toolbar.date.getMonth() - 1);
            toolbar.onNavigate('prev');
        };

        const goToNext = () => {
            toolbar.date.setMonth(toolbar.date.getMonth() + 1);
            toolbar.onNavigate('next');
        };

        const goToToday = () => {
            const now = new Date();
            toolbar.date.setMonth(now.getMonth());
            toolbar.date.setYear(now.getFullYear());
            toolbar.onNavigate('current');
        };

        return (
            <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" onClick={goToBack}>&lt;</button>
                <span onClick={goToToday}>{formatDate(toolbar.date)}</span>
                <button type="button" onClick={goToNext}>&gt;</button>
            </span>
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <div className="calendar-content">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventClick}
                    components={{
                        toolbar: CustomToolbar
                    }}
                />
            </div>
        </div>
    );
}

export default EduCalendar;