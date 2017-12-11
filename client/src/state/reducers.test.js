import deepFreeze from 'deep-freeze';

const search = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_SEARCH':
            return {
                current_search: action.current_search,
                geolocated: action.geolocated,
                places: []
            }
        case 'ADD_ESTABLISHMENT':
            return {
                ...state,
                places: [...state.places, establishment(undefined, action)]
            }
        case 'ADD_GOING':
        case 'REMOVE_GOING':
            return {
                ...state,
                places: state.places.map(place => establishment(place, action))
            }
        default:
            return state;
    }
}

const establishment = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ESTABLISHMENT':
            return {
                id: action.id,
                data: action.data,
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
                going: state.going.filter(go => go.id !== action.id)
            }
        default:
            return state;
    }
}

const going = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GOING':

            return {
                id: action.id,
                searchDate: action.searchDate,
                peep: action.peep
            }
        default:
            return state;
    }
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