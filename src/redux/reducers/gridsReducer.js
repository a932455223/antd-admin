import {GRID_BE_EDITED,GRID_NOT_BE_EDITED} from '../actions/gridsAction'
let initialState = {
  beEdited:false
}
export default function(state = initialState,action){
  switch (action.type){
    case GRID_BE_EDITED:
      return {
        beEdited:true
      }
    case GRID_NOT_BE_EDITED:
      return {
        beEdited:false
      }
    default:
      return state
  }
}
