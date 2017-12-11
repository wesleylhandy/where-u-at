const search = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_SEARCH':
            return {
                current_search: action.current_search,
                geolocated: action.geolocated,
                places: []
            }
        case 'ADD_ESTABLISHMENT':
            return {
                ...state,
                places: [...state.places, establishment(undefined, action)]
            }
        case 'ADD_GOING':
        case 'REMOVE_GOING':
            return {
                ...state,
                places: state.places.map(place => establishment(place, action))
            }
        default:
            return state;
    }
}

const establishment = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ESTABLISHMENT':
            return {
                id: action.id,
                data: action.data,
                going: []
            }
        case 'ADD_GOING':
            return {
                ...state,
                going: [...state.going, going(undefined, action)]
            }
        case 'REMOVE_GOING':
            return {
                ...state,
                going: state.going.filter(go => go.id !== action.id)
            }
        default:
            return state;
    }
}

const going = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GOING':
            return {
                ...state,
                searchDate: action.searchDate,
                peep: action.peep
            }
        default:
            return state;
    }
}