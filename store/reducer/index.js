import { combineReducers } from 'redux';

import lang from './LangReducer';
import auth from './AuthReducer';
import cities from './CitiesReducer';
import profile from './ProfileReducer';
import provider from './ProviderReducer';
import menue from './MenueReducer';
import product from './ProductReducer';
import size from './SizesReducer';
import intro from './IntroReducer';
import ExtraProduct from './ExtraProductReducer';
import home from './HomeReducer';
import Banner from './OffersReducer';
import Orders from './OrdersReducer';


export default multiReducres = combineReducers({
    lang,
    auth,
    cities,
    profile,
    provider,
    menue,
    product,
    size,
    intro,
    ExtraProduct,
    home,
    Banner,
    Orders
});