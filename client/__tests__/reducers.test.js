import deepFreeze from 'deep-freeze';

import { search } from '../src/reducers/reducers';

const testAddUser = () => {
    const stateBefore = {};
    const action = {
        type: 'ADD_USER',
        isAuth: true,
        userId: 'wesleylhandy'
    }
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
    const action = {
        type: 'ADD_SEARCH',
        current_search: 'Virginia Beach, VA',
        places: [],
        geolocated: false
    }
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
    const stateAfter = {
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
    const action = {
        type: 'ADD_GOING',
        id: 1,
        peep: 'wesleylhandy',
        searchDate: '12/11/17'
    }
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
                searchDate: '12/11/17'
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


const testAddGoingUnAuth = () => {
    const stateBefore = {
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
            going: []
        }],
        geolocated: false
    }
    const action = {
        type: 'ADD_GOING',
        id: 1,
        peep: 'wesleylhandy',
        searchDate: '12/11/17'
    }
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
                    searchDate: '12/11/17'
                },
                {
                    id: 2,
                    peep: 'someotherGuy',
                    searchDate: '12/11/17'
                }
            ]
        }],
        geolocated: false
    }
    const action = {
        type: 'REMOVE_GOING',
        id: 1,
        peep: 'wesleylhandy'
    }
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
                searchDate: '12/11/17'
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
                    searchDate: '12/11/17'
                },
                {
                    id: 2,
                    peep: 'someotherGuy',
                    searchDate: '12/11/17'
                }
            ]
        }],
        geolocated: false
    }
    const action = {
        type: 'REMOVE_USER'
    }
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
                searchDate: '12/11/17'
            }, {
                id: 2,
                peep: 'someotherGuy',
                searchDate: '12/11/17'
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

const testRemoveGoingUnAuth = () => {
    const stateBefore = {
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
                    searchDate: '12/11/17'
                },
                {
                    id: 2,
                    peep: 'someotherGuy',
                    searchDate: '12/11/17'
                }
            ]
        }],
        geolocated: false
    }
    const action = {
        type: 'REMOVE_GOING',
        id: 1,
        peep: ''
    }
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
                searchDate: '12/11/17'
            }, {
                id: 2,
                peep: 'someotherGuy',
                searchDate: '12/11/17'
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

describe('adds user', () => {
    test('ADD_USER', testAddUser);
});

describe('removes user (after logout presumably)', () => {
    test('REMOVE_USER', testRemoveUser);
});

describe('adds search term', () => {
    test('ADD_SEARCH', testAddSearch);
})

describe('adds establishment', () => {
    test('ADD_ESTABLISHMENT', testAddEstablishment);
});

describe('adds establishments', () => {
    test('ADD_ESTABLISHMENTS', testAddEstablishments);
});

describe('adds authenticated user to going list', () => {
    test('ADD_GOING', testAddGoing);
});

describe('does not add unauthorized user to going list', () => {
    test('ADD_GOING', testAddGoingUnAuth);
});

describe('removes authenticated user from going list', () => {
    test('REMOVE_GOING', testRemoveGoing);
})

describe('does not remove unauthorized user from going list', () => {
    test('REMOVE_GOING', testRemoveGoingUnAuth);
});