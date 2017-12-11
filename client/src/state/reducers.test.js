import deepFreeze from 'deep-freeze';

import { search } from './reducers.js';

const testAddSearch = () => {
    const stateBefore = {};
    const action = {
        type: 'ADD_SEARCH',
        current_search: 'Virginia Beach, VA',
        places: [],
        geolocated: false
    }
    const stateAfter = {
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

const testAddGoing = () => {
    const stateBefore = {
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
        peep: 'testCode',
        searchDate: '12/11/17'
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
            going: [{
                id: 1,
                peep: 'testCode',
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


const testRemoveGoing = () => {
    const stateBefore = {
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
                    peep: 'testCode',
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
        id: 1
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

test('ADD_SEARCH', testAddSearch);
test('ADD_ESTABLISHMENT', testAddEstablishment);
test('ADD_GOING', testAddGoing);
test('REMOVE_GOING', testRemoveGoing);