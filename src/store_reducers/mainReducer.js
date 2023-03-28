import { combineReducers } from "redux";
import {variables} from '../variables/variables';


function appReducer(state = variables, action){
    switch (action.type){
        case 'active_page': {
            return {
                ...state,
                active_page: action.payload
            }
        }
        case 'change_state': {
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        }
        default:
        return state
    }
}


export const rootReducer = combineReducers({
    app: appReducer,
});