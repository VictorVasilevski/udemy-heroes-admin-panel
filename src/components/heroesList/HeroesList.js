import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { heroesFetching, heroesFetched, heroesFetchingError, heroRemoved } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.appliedFilter,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if (filter === 'all') {
                console.log('render');
                return heroes;
            } else {
                return heroes.filter(item => item.element === filter);
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const removeHero = useCallback((id) => {
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => dispatch(heroRemoved(id)))
            .catch(() => {
                dispatch(heroesFetchingError())
                dispatch(heroesFetched(heroes))
            })
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        // const appliedHeroes = appliedFilter === "all" ? arr : arr.filter(h => h.element === appliedFilter);
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem 
                        key={id}
                        onClick={() => removeHero(id)}
                        {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;