import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {SERVER_URL} from "./constants";
import '../../css/component/EduCalendar.css';

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
                const calendarEvents = formattedEdus.map((edu) => {
                    return {
                        title: edu.eduname,
                        start: new Date(edu.eduStdt),
                        end: new Date(edu.eduEddt),
                        allDay: edu.eduStdt.split('T')[0] === edu.eduEddt.split('T')[0]
                    };
                });
                setEvents(calendarEvents);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-content">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                />
            </div>
        </div>
    );

}

export default EduCalendar;
