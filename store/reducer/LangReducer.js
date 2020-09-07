import { chooseLang } from "../action/LangAction";
import { getLocale } from "../../locale/i18n";

const initalstate = {
    language: getLocale(),
};
export default (state = initalstate, action) => {
    console.log(state.language);

    switch (action.type) {
        case chooseLang:
            return { ...state, language: action.lang };

        default:
            return state;
    }
};

