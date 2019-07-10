import status from './status';  //statusReducer
import sort from './sort'; //sortReducer
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    status,
    sort
});

export default myReducer;