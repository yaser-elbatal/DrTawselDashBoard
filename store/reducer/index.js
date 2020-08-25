import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import cities from './CitiesReducer';



export default multiReducres = combineReducers({
    lang,
    auth,
    cities
});