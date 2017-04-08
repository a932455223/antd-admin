import {UPDATE_NAVPATH} from '../actionTypes/navPath'
export default function navPath(state = [],action={}){
    switch(action.type){
        case UPDATE_NAVPATH:
            return action.payload
        default:
            return state
    }
}
