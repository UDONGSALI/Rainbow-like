import * as React from "react";
import {useEffect, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment/moment";
import Holidays from "date-holidays";
import {SERVER_URL} from "../Common/constants";
import styles from "../../../css/component/Edu/EduCalendar.module.css";


const localizer = momentLocalizer(moment);


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
                background: 'none',  // 예를 들면, 교육 이벤트의 배경색을 파란색으로 설정
                color: "black",
                border: '1px solid red',
                height: '80px',
                overflow: 'hidden',
            }
        };
    }
};

const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
};
export default function RentCalender() {
    const [events, setEvents] = useState([]);
    const [rentHistData, setRentHistData] = useState([]); // RentHistController 데이터 상태 추가
    const [selectedDate, setSelectedDate] = useState(null);


    useEffect(() => {
        fetchRentHist();
    }, []);

    const fetchRentHist = () => {
        fetch(SERVER_URL + 'api/rent')
            .then(response => response.json())
            .then((data) => {
                // RentHistController 데이터를 rentHistData 상태에 저장
                setRentHistData(data);

                const formattedRent = data.map((rent) => ({
                    id: rentHistData._links.rentHist.href,
                    ...rent,
                }));
                const calendarEvents = formattedRent.map(rentHist => ({
                    spaceName: rentHist.spaceName,
                    startTime: new Date(rentHist.rentStdt),
                    endTime: new Date(rentHist.rentEddt),
                    applYDay: rentHist.rentStdt.split('T')[0] === rentHist.rentEddt.split('T')[0],
                    rentHistNum: parseInt(rentHist._links.rentHist.href.slice(-1)),
                }));
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...calendarEvents,
                    ...formatHolidaysToEvents(holidays)
                ]);
            })
            .catch(err => console.error(err));
    };

    const handleEventClick = (event) => {
        // event.isHoliday 가 true면 이 함수의 나머지 부분은 실행되지 않습니다.
        if (event.isHoliday) return;

        // RentHistController 데이터를 찾기 위해 rentHistNum을 이용
        const rentHistInfo = rentHistData.find((data) => data.rentHistNum === event.rentHistNum);
        if (rentHistInfo) {
            // RentHistController 정보를 콘솔에 출력하거나 다른 방식으로 표시할 수 있습니다.
            console.log('RentHistController 정보:', rentHistInfo);

            // 아래와 같이 RentHistController 정보를 캘린더 페이지에 표시할 수도 있습니다.
            alert(`공간명: ${rentHistInfo.space.spaceName}\n대관일시: ${rentHistInfo.rentStdt} ~ ${rentHistInfo.rentEddt}`);

            // 선택한 대관일자를 상태에 저장
            setSelectedDate(event.start);

        } else {
            console.error('RentHistController 정보를 찾을 수 없습니다.');
        }

        window.location.href = `http://localhost:3000/rent/r/${event.rentHistNum}`;
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

    return (
        <div id={styles.rentCalendar}>
            <div className={styles.calendarContainer}>
                <div className={styles.calendarContent}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        onSelectEvent={handleEventClick}
                        eventPropGetter={eventStyleGetter}
                        components={{toolbar: CustomToolbar}}
                    />
                </div>
            </div>
            <div className={styles.rentDate}>
                <h3>대관일자</h3>
                <hr className={styles.line}></hr>
                {selectedDate && <p>선택한 대관일자: {selectedDate.toLocaleDateString()}</p>}
            </div>
        </div>
    );
}
