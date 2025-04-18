import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import './Calendar.css';

const EVENT_CATEGORIES = {
    meeting: { name: 'Meeting', color: '#4a90e2' },
    deadline: { name: 'Deadline', color: '#e53e3e' },
    training: { name: 'Training', color: '#38a169' },
    event: { name: 'Event', color: '#805ad5' }
};

const Calendar = ({ events = [], onEventClick }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getEventsForDay = (date) => {
        return events.filter(event => isSameDay(new Date(event.date), date));
    };

    const handlePrevMonth = () => {
        setCurrentDate(prev => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => addMonths(prev, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const dayEvents = getEventsForDay(date);
        if (dayEvents.length > 0 && onEventClick) {
            onEventClick(dayEvents);
        }
    };

    const renderEventIndicator = (event) => {
        const category = EVENT_CATEGORIES[event.type] || EVENT_CATEGORIES.event;
        return (
            <div
                key={event.id}
                className="event-indicator"
                style={{ backgroundColor: category.color }}
                title={`${event.title} - ${category.name}`}
            >
                {event.title}
            </div>
        );
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePrevMonth} className="calendar-nav-btn">
                    &lt;
                </button>
                <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth} className="calendar-nav-btn">
                    &gt;
                </button>
            </div>

            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-weekday">
                        {day}
                    </div>
                ))}

                {monthDays.map(day => {
                    const dayEvents = getEventsForDay(day);
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                        <div
                            key={day.toString()}
                            className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isSelected ? 'selected' : ''}`}
                            onClick={() => handleDateClick(day)}
                        >
                            <span className="day-number">{format(day, 'd')}</span>
                            {dayEvents.length > 0 && (
                                <div className="day-events">
                                    {dayEvents.map(renderEventIndicator)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="selected-date-events">
                    <h3>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h3>
                    {getEventsForDay(selectedDate).length > 0 ? (
                        <div className="events-list">
                            {getEventsForDay(selectedDate).map(event => (
                                <div
                                    key={event.id}
                                    className="event-item"
                                    style={{ borderLeftColor: EVENT_CATEGORIES[event.type]?.color }}
                                >
                                    <div className="event-time">
                                        {format(new Date(event.date), 'h:mm a')}
                                    </div>
                                    <div className="event-details">
                                        <div className="event-title">{event.title}</div>
                                        <div className="event-category">
                                            {EVENT_CATEGORIES[event.type]?.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-events">No events scheduled</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calendar; 