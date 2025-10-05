export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroRemoved = (heroId) => {
    return {
        type: 'HERO_REMOVED',
        payload: heroId,
    }
}

export const heroAdded = (heroData) => {
    return {
        type: 'HERO_ADDED',
        payload: heroData,
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    console.log(filters);
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filterApplied = (name) => {
    return {
        type: 'FILTER_APPLIED',
        payload: name
    }
}