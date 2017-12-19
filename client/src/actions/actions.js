/**
 * Returns an object that will be dispacthed to the Redux Store for Adding a User
 * @param {String} userId - userId from Twitter, if any
 * @param {Boolean} isAuth - set to true if authorized with Twitter
 * @returns {Object}
 */
export const addUser = (userId, isAuth) => {
    return {
        type: 'ADD_USER',
        userId,
        isAuth
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
 * @param {String} current_search - will be a location string or a pair of latitude/longitude coordinates
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
 * Returns an object to be dispatched to the redux store for adding an Establishment to the Display List
 * @param {Number} id - represents index in the array of establishments of this single place
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
        data: place
    }
}

/**
 * Returns an object to be dispatched to the redux store with an array of Establishments returned from Yelp API
 * @param {Object[]} places - array of data returned from the yelp api
 */

export const addEstablishments = (places) => {
    return {
        type: 'ADD_ESTABLISHMENTS',
        places
    }
}

/**
 * Returns an object to be dispatched to the redux store for an authorized user to indicate they are going to a particular location
 * @param {Number} id - represents the index for this paricular user to be added to the array of users currently registered at this location
 * @param {String} userId - id of the current logged in user
 * @param {String} searchDate - timestamp in format MM-DD-YYYY 
 * @returns {Object}
 */
export const addGoing = (id, userId, searchDate) => {
    return {
        type: 'ADD_GOING',
        id,
        peep: userId,
        searchDate
    }
}

/**
 * Returns an object to be dispacted to the redux store for removing an authorized user from those going to a particular location
 * @param {Number} id - Represents the index for this particular user to be removed from the array of users currently registered at this location
 * @param {String} userId - id of the currently logged in user
 * @returns {Object}
 */
export const removeGoing = (id, userId) => {
    return {
        type: 'REMOVE_GOING',
        id,
        peep: userId
    }
}