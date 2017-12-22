 import { combineReducers } from 'redux';

 import establishments from './establishments';
 import search from './search';
 import auth from './auth';


 const rootReducer = combineReducers({ auth, search, establishments });

 export default rootReducer;