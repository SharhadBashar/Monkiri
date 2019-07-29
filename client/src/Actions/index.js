//The actions and their respective payloads
import axios from 'axios';
import {AUTH_USER, AUTH_ERROR, SAVE_USER, GET_LANG} from './types';

//action is sent to our middleware
//middleware sends it to our reducers
//reducers produce our new state, which flows back to our components
//facilated by the dispatch function
//dispatch functions funnels the action through our middleware to our reducers

//formProps = {username: username, password: password}
//Action for signing up
export const signUp = (formProps, callback) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/signUp', formProps);
        dispatch({
            type: AUTH_USER,
            payload: response.data
        });
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('token', response.data.token);
        callback();
    }
    catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.error
        })
    }
}

//Action for Signing in
export const signIn = (formProps, callback) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/signIn', formProps);
        dispatch({
            type: AUTH_USER,
            payload: response.data
        });
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('language', response.data.language);
        localStorage.setItem('token', response.data.token);
        callback();
    }
    catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Wrong credentials'
        })
    }
}

//Action for getting all languages
export const getAll = () => async(dispatch) => {
    try {
        const response = await axios.get('http://localhost:8000/getLang');
        dispatch({
            type: GET_LANG,
            payload: response.data
        })
    }
    catch (error) {
        dispatch({
            type: GET_LANG,
            payload: 'Wrong languages'
        })
    }
}

//Action for Saving user
export const save = (username, language, callback) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/save', {username: username, language: language});
        dispatch({
            type: SAVE_USER,
            payload: response.data
        })
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('language', response.data.language);
        localStorage.setItem('token', response.data.token);
        callback();
    }
    catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Wrong credentials'
        })
    }
}

//Action for Signing out
export const signOut = () => {
    localStorage.clear();
    return {
        type: AUTH_USER,
        payload: ''
    };
}
