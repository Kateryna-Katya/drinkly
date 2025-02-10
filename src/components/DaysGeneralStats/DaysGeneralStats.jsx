import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ date, dailyNorm, fulfillment, servings }) => {
    return (
        <div className={css.container}>
            <div className={css.allText}>
                <p className={css.date}>{date}</p>
                <p className={css.dailyNorm}>
                    <span>Daily norma: </span>
                    <span className={css.value}>{dailyNorm} L</span>
                </p>
                <p className={css.fulfillment}>
                    <span>Fulfillment of the daily norm: </span>
                    <span className={css.value}>{fulfillment}%</span>
                </p>
                <p className={css.servings}>
                    <span>How many servings of water: </span>
                    <span className={css.value}>{servings}</span>
                </p>
            </div>
        </div>
    );
};

export default DaysGeneralStats;
