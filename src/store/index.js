import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import heroesReducer from '../reducers/heroes';
import filtersReducer from '../reducers/filters';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({heroes: heroesReducer, filters: filtersReducer})
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;