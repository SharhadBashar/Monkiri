import axios from 'axios';
import {AUTH_USER, AUTH_ERROR} from './types';

//action is sent to our middleware
//middleware sends it to our reducers
//reducers produce our new state, which flows back to our components
//facilated by the dispatch function
//dispatch functions funnels the action through our middleware to our reducers

//formProps = {email: email, password: password}
export const signUp = (formProps, callback) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:3090/signUp', formProps);
        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        });
        localStorage.setItem('token', response.data.token)
        callback();
    }
    catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error.response.data.error
        })
    }
}

export const signIn = (formProps, callback) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:3090/signIn', formProps);
        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        });
        localStorage.setItem('token', response.data.token)
        callback();
    }
    catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: "Wrong credentials"
        })
    }
}

export const signOut = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    };
}
