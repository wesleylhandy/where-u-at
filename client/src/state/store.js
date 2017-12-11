import { createStore } from 'redux';
import { search } from './reducers';

export const store = createStore(search);