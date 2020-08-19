import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';


export default multiReducres = combineReducers({
    lang,
    auth
});