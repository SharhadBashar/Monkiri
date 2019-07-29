//Combines the reducers
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './User';
import languages from './Lang';

export default combineReducers ({
    user: user,
    languages: languages,
    form: formReducer
});