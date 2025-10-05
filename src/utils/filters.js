export const getFilterBtnData = (filterName) => {
    return {
        all: {
            className: "btn-outline-dark",
            ruName: "Все"
        },
        fire: {
            className: "btn-danger",
            ruName: "Огонь"
        },
        water: {
            className: "btn-primary",
            ruName: "Вода"
        },
        wind: {
            className: "btn-success",
            ruName: "Ветер"
        },
        earth: {
            className: "btn-secondary",
            ruName: "Земля"
        },
    }[filterName]
}