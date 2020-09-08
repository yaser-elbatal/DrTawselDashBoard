import { Get_intro } from "../action/IntroAction";

const initalstate = {
    intro: [],
};
export default (state = initalstate, action) => {

    switch (action.type) {
        case Get_intro:
            return { ...state, intro: action.data };

        default:
            return state;
    }
};
