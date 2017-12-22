import deepFreeze from 'deep-freeze';

import auth from '../src/reducers/auth';
import search from '../src/reducers/search';
import establishments from '../src/reducers/establishments';

/****   DEFINE AUTHENTICATION REDUCER TESTS ****/
const testAddUser = () => {
    const stateBefore = {};
    const action = {
        type: 'ADD_USER',
        userId: 'wesleylhandy'
    }
    const stateAfter = {
        isAuth: true,
        userId: 'wesleylhandy'
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        auth(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveUser = () => {
        const stateBefore = {
            isAuth: true,
            userId: 'wesleylhandy'
        }
        const action = {
            type: 'REMOVE_USER'
        }
        const stateAfter = {
            isAuth: false,
            userId: ''
        }
        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(
            auth(stateBefore, action)
        ).toEqual(stateAfter);
    }
    /****   END AUTH TESTS  ****/

/****   DEFINE SEARCH REDUCER TESTS ****/

const testAddSearch = () => {
    const stateBefore = {};
    const action = {
        type: 'ADD_SEARCH',
        current_search: 'Virginia Beach, VA',
        geolocated: false
    }
    const stateAfter = {
        current_search: 'Virginia Beach, VA',
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveSearch = () => {
    const stateBefore = {
        current_search: '36.803313,-76.1957616',
        geolocated: true
    };
    const action = {
        type: 'REMOVE_SEARCH',
    }
    const stateAfter = {
        current_search: '',
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

/****   END SEARCH TESTS  ****/

/****   DEFINE ESTABLISHMENT REDUCER TESTS ****/

const testAddEstablishment = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_ESTABLISHMENT',
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: []
    }
    const stateAfter = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: []
    }]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddEstablishments = () => {
    const stateBefore = []

    const action = {
        type: 'ADD_ESTABLISHMENTS',
        places: [{
            id: 'aadf1234',
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: '12345'
            }
        }, {
            id: 'abbc3456',
            data: {
                name: 'Dunkin Donuts',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3,
                display_address: ['122 Lynnhaven Pkwy', 'Virginia Beach, VA'],
                yelpId: '23456'
            }
        }]
    }

    const stateAfter = [{
        id: 'aadf1234',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: '12345'
        },
        going: []
    }, {
        id: 'abbc3456',
        data: {
            name: 'Dunkin Donuts',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3,
            display_address: ['122 Lynnhaven Pkwy', 'Virginia Beach, VA'],
            yelpId: '23456'
        },
        going: []
    }]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveEstablishment = () => {
    const stateBefore = [{
        id: 'aadf1234',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: '12345'
        },
        going: []
    }, {
        id: 'abbc3456',
        data: {
            name: 'Dunkin Donuts',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3,
            display_address: ['122 Lynnhaven Pkwy', 'Virginia Beach, VA'],
            yelpId: '23456'
        },
        going: []
    }]

    const action = {
        type: 'REMOVE_ESTABLISHMENT',
        id: 'aadf1234'
    }

    const stateAfter = [{
        id: 'abbc3456',
        data: {
            name: 'Dunkin Donuts',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3,
            display_address: ['122 Lynnhaven Pkwy', 'Virginia Beach, VA'],
            yelpId: '23456'
        },
        going: []
    }]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveEstablishments = () => {
    const stateBefore = [{
        id: 'aadf1234',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: '12345'
        },
        going: []
    }, {
        id: 'abbc3456',
        data: {
            name: 'Dunkin Donuts',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3,
            display_address: ['122 Lynnhaven Pkwy', 'Virginia Beach, VA'],
            yelpId: '23456'
        },
        going: []
    }]

    const action = {
        type: 'REMOVE_ESTABLISHMENTS'
    }

    const stateAfter = [];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddGoing = () => {
    const stateBefore = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: []
    }]

    const action = {
        type: 'ADD_GOING',
        placeId: 1,
        isAuth: true,
        peep: 'wesleylhandy',
        searchDate: '12/11/17'
    }
    const stateAfter = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
            peep: 'wesleylhandy',
            searchDate: '12/11/17'
        }]
    }]
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}


const testAddGoingUnAuth = () => {
    const stateBefore = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: []
    }]

    const action = {
        type: 'ADD_GOING',
        placeId: 1,
        isAuth: false,
        peep: 'wesleylhandy',
        searchDate: '12/11/17'
    }
    const stateAfter = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: []
    }]

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveGoing = () => {
    const stateBefore = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
                peep: 'wesleylhandy',
                searchDate: '12/11/17'
            },
            {
                peep: 'someotherGuy',
                searchDate: '12/11/17'
            }
        ]
    }]
    const action = {
        type: 'REMOVE_GOING',
        placeId: 1,
        peep: 'wesleylhandy',
        isAuth: true
    }
    const stateAfter = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
            peep: 'someotherGuy',
            searchDate: '12/11/17'
        }]
    }]
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveGoingUnAuth = () => {
    const stateBefore = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
                peep: 'wesleylhandy',
                searchDate: '12/11/17'
            },
            {
                peep: 'someotherGuy',
                searchDate: '12/11/17'
            }
        ]
    }]
    const action = {
        type: 'REMOVE_GOING',
        placeId: 1,
        isAuth: false,
        peep: 'someotherGuy'
    }
    const stateAfter = [{
        id: 1,
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
            peep: 'wesleylhandy',
            searchDate: '12/11/17'
        }, {
            peep: 'someotherGuy',
            searchDate: '12/11/17'
        }]
    }]
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

/****   END ESTAB TESTS  ****/

/****   CALL ALL REDUCER TESTS ****/

describe('adds user', () => {
    test('ADD_USER Reducer', testAddUser);
});

describe('removes user', () => {
    test('REMOVE_USER Reducer', testRemoveUser);
});

describe('adds search term', () => {
    test('ADD_SEARCH Reducer', testAddSearch);
})

describe('removes search term', () => {
    test('REMOVE_SEARCH Reducer', testRemoveSearch);
})

describe('adds establishment', () => {
    test('ADD_ESTABLISHMENT Reducer', testAddEstablishment);
});

describe('removes single establishment', () => {
    test('REMOVE_ESTABLISHMENT Reducer', testRemoveEstablishment);
});

describe('adds establishments', () => {
    test('ADD_ESTABLISHMENTS Reducer', testAddEstablishments);
});

describe('removes all establishments', () => {
    test('REMOVE_ESTABLISHMENTS Reducer', testRemoveEstablishments);
});

describe('adds authenticated user to going list', () => {
    test('ADD_GOING Reducer', testAddGoing);
});

describe('does not add unauthorized user to going list', () => {
    test('ADD_GOING Reducer', testAddGoingUnAuth);
});

describe('removes authenticated user from going list', () => {
    test('REMOVE_GOING Reducer', testRemoveGoing);
})

describe('does not remove unauthorized user from going list', () => {
    test('REMOVE_GOING Reducer', testRemoveGoingUnAuth);
});