/**
 * Returns the state of the entire application based on action.type definitions
 * @param {Object} state - state of the application, defaults to empty object if undefined
 * @param {Object} action - action being called to update a new state
 * @param {String} action.type - string reprenting the name of the action. It it matches, then it will return a new state, otherwise it defaults to return previous state
 * @param {Boolean} [action.isAuth]
 * @param {String} [action.userId]
 * @param {String} [action.current_search] - search term or string of lat/long coords
 * @param {Boolean} [action.geolocated] - true if action.current_search is lat/long coords
 * @param {Number} [action.id]
 * @param {Object} [action.data] - business data returned from yelp
 * @param {String} [action.peep] - current user's id if adding onself to going list
 * @param {String} [action.searchDate] - current date in MM-DD-YYYY format
 * @returns {Object} - new state of application
 */
export const search = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                isAuth: true,
                userId: action.userId
            }
        case 'REMOVE_USER':
            return {
                ...state,
                isAuth: false,
                userId: ''
            }
        case 'ADD_SEARCH':
            return {
                isAuth: state.isAuth ? state.isAuth : false,
                userId: state.userId ? state.userId : '',
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
            if (state.isAuth) {
                return {
                    ...state,
                    places: state.places.map(place => establishment(place, action))
                }
            } else return state;
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
                going: state.going.filter(go => go.peep !== action.peep)
            }

        default:
            return state;
    }
}

const going = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GOING':

            return {
                id: action.id,
                searchDate: action.searchDate,
                peep: action.peep
            }
        default:
            return state;
    }
}