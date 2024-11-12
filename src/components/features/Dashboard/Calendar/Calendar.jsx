import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import './Calendar.css';

const Calendar = ({ events }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getEventsForDay = (date) => {
        return events.filter(event => 
            isSameDay(new Date(event.date), date)
        );
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt;</button>
                <h3>{format(currentDate, 'MMMM yyyy')}</h3>
                <button onClick={nextMonth}>&gt;</button>
            </div>

            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-day-header">
                        {day}
                    </div>
                ))}

                {monthDays.map(day => {
                    const dayEvents = getEventsForDay(day);
                    return (
                        <div
                            key={day.toString()}
                            className={`calendar-day ${
                                !isSameMonth(day, currentDate) ? 'disabled' : ''
                            }`}
                        >
                            <span className="day-number">{format(day, 'd')}</span>
                            <div className="day-events">
                                {dayEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        className={`event-dot ${event.type}`}
                                        title={event.title}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar; 