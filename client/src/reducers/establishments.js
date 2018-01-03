/**
 * Returns the state of the entire application based on action.type definitions
 * @param {Object} state - state of the application, defaults to empty object if undefined
 * @param {Object} action - action being called to update a new state
 * @param {String} action.type - string reprenting the name of the action. It it matches, then it will return a new state, otherwise it defaults to return previous state
 * @param {Boolean} action.isAuth - represents is the user is logged in or not
 * @param {Number} [action.placeId] - id of a single establishment - for editing or removing establishment
 * @param {String} [action.userId] - ide of a single user
 * @param {Object} [action.place] - business data returned from yelp
 * @param {Object[]} [action.places] - list of businesses returned from yelp api
 * @param {String} [action.peep] - current user's id if adding onself to going list
 * @param {String} [action.searchDate] - current date in MM-DD-YYYY format
 * @returns {Object} - new state of application
 */

const establishments = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ESTABLISHMENT':
            return [
                ...state, establishment(undefined, action)
            ];
        case 'ADD_ESTABLISHMENTS':
            return [
                ...state,
                ...action.places.map(place => {
                    const secondaryAction = {...place, type: "ADD_ESTABLISHMENT" };
                    return establishment(undefined, secondaryAction);
                })
            ];
        case 'REMOVE_ESTABLISHMENT':
            return [
                ...state.filter(place => place.id !== action.id)
            ];
        case 'REMOVE_ESTABLISHMENTS':
            return [];
        case 'ADD_GOING':
        case 'REMOVE_GOING':
            if (action.isAuth) {
                return [
                    ...state.map(place => place.id === action.placeId ? establishment(place, action) : place)
                ]
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
                place: action.place,
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
                going: [...state.going.filter(go => go.peep !== action.peep)]
            }

        default:
            return state;
    }
}

const going = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GOING':
            return {
                searchDate: action.searchDate,
                peep: action.peep
            }
        default:
            return state;
    }
}

export default establishments;