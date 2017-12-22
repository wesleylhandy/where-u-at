export default class StateLoader {

  loadState() {
    try {
      let serializedState = localStorage.getItem("where-u-at:state");

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    }
    catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("where-u-at:state", serializedState);

    }
    catch (err) {
      console.error({localStorateError: err});
    }
  }

  initializeState() {
    return defaultState;
  }
}


const defaultState = {
  auth: {
    userId: '',
    isAuth: false
  },
  search: {
    current_search: '',
    geolocated: false,
  },
  establishments: []
}