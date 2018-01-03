import deepFreeze from 'deep-freeze';
import { addUser, removeUser, addEstablishment, addEstablishments, removeEstablishment, removeEstablishments, addSearch, removeSearch, addGoing, removeGoing } from '../src/actions/actions';

import auth from '../src/reducers/auth';
import search from '../src/reducers/search';
import establishments from '../src/reducers/establishments';

/****   DEFINE AUTHENTICATION ACTION TESTS ****/

const testAddUser = () => {
    const stateBefore = {};

    const action = addUser({
        name: 'wesleylhandy',
        email: 'werwe@ere.com',
        id: '6546546546',
        twitterProvider: {
            id: '6546546546',
            token: 'aadf',
            tokenSecret: 'adfa'
        }
    }, true);

    const stateAfter = {
        isAuth: true,
        user: {
            name: 'wesleylhandy',
            email: 'werwe@ere.com',
            id: '6546546546',
            twitterProvider: {
                id: '6546546546',
                token: 'aadf',
                tokenSecret: 'adfa'
            }
        }
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
        user: {
            name: 'wesleylhandy',
            email: 'werwe@ere.com',
            id: '6546546546',
            twitterProvider: {
                id: '6546546546',
                token: 'aadf',
                tokenSecret: 'adfa'
            }
        },
    }

    const action = removeUser();

    const stateAfter = {
        isAuth: false,
        user: {},
    }

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        auth(stateBefore, action)
    ).toEqual(stateAfter);
}

/****   END AUTHENTICATION TESTS    ****/

/****   DEFINE SEARCH ACTION TESTS ****/

const testAddSearch = () => {
    const stateBefore = {};

    const action = addSearch('Virginia Beach, VA', false);

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

    const action = removeSearch();

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

/****   END SEARCH TESTS    ****/

/****   DEFINE ESTABLISHMENT ACTION TESTS ****/

const testAddEstablishment = () => {
    const stateBefore = []

    const action = addEstablishment(1, { name: 'Starbucks', imageUrl: 'http://lorempixel.com/business', rating: 3.5, display_address: ['233 Independence Blvd', 'Virginia Beach, VA'], yelpId: '12345' })

    const stateAfter = [{
        id: 1,
        place: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: '12345'
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

    const action = addEstablishments([{
        id: 'aadf1234',
        place: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: '12345'
        }
    }, {
        id: 'abbc3456',
        place: {
            name: 'Dunkin Donuts',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3,
            display_address: ['122 Lynnhaven Pkwy', 'Virginia Beach, VA'],
            yelpId: '23456'
        }
    }]);

    const stateAfter = [{
        id: 'aadf1234',
        place: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: '12345'
        },
        going: []
    }, {
        id: 'abbc3456',
        place: {
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
    }];

    const action = removeEstablishment('aadf1234');

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
    }];

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
    }];

    const action = removeEstablishments();

    const stateAfter = [];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddGoing = () => {
    const stateBefore = [{
        id: '1b',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: []
    }];

    const action = addGoing('1b', 'wesleylhandy', '12-11-17', true);

    const stateAfter = [{
        id: '1b',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
            peep: 'wesleylhandy',
            searchDate: '12-11-17'
        }]
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveGoing = () => {
    const stateBefore = [{
        id: '1b',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
                peep: 'wesleylhandy',
                searchDate: '12-11-17'
            },
            {
                peep: 'someotherGuy',
                searchDate: '12-11-17'
            }
        ]
    }];

    const action = removeGoing('1b', 'wesleylhandy', true)

    const stateAfter = [{
        id: '1b',
        data: {
            name: 'Starbucks',
            imageUrl: 'http://lorempixel.com/business',
            rating: 3.5,
            display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
            yelpId: 12345
        },
        going: [{
            peep: 'someotherGuy',
            searchDate: '12-11-17'
        }]
    }];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        establishments(stateBefore, action)
    ).toEqual(stateAfter);
}

/****   END ESTABLISHMENT TESTS ****/

/****   CALL ALL ACTION TESTS   ****/

describe('calls action to and successfully adds user', () => {
    test('addUser() action', testAddUser);
});

describe('calls action to and successfully removes user', () => {
    test('removeUser() action', testRemoveUser);
});

describe('calls action to and successfully adds search term', () => {
    test('addSearch() action', testAddSearch);
})

describe('calls action to and successfully removes search term', () => {
    test('removeSearch() action', testRemoveSearch);
})

describe('calls action to and successfully adds establishment', () => {
    test('addEstablishment() action', testAddEstablishment);
});

describe('calls action to and successfully adds an array of establishments', () => {
    test('addEstablishments() action', testAddEstablishments);
})

describe('calls action to and successfully removes single establishment', () => {
    test('removeEstablishment() action', testRemoveEstablishment);
});

describe('calls action to and successfully removes all establishments', () => {
    test('removeEstablishments() action', testRemoveEstablishments);
});

describe('calls action to and successfully adds authenticated user to going list', () => {
    test('addGoing() action', testAddGoing);
});

describe('calls action to and successfully removes authenticated user from going list', () => {
    test('removeGoing() action', testRemoveGoing);
});