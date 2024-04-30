import React from "react";
import "./Calendar.css"; // Додаємо файли стилів

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.state = {
      selectedDate: null, // Початкова обрана дата
      selectedMonth: currentDate.getMonth(), // Обраний місяць
      selectedYear: currentDate.getFullYear(), // Обраний рік
      events: {} // Події для кожної дати
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  handleDateClick(date) {
    // Обробник кліку по даті
    const event = this.state.events[date];
    if (event) {
      alert(`Event for ${date}: ${event}`);
    }
    this.setState({ selectedDate: date });
  }

  handleMonthChange(event) {
    // Обробник зміни місяця
    this.setState({ selectedMonth: parseInt(event.target.value, 10) });
  }

  handleYearChange(event) {
    // Обробник зміни року
    this.setState({ selectedYear: parseInt(event.target.value, 10) });
  }

  handleAddEvent(event) {
    event.preventDefault();
    const { selectedDate, events } = this.state;
    const newEvent = prompt("Enter event:");
    if (newEvent && selectedDate) {
      this.setState({
        events: { ...events, [selectedDate]: newEvent }
      });
    }
  }

  render() {
    const { selectedDate, selectedMonth, selectedYear, events } = this.state;
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const dates = [];

    // Створюємо масив дат для відображення в календарі
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(selectedYear, selectedMonth, i).toISOString().slice(0, 10));
    }

    return (
      <div className="calendar">
        <h2 className="calendar-header">Calendar</h2>
        <div className="controls">
          <select className="month-select" value={selectedMonth} onChange={this.handleMonthChange}>
            <option value={0}>January</option>
            <option value={1}>February</option>
            <option value={2}>March</option>
            <option value={3}>April</option>
            <option value={4}>May</option>
            <option value={5}>June</option>
            <option value={6}>July</option>
            <option value={7}>August</option>
            <option value={8}>September</option>
            <option value={9}>October</option>
            <option value={10}>November</option>
            <option value={11}>December</option>
          </select>
          <input
            type="number"
            className="year-input"
            value={selectedYear}
            onChange={this.handleYearChange}
          />
        </div>
        <div className="dates">
          {dates.map((date) => (
            <div
              key={date}
              className={`date ${
                selectedDate === date ? "selected" : ""
              }`}
              onClick={() => this.handleDateClick(date)}
            >
              {new Date(date).getDate()}
              {events[date] && (
                <span className="event-dot"></span>
              )}
            </div>
          ))}
        </div>
        <div className="selected-date">
          Selected Date: {selectedDate ? selectedDate : "No date selected"}
          {selectedDate && (
            <button className="add-event-btn" onClick={this.handleAddEvent}>Add Event</button>
          )}
        </div>
      </div>
    );
  }
}

export default Calendar;
