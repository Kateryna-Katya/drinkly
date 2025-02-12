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

import { Icon } from "../Icon/Icon";
import clsx from "clsx";
import DaysGeneralStats from "../DaysGeneralStats/DaysGeneralStats";
import Loader from "../Loader/Loader";
import { useRefresh } from "../useRefresh";

const MonthStatsTable = () => {
  const [offsetLeft, setOffsetLeft] = useState(0);
  const { refresh } = useRefresh();

  const [loader, setLoader] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toString());
  const [monthStats, setMonthStats] = useState(null);
  const [currentMonthStats, setCurrentMonthStats] = useState(null);
  const [openGeneralStats, setOpenGeneralStats] = useState({
    isOpen: false,
    day: null,
  });

  useEffect(() => {
    const getMonthStats = async () => {
      setLoader(true);
      try {
        const { data } = await axios.get(
          `/water/month/${format(currentDate, "yyyy-MM")}`
        );
        setMonthStats(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getMonthStats();
  }, [currentDate, refresh]);

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
    const fullMonthStatsToMap = fullMonthStats.filter(
      (item, index, arr) => arr.indexOf(item) !== 0
    );
    setCurrentMonthStats(fullMonthStatsToMap);
  }, [currentDate, monthStats]);

  const prevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1).toString());
  };
  const nextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1).toString());
  };

  return (
    <>
      {loader && <Loader />}
      <div className={css.wrapper}>
        <h2 className={css.title}>Month</h2>
        <div className={css.control}>
          <button type="button" onClick={prevMonth} className={css.btn}>
            <Icon
              id="icon-chevron-double-up"
              width="14"
              height="14"
              className={css.iconsBack}
            />
          </button>
          <div className={css.text}>{format(currentDate, "MMMM, yyyy")}</div>
          <button
            type="button"
            onClick={nextMonth}
            className={css.btn}
            style={
              format(currentDate, "MMMM") ===
              format(new Date().toString(), "MMMM")
                ? {
                    pointerEvents: "none",
                    opacity: 0,
                  }
                : {
                    pointerEvents: "auto",
                    opacity: 1,
                  }
            }
          >
            <Icon
              id="icon-chevron-double-up"
              width="14"
              height="14"
              className={css.iconsFront}
            />
          </button>
        </div>
      </div>
      {currentMonthStats !== null && (
        <ul className={css.list}>
          {currentMonthStats.map((item, index) => {
            return (
              <li
                key={item.date}
                onClick={(event) => {
                  setOpenGeneralStats({
                    isOpen: !openGeneralStats.isOpen,
                    day: Number(format(parseISO(item.date), "d")),
                  });
                  const liRect = event.target.getBoundingClientRect();
                  const ulRect =
                    event.currentTarget.parentNode.getBoundingClientRect();
                  const offsetLeftPosition = liRect.left - ulRect.left;

                  setOffsetLeft(offsetLeftPosition);
                }}
                className={css.item}
                style={
                  Date.parse(item.date.split("T")[0]) > Date.now()
                    ? {
                        pointerEvents: "none",
                        opacity: 0.4,
                      }
                    : {
                        pointerEvents: "auto",
                        opacity: 1,
                      }
                }
              >
                <p
                  className={clsx(
                    css.day,
                    item.percentage > 100 && css.fullStat
                  )}
                >
                  {index + 1}
                </p>
                <p className={css.percentage}>{`${item.percentage}%`}</p>
                {openGeneralStats.isOpen &&
                  openGeneralStats.day ===
                    Number(format(parseISO(item.date), "d")) && (
                    <DaysGeneralStats item={item} offsetLeft={offsetLeft} />
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
