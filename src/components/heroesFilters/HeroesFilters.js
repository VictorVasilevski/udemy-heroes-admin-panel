import { useSelector, useDispatch } from "react-redux";
import {getActiveFilter, getFilterBtnData} from '../../utils/filters.js';
import { useEffect } from "react";
import { filtersFetching, filtersFetched, filterApplied, filtersFetchingError } from "../../actions/index.js";
import {useHttp} from '../../hooks/http.hook.js';
import classNames from "classnames";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, appliedFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .then(() => dispatch(filterApplied(appliedFilter)))
            .catch(() => dispatch(filtersFetchingError()))
    }, []);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(f => {
                        const filterData = getFilterBtnData(f.name);
                        const btnClass = classNames('btn', filterData.className, {active: f.name === appliedFilter});
                        return <button 
                                className={btnClass} 
                                data-value={f.name}
                                key={f.name}
                                onClick={(e) => dispatch(filterApplied(e.currentTarget.getAttribute('data-value')))}
                                >
                                    {filterData.ruName}
                                </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;