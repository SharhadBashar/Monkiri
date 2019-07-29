//Language reducer. Stores the all languages
import {GET_LANG} from '../Actions/types';

const INITIAL_STATE = {
    languages: []
}

export default function (state = INITIAL_STATE, action) {
    var payload = action.payload;
    switch (action.type) {
        case GET_LANG:
            return { 
                languages: payload
            }
        default: 
            return state;
    }
}