import {
  addMonths,
  format,
  formatISO,
  getDaysInMonth,
  getMonth,
  getYear,
  parseISO,
  subMonths,
} from "date-fns";
import { useEffect, useState } from "react";
import css from "./MonthStatsTable.module.css";
import axios from "axios";

const MonthStatsTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toString());
  const [monthStats, setMonthStats] = useState(null);
  const [currentMonthStats, setCurrentMonthStats] = useState(null);
  const [openGeneralStats, setOpenGeneralStats] = useState({
    isOpen: false,
    day: null,
  });

  useEffect(() => {
    const getMonthStats = async () => {
      try {
        const { data } = await axios.get(
          `/water/month/${format(currentDate, "yyyy-MM")}`
        );
        setMonthStats(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMonthStats();
  }, [currentDate]);

  useEffect(() => {
    if (monthStats === null) return;
    const year = getYear(currentDate);
    const month = getMonth(currentDate);
    const fullMonthStats = new Array(getDaysInMonth(currentDate) + 1)
      .fill(0)
      .map((item, index) => {
        const foundDay = monthStats.find((item) => {
          return Number(format(parseISO(item.date), "d")) === index;
        });
        if (foundDay) return foundDay;
        return {
          date: formatISO(new Date(year, month, index)),
          waterRecords: [],
          totalAmount: 0,
          dailyNorm: 0,
          percentage: 0,
        };
      });
    fullMonthStats.shift();
    setCurrentMonthStats(fullMonthStats);
  }, [currentDate, monthStats]);

  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1).toString());
  };
  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1).toString());
  };

  return (
    <>
      <div className={css.wrapper}>
        <h2 className={css.title}>Month</h2>
        <div className={css.control}>
          <button type="button" onClick={prevMonth}>
            P
          </button>
          <div>{format(currentDate, "MMMM yyyy")}</div>
          <button type="button" onClick={nextMonth}>
            N
          </button>
        </div>
      </div>
      {currentMonthStats !== null && (
        <ul className={css.list}>
          {currentMonthStats.map((item, index) => {
            return (
              <li
                onClick={() => {
                  setOpenGeneralStats({
                    isOpen: !openGeneralStats.isOpen,
                    day: Number(format(parseISO(item.date), "d")),
                  });
                }}
                key={item.date}
              >
                {index + 1} {item.percentage}
                {openGeneralStats.isOpen &&
                  openGeneralStats.day ===
                    Number(format(parseISO(item.date), "d")) && (
                    <div>{item.date}</div>
                  )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MonthStatsTable;
