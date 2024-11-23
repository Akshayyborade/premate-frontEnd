import React, { useState, useMemo } from 'react';
import './Timetable.css';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const Timetable = ({ data }) => {
  const [selectedGrade, setSelectedGrade] = useState(data.grades[0]);
  const [selectedBatch, setSelectedBatch] = useState(data.batches[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('day');

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getWeekDates = (date) => {
    const week = [];
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  const handleDateChange = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + direction);
    } else {
      newDate.setDate(currentDate.getDate() + (direction * 7));
    }
    setCurrentDate(newDate);
  };

  const toggleView = () => {
    setView(prev => prev === 'day' ? 'week' : 'day');
  };

  const getFilteredSchedule = (date) => {
    return data.schedule.filter(item =>
      item.grade === selectedGrade &&
      item.batch === selectedBatch &&
      formatDate(new Date(item.date)) === formatDate(date)
    );
  };

  const renderDayView = () => {
    const filteredSchedule = getFilteredSchedule(currentDate);
    return (
      <div className="timetable-day-view">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Room</th>
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(time => {
              const slot = filteredSchedule.find(item => item.time === time);
              return (
                <tr key={time}>
                  <td>{time}</td>
                  <td>{slot?.subject || '-'}</td>
                  <td>{slot?.teacher || '-'}</td>
                  <td>{slot?.room || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderWeekView = () => {
    return (
      <div className="timetable-week-view">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              {weekDates.map(date => (
                <th key={date.toISOString()}>
                  <div className="day-name">{DAYS[date.getDay()]}</div>
                  <div className="date">{date.toLocaleDateString()}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(time => (
              <tr key={time}>
                <td>{time}</td>
                {weekDates.map(date => {
                  const schedule = getFilteredSchedule(date);
                  const slot = schedule.find(item => item.time === time);
                  return (
                    <td key={date.toISOString()} className={slot ? 'scheduled' : ''}>
                      {slot && (
                        <div className="schedule-slot">
                          <div className="subject">{slot.subject}</div>
                          <div className="teacher">{slot.teacher}</div>
                          <div className="room">{slot.room}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="timetable-container">
      <div className="timetable-header">
        <h2>Class Timetable</h2>
        <div className="timetable-filters">
          <select 
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            {data.grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <select 
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {data.batches.map(batch => (
              <option key={batch} value={batch}>Batch {batch}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="timetable-controls">
        <button onClick={() => handleDateChange(-1)} className="nav-button">
          ←
        </button>
        <div className="date-display">
          {view === 'day' 
            ? currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
            : `Week of ${weekDates[0].toLocaleDateString()} - ${weekDates[6].toLocaleDateString()}`
          }
        </div>
        <button onClick={() => handleDateChange(1)} className="nav-button">
          →
        </button>
        <button onClick={toggleView} className="view-toggle">
          {view === 'day' ? 'Week View' : 'Day View'}
        </button>
      </div>

      {view === 'day' ? renderDayView() : renderWeekView()}
    </div>
  );
};

export default Timetable;