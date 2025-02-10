import dayjs from 'dayjs';
import clsx from 'clsx';
import { Icon } from "../Icon/Icon";
import css from './MonthStatsTable.module.css';
import MonthStatsTableItem from '../MonthStatsTableItem/MonthStatsTableItem';
import Loader from '../Loader/Loader';
import { useState, useEffect } from 'react';
import { getWaterMonth } from '../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectWaterLoading,
    selectDailyWaterIntake,
    selectMonthIntake
} from '../../redux/water/selectors';

export default function MonthStatsTable() {
    const loader = useSelector(selectWaterLoading);
    const todayWater = useSelector(selectDailyWaterIntake);
    const monthIntake = useSelector(selectMonthIntake);
    const [month, setMonth] = useState(dayjs().month());
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [fullMonth, setFullMonth] = useState('');
    const [btnTrigger, setBtnTrigger] = useState(true);
    const [activeDay, setActiveDay] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const year = new Date().getFullYear();
    const dispatch = useDispatch();
    let currentMonth;

    useEffect(() => {
        dispatch(getWaterMonth({ month: month + 1 }));
        setDaysInMonth(dayjs(`${currentYear}-${month + 1}-10`).daysInMonth());
        if (month === dayjs().month() && currentYear === year) {
            setBtnTrigger(true);
        } else {
            setBtnTrigger(false);
        }


        if (month === 0) setFullMonth('January');
        if (month === 1) setFullMonth('February');
        if (month === 2) setFullMonth('March');
        if (month === 3) setFullMonth('April');
        if (month === 4) setFullMonth('May');
        if (month === 5) setFullMonth('June');
        if (month === 6) setFullMonth('July');
        if (month === 7) setFullMonth('August');
        if (month === 8) setFullMonth('September');
        if (month === 9) setFullMonth('October');
        if (month === 10) setFullMonth('November');
        if (month === 11) setFullMonth('December');
    }, [dispatch, month, currentYear, year, todayWater]);

    return (
        <section className={css.section}>
            <div className={css.container}>
                <h2 className={css.title}>Month</h2>
                <div className={css.monthBox}>
                    {month !== 0 || currentYear !== year ? (
                        <button
                            type="button"
                            className={css.btn}
                            onClick={() => {
                                if (month === 0) {

                                    setMonth(11);
                                    setCurrentYear(prevYear => prevYear - 1);
                                } else {
                                    currentMonth = month - 1;
                                    setMonth(currentMonth);
                                }
                            }}
                        >
                            <Icon id="icon-chevron-double-up" width="14" height="14" className={css.iconsBack} />
                        </button>
                    ) : null}

                    <p className={clsx(css.text, btnTrigger && css.textMargin)}>
                        {`${fullMonth},  ${currentYear}`}
                    </p>

                    {!btnTrigger && (
                        <button
                            type="button"
                            className={css.btn}
                            onClick={() => {
                                if (month === 11) {

                                    setMonth(0);
                                    setCurrentYear(prevYear => prevYear + 1);
                                } else {
                                    currentMonth = month + 1;
                                    setMonth(currentMonth);
                                }
                            }}
                        >
                            <Icon id="icon-chevron-double-up" width="14" height="14" className={css.iconsFront} />
                        </button>
                    )}
                </div>
            </div>
            {loader && <Loader />}
            {!loader && (
                <ul className={css.list}>
                    {Array(daysInMonth)
                        .fill(0)
                        .map((item, index) => (
                            <li key={index}>
                                <MonthStatsTableItem
                                    day={index + 1}
                                    monthName={fullMonth}
                                    activeDay={activeDay}
                                    setActiveDay={setActiveDay}
                                    monthIntake={monthIntake}
                                />
                            </li>
                        ))}
                </ul>
            )}
        </section>
    );
}
