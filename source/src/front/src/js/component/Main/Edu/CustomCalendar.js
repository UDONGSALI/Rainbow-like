    import React, { useEffect, useState } from 'react';
    import Holidays from "date-holidays";
    import styles from '../../../../css/component/Main/Edu/CustomCalendar.module.css'


    function CustomCalendar({ edus }) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const lastDay = new Date(year, month, 0).getDate();

        const [holidayDates, setHolidayDates] = useState([]);

        useEffect(() => {
            const hd = new Holidays();
            hd.init('KR');
            const holidays = hd.getHolidays(year);

            const extractedDates = holidays
                .filter(h => new Date(h.date).getMonth() + 1 === month)
                .map(h => new Date(h.date).getDate());

            setHolidayDates(extractedDates);
        }, [month, year]);

        const eduDates = edus.map(edu => new Date(edu.eduStdt).getDate()).filter(date => {
            const eduDate = new Date(year, month - 1, date);
            return eduDate.getMonth() + 1 === month && eduDate.getFullYear() === year;
        });


        return (
            <div className={styles.calendarContainer}>
                <span className={styles.yearText}>{year}</span>
                <div className={styles.monthText}>{month}</div>
                {Array.from({ length: lastDay }, (_, i) => i + 1).map(day => {
                    const dayOfWeek = new Date(year, month - 1, day).getDay();
                    return (
                        <span
                            key={day}
                            className={[
                                styles.day,
                                dayOfWeek === 0 && styles.sunday,
                                dayOfWeek === 6 && styles.saturday,
                                holidayDates.includes(day) && styles.holiday,
                                day === date && styles.currentDay,
                                eduDates.includes(day) && styles.eduDay  // 여기에 보라색 점 스타일을 추가합니다.
                            ].filter(Boolean).join(' ')}
                        >
                        {day < 10 ? `0${day}` : day}
                    </span>
                    )
                })}
            </div>
        );
    }

    export default CustomCalendar;
