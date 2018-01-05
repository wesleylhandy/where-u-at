 import { combineReducers } from 'redux';

 import establishments from './establishments';
 import search from './search';
 import auth from './auth';
 import date from './date';


 const rootReducer = combineReducers({ auth, search, establishments, date });

 export default rootReducer;