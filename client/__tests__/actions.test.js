import deepFreeze from 'deep-freeze';
import { addUser, removeUser, addEstablishment, addEstablishments, addSearch, addGoing, removeGoing } from '../src/actions/actions';
import { search } from '../src/reducers/reducers';

const testAddUser = () => {
    const stateBefore = {};

    const action = addUser('wesleylhandy', true);

    const stateAfter = {
        isAuth: true,
        userId: 'wesleylhandy'
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddSearch = () => {
    const stateBefore = {};

    const action = addSearch('Virginia Beach, VA', false);

    const stateAfter = {
        isAuth: false,
        userId: '',
        current_search: 'Virginia Beach, VA',
        places: [],
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddEstablishment = () => {
    const stateBefore = {
        current_search: 'Virginia Beach, VA',
        places: [],
        geolocated: false
    }

    const action = addEstablishment(1, { name: 'Starbucks', imageUrl: 'http://lorempixel.com/business', rating: 3.5, display_address: ['233 Independence Blvd', 'Virginia Beach, VA'], yelpId: '12345' })

    const stateAfter = {
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: '12345'
            },
            going: []
        }],
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddEstablishments = () => {
    const stateBefore = {
        current_search: 'Virginia Beach, VA',
        places: [],
        geolocated: false
    }

    const action = addEstablishments([{
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
    }]);

    const stateAfter = {
        current_search: 'Virginia Beach, VA',
        places: [{
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
        }],
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testAddGoing = () => {
    const stateBefore = {
        isAuth: true,
        userId: 'wesleylhandy',
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: 12345
            },
            going: []
        }],
        geolocated: false
    }
    const action = addGoing(1, 'wesleylhandy', '12-11-17');

    const stateAfter = {
        isAuth: true,
        userId: 'wesleylhandy',
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: 12345
            },
            going: [{
                id: 1,
                peep: 'wesleylhandy',
                searchDate: '12-11-17'
            }]
        }],
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveGoing = () => {
    const stateBefore = {
        isAuth: true,
        userId: 'wesleylhandy',
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: 12345
            },
            going: [{
                    id: 1,
                    peep: 'wesleylhandy',
                    searchDate: '12-11-17'
                },
                {
                    id: 2,
                    peep: 'someotherGuy',
                    searchDate: '12-11-17'
                }
            ]
        }],
        geolocated: false
    }
    const action = removeGoing(1, 'wesleylhandy')

    const stateAfter = {
        isAuth: true,
        userId: 'wesleylhandy',
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: 12345
            },
            going: [{
                id: 2,
                peep: 'someotherGuy',
                searchDate: '12-11-17'
            }]
        }],
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

const testRemoveUser = () => {
    const stateBefore = {
        isAuth: true,
        userId: 'wesleylhandy',
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: 12345
            },
            going: [{
                    id: 1,
                    peep: 'wesleylhandy',
                    searchDate: '12-11-17'
                },
                {
                    id: 2,
                    peep: 'someotherGuy',
                    searchDate: '12-11-17'
                }
            ]
        }],
        geolocated: false
    }
    const action = removeUser();

    const stateAfter = {
        isAuth: false,
        userId: '',
        current_search: 'Virginia Beach, VA',
        places: [{
            id: 1,
            data: {
                name: 'Starbucks',
                imageUrl: 'http://lorempixel.com/business',
                rating: 3.5,
                display_address: ['233 Independence Blvd', 'Virginia Beach, VA'],
                yelpId: 12345
            },
            going: [{
                id: 1,
                peep: 'wesleylhandy',
                searchDate: '12-11-17'
            }, {
                id: 2,
                peep: 'someotherGuy',
                searchDate: '12-11-17'
            }]
        }],
        geolocated: false
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        search(stateBefore, action)
    ).toEqual(stateAfter);
}

describe('calls action to and successfully adds user', () => {
    test('addUser() action', testAddUser);
});

describe('calls action to and successfully removes user', () => {
    test('removeUser() action', testRemoveUser);
});

describe('calls action to and successfully adds search term', () => {
    test('addSearch() action', testAddSearch);
})

describe('calls action to and successfully adds establishment', () => {
    test('addEstablishment() action', testAddEstablishment);
});

describe('calls action to and successfully adds an array of establishments', () => {
    test('addEstablishments() action', testAddEstablishments);
})

describe('calls action to and successfully adds authenticated user to going list', () => {
    test('addGoing() action', testAddGoing);
});

describe('calls action to and successfully removes authenticated user from going list', () => {
    test('removeGoing() action', testRemoveGoing);
})