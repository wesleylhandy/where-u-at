/**
 * Returns an object that will be dispacthed to the Redux Store for Adding a User
 * @param {Object} user - Twitter User Object
 * @param {Boolean} isAuth - set to true if authorized with Twitter
 * @returns {Object}
 */
export const addUser = (user, isAuth) => {
    if (isAuth)
        return {
            type: 'ADD_USER',
            user,
            isAuth
        }
    else return {
        type: 'REMOVE_USER'
    }
}

/**
 * Returns an object with a single key/value pair to the Redux Store for Logging Out a User
 * @returns {Object}
 */
export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

/**
 * Returns an object to set the Current Search term. Will trigger an api call to YELP api.
 * @param {String|Object} current_search - will be a location string or a pair of latitude/longitude coordinates
 * @param {Boolean} geolocated - internal logic sets to true if current_search matches regex for lat/long coords
 * @returns {Object}
 */
export const addSearch = (current_search, geolocated) => {
    return {
        type: 'ADD_SEARCH',
        current_search,
        geolocated
    }
}

/**
 * Returns an object to clear the current search term
 * @returns {Object}
 */
export const removeSearch = () => {
    return {
        type: 'REMOVE_SEARCH'
    }
}

/**
 * Returns an object to be dispatched to the redux store for adding an Establishment to the Display List
 * @param {String} id - id for this specific place
 * @param {Object} place -an object containing the following values:
 * @param {String} place.name
 * @param {String} place.imageUrl
 * @param {Number} place.rating
 * @param {String} place.yelpId
 * @param {Object[]} place.display_address - an array that stores the address of the business in two or three entries
 * @returns {Object}
 */
export const addEstablishment = (id, place) => {
    return {
        type: 'ADD_ESTABLISHMENT',
        id,
        place
    }
}

/**
 * Returns an object to be dispatched to the redux store to create an array of Establishments returned from Yelp API
 * @param {Object[]} places - array of data returned from the yelp api
 * @returns {Object}
 */

export const addEstablishments = (places) => {
    return {
        type: 'ADD_ESTABLISHMENTS',
        places
    }
}

/**
 * Returns an object to be dispatched to which will call for the removal a single Establishment from the list
 * @param {String} id - id of the establishment to be removed
 * @returns {Object}
 */
export const removeEstablishment = (id) => {
    return {
        type: 'REMOVE_ESTABLISHMENT',
        id
    }
}

/**
 * Clears entire establishment list
 * @returns {Object}
 */
export const removeEstablishments = () => {
    return {
        type: 'REMOVE_ESTABLISHMENTS'
    }
}

/**
 * Returns an object to be dispatched to the redux store for an authorized user to indicate they are going to a particular location
 * @param {String} id - id of the location
 * @param {String} userName - twitter handle of the current user
 * @param {String} searchDate - timestamp in format MM-DD-YYYY 
 * @param {Boolean} isAuth - whether or not the user is authorized to make this action
 * @returns {Object}
 */
export const addGoing = (id, userName, searchDate, isAuth) => {
    return {
        type: 'ADD_GOING',
        placeId: id,
        peep: userName,
        isAuth,
        searchDate
    }
}

/**
 * Returns an object to be dispacted to the redux store for removing an authorized user from those going to a particular location
 * @param {String} id - index of the particular location
 * @param {String} userName - id of the currently logged in user
 * @param {Boolean} isAuth - whether or not the user is authorized to make this action
 * @returns {Object}
 */
export const removeGoing = (id, userName, isAuth) => {
    return {
        type: 'REMOVE_GOING',
        placeId: id,
        peep: userName,
        isAuth
    }
}