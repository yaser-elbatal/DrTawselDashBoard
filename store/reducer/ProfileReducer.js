import { profile_data, Update_Profile } from "../action/ProfileAction";

const initial_state = { user: null }
export default (state = initial_state, action) => {
    switch (action.type) {
        case profile_data:
            return { ...state, user: action.data }
        case Update_Profile:
            return { ...state, user: action.data }

        default:
            return state;
    }
}