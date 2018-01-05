const date = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_DATE':
            return {
                ...state,
                currentDate: action.date
            }
        default:
            return state;
    }
}

export default date;