import { configureStore } from '@reduxjs/toolkit';
import heroesReducer from '../components/heroesList/heroesSlice';
import filtersReducer from '../components/heroesFilters/filterSlice';

const store = configureStore({
    reducer: {heroes: heroesReducer, filters: filtersReducer},
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;