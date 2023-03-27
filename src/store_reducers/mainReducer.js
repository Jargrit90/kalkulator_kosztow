import { combineReducers } from "redux";
import {variables} from '../variables/variables';


function appReducer(state = variables, action){
    switch (action.type){
        case 'add_task': {
            return {
                ...state,
                tasks_array: action.payload
            }
        }
        default:
        return state
    }
}


export const rootReducer = combineReducers({
    app: appReducer,
});