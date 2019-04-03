import {AUTH_USER, AUTH_ERROR} from '../Actions/types';

const INITIAL_STATE = {
    auth: '',
    error: ''
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return {...state, auth: action.payload}
        case AUTH_ERROR:
            return{...state, error: action.payload}
        default: 
            return state;
    }
}