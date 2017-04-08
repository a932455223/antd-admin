import {UPDATE_NAVPATH} from '../actionTypes/navPath'
export default function updateNavPath(items) {
  return {type: UPDATE_NAVPATH, payload: items};
}
