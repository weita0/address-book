import { useState } from "react";
import dayjs from "dayjs";
import "./index-tw.css";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => {
            setCurrentMonth((p) => p.subtract(1, "month"));
          }}
        >
          {"<-"}
        </button>
        <h2>{currentMonth.format("MM/YYYY")}</h2>
        <button
          onClick={() => {
            setCurrentMonth((p) => p.add(1, "month"));
          }}
        >
          {"->"}
        </button>
      </div>
    );
  };
  const renderDays = () => {
    const days = [];
    const dateFormat = "ddd";
    const startDate = currentMonth.startOf("week"); // sun.
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center text-gray-500 font-bold font-medium"
        >
          {startDate.add(i, "day").format(dateFormat)}
        </div>
      );
    }
    return <div className="grid grid-cols-7">{days}</div>;
  };
  const renderCells = () => {
    const monthStart = currentMonth.startOf("month");
    const monthEnd = currentMonth.endOf("month");
    const startDate = monthStart.startOf("week");
    const endDate = monthEnd.endOf("week");
    const rows = [];
    let days = [];
    let day = startDate;
    let today = dayjs();

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formatted = day.format("DD");
        const isToday = day.isSame(today, "day");
        const isCurrentMonth = day.isSame(today, "month");
        // console.log(`${formatted} same month:${isCurrentMonth} today: ${isToday}`);
        days.push(
          <div
            key={day.format("DDMMYYYY")}
            className={`p-2 text-center border hover:bg-blue-100 cursor-pointer ${
              isToday ? "bg-blue-200 font-bold" : ""
            } ${!isCurrentMonth ? "text-gray-400" : ""}`}
          >
            {formatted}
          </div>
        );
        day = day.add(1, "day");
      }
      rows.push(<div className="grid grid-cols-7">{days}</div>);
      days = [];
    }
    return <div>{rows}</div>;
  };
  return (
    <div style={{ width: "100%" }}>
      <h1>Calendar</h1>
      <div className="max-w-md mx-auto border rounded p-4 shadow">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}

export default Calendar;
