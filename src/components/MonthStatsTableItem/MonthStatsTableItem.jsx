import React, { useEffect, useState } from 'react';
import css from './MonthStatsTableItem.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectDailyWaterIntake, selectMonthIntake } from '../../redux/water/selectors';
import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import Popover from '@mui/material/Popover';
import { selectUser } from '../../redux/auth/selectors.js';

export default function MonthStatsTableItem({
    day,
    monthName,
    activeDay,
    setActiveDay,
}) {
    const [persent, setPersent] = useState('0');
    const [trigger, setTrigger] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const monthIntake = useSelector(selectMonthIntake) || {};
    const dailyWaterIntake = useSelector(selectDailyWaterIntake) || {};
    const user = useSelector(selectUser) || {};

    const { data } = monthIntake;
    const { percentage } = dailyWaterIntake;
    const { dailyNorma } = user;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const today = new Date();
    const isToday = today.getDate() === day;
    const isCurrentMonth =
        today.toLocaleString('en-US', { month: 'long' }) === monthName;
    const isCurrentYear = today.getFullYear() === new Date().getFullYear();

    useEffect(() => {
        if (isToday && isCurrentMonth && isCurrentYear) {
            const todayPercentage =
                typeof percentage === 'string'
                    ? parseInt(percentage.replace('%', ''), 10)
                    : percentage;

            if (!isNaN(todayPercentage)) {
                setPersent(todayPercentage >= 100 ? '100' : todayPercentage.toString());
                setTrigger(todayPercentage < 100);
            }
        } else {
            if (Array.isArray(data)) {
                const dayData = data.find(
                    item =>
                        item.date.slice(8) === day.toString() ||
                        item.date.slice(8) === `0${day}`
                );

                if (dayData) {
                    const dayPercentage = parseInt(dayData.percentage.slice(0, -1));
                    setPersent(dayPercentage >= 100 ? '100' : dayPercentage.toString());
                    setTrigger(dayPercentage < 100);
                } else {
                    setPersent('0');
                    setTrigger(true);
                }
            } else {
                setPersent('0');
                setTrigger(true);
            }
        }
    }, [data, day, percentage, isToday, isCurrentMonth, isCurrentYear]);

    const handleDayClick = element => {
        setAnchorEl(element.currentTarget);
        setActiveDay(activeDay === day ? null : day);
    };

    const isActive = activeDay === day;

    return (
        <div className={css.box}>
            <span
                className={clsx(css.day, trigger && css.dayBorder)}
                onClick={e => handleDayClick(e)}
            >
                {day}
            </span>
            <p className={css.persent}>{`${persent}%`}</p>
            <Popover
                id={`day${day}`}
                open={anchorEl !== null && isActive}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <DaysGeneralStats
                    date={`${day}, ${monthName}`}
                    dailyNorm={isToday ? dailyNorma / 1000 : (data?.find(item => item.date.slice(8) === day.toString())?.dailyNorma / 1000 || '1.5')}
                    fulfillment={persent}
                    servings={data?.find(item => item.date.slice(8) === day.toString())?.consumptionCount || 0}
                />
            </Popover>
        </div>
    );
}