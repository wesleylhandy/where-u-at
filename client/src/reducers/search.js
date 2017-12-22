/**
 * Returns the state of the entire application based on action.type definitions
 * @param {Object} state - state of the application, defaults to empty object if undefined
 * @param {Object} action - action being called to update a new state
 * @param {String} action.type - string reprenting the name of the action. It it matches, then it will return a new state, otherwise it defaults to return previous state
 * @param {String|Object} [action.current_search] - search term or lat/long coords
 * @param {Boolean} [action.geolocated] - true if action.current_search is lat/long coords
 * @returns {Object} - new search term for the application
 */

const search = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_SEARCH':
            return {
                current_search: action.current_search,
                geolocated: action.geolocated,
            }
        case 'REMOVE_SEARCH':
            return {
                current_search: '',
                geolocated: false,
            }
        default:
            return state;
    }
}

export default search;