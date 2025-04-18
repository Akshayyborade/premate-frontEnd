import React, { useState, useMemo } from 'react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay, isSameWeek } from 'date-fns';
import './Timetable.css';
import Button from '../../../common/Button/Button';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const Timetable = ({ data, onUpdateSchedule }) => {
  const [selectedGrade, setSelectedGrade] = useState(data.grades[0]);
  const [selectedBatch, setSelectedBatch] = useState(data.batches[0]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('week');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const weekDates = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentDate]);

  const handleDateChange = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction * 7));
      return newDate;
    });
  };

  const getFilteredSchedule = (date) => {
    return data.schedule.filter(item =>
      item.grade === selectedGrade &&
      item.batch === selectedBatch &&
      isSameDay(new Date(item.date), date) &&
      (searchTerm === '' || 
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.room.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleEditSlot = (date, time) => {
    const existingSlot = data.schedule.find(item =>
      isSameDay(new Date(item.date), date) &&
      item.time === time &&
      item.grade === selectedGrade &&
      item.batch === selectedBatch
    );

    setEditingSlot({
      date: format(date, 'yyyy-MM-dd'),
      time,
      subject: existingSlot?.subject || '',
      teacher: existingSlot?.teacher || '',
      room: existingSlot?.room || ''
    });
    setIsEditing(true);
  };

  const handleSaveSlot = () => {
    if (onUpdateSchedule && editingSlot) {
      onUpdateSchedule({
        ...editingSlot,
        grade: selectedGrade,
        batch: selectedBatch
      });
      setIsEditing(false);
      setEditingSlot(null);
    }
  };

  const handleClearSlot = () => {
    if (onUpdateSchedule && editingSlot) {
      onUpdateSchedule({
        ...editingSlot,
        grade: selectedGrade,
        batch: selectedBatch,
        subject: '',
        teacher: '',
        room: ''
      });
      setIsEditing(false);
      setEditingSlot(null);
    }
  };

  const renderEditForm = () => (
    <div className="edit-form">
      <h3>Edit Schedule Slot</h3>
      <div className="form-group">
        <label>Date</label>
        <input
          type="date"
          value={editingSlot?.date}
          onChange={(e) => setEditingSlot(prev => ({ ...prev, date: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label>Time</label>
        <select
          value={editingSlot?.time}
          onChange={(e) => setEditingSlot(prev => ({ ...prev, time: e.target.value }))}
        >
          {TIME_SLOTS.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Subject</label>
        <input
          type="text"
          value={editingSlot?.subject}
          onChange={(e) => setEditingSlot(prev => ({ ...prev, subject: e.target.value }))}
          placeholder="Enter subject name"
        />
      </div>
      <div className="form-group">
        <label>Teacher</label>
        <input
          type="text"
          value={editingSlot?.teacher}
          onChange={(e) => setEditingSlot(prev => ({ ...prev, teacher: e.target.value }))}
          placeholder="Enter teacher name"
        />
      </div>
      <div className="form-group">
        <label>Room</label>
        <input
          type="text"
          value={editingSlot?.room}
          onChange={(e) => setEditingSlot(prev => ({ ...prev, room: e.target.value }))}
          placeholder="Enter room number"
        />
      </div>
      <div className="form-actions">
        <Button onClick={handleSaveSlot} variant="primary">Save</Button>
        <Button onClick={handleClearSlot} variant="secondary">Clear</Button>
        <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
      </div>
    </div>
  );

  const renderTimetable = () => (
    <div className="timetable-grid">
      <div className="timetable-header">
        <div className="time-column">Time</div>
        {weekDates.map(date => (
          <div key={date.toString()} className="day-column">
            <div className="day-name">{DAYS[date.getDay()]}</div>
            <div className="date">{format(date, 'MMM d')}</div>
          </div>
        ))}
      </div>
      <div className="timetable-body">
        {TIME_SLOTS.map(time => (
          <div key={time} className="time-row">
            <div className="time-slot">{time}</div>
            {weekDates.map(date => {
              const schedule = getFilteredSchedule(date);
              const slot = schedule.find(item => item.time === time);
              return (
                <div
                  key={date.toString()}
                  className={`schedule-slot ${slot ? 'occupied' : ''}`}
                  onClick={() => handleEditSlot(date, time)}
                >
                  {slot && (
                    <div className="slot-content">
                      <div className="subject">{slot.subject}</div>
                      <div className="teacher">{slot.teacher}</div>
                      <div className="room">{slot.room}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="timetable-container">
      <div className="timetable-controls">
        <div className="filters">
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
          <input
            type="text"
            placeholder="Search by subject, teacher, or room"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="navigation">
          <Button onClick={() => handleDateChange(-1)} variant="outline">
            Previous Week
          </Button>
          <span className="week-range">
            {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'MMM d, yyyy')}
          </span>
          <Button onClick={() => handleDateChange(1)} variant="outline">
            Next Week
          </Button>
        </div>
      </div>

      {isEditing ? renderEditForm() : renderTimetable()}
    </div>
  );
};

export default Timetable;