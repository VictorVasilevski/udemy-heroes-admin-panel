const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    appliedFilter: 'all'
}

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTER_APPLIED':
            return {
                ...state,
                appliedFilter: action.payload,
            }
        default: return state
    }
}

export default filtersReducer;