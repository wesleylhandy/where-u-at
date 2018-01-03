/**
 * Returns the state of the entire application based on action.type definitions
 * @param {Object} state - state of the application, defaults to empty object if undefined
 * @param {Object} action - action being called to update a new state
 * @param {String} action.type - string reprenting the name of the action. It it matches, then it will return a new state, otherwise it defaults to return previous state
 * @param {String} [action.userId]
 * @returns {Object} - new state of user authorization for the application
 */

const auth = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return {
                ...state,
                isAuth: true,
                user: {...action.user }
            }
        case 'REMOVE_USER':
            return {
                ...state,
                isAuth: false,
                user: {}
            }
        default:
            return state
    }
}

export default auth;