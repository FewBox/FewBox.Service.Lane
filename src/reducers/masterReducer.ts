import ActionTypes from '../actions/ActionTypes';
import { MasterPage } from './State';

const master = { isLockWindowVisible: false };
export default (state: MasterPage = master, action: any): MasterPage => {
    switch (action.type) {
        case ActionTypes.SHOW_LOCKWINDOW:
            return { ...state, isLockWindowVisible: true };
        case ActionTypes.HIDE_LOCKWINDOW:
            return { ...state, isLockWindowVisible: false };
        case ActionTypes.REDIRECT:
            return { ...state, path: action.value };
        case ActionTypes.CLEAR_PATH:
            return { ...state, path: undefined };
        default:
            return state;
    }
}