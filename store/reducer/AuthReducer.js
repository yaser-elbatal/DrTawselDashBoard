import { Sign_In, LOGIN_IS_LOADING, login_success, login_failed, Sign_up, Activate_Code, logout } from "../action/AuthAction";

const initial_State = { user: null, loading: false, message: '', success: false }


export default (state = initial_State, action) => {
    switch (action.type) {
        case Sign_In:
            return { ...state, };
        case LOGIN_IS_LOADING:
            console.log('isloading', action)
            return { ...state, loading: action.isLoading, };
        case login_success:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success }
        case login_failed:
            return { ...state, message: action.error.message, success: action.error.success }
        case Sign_up:
            return { ...state, message: action.payload.message, }
        case Activate_Code:
            return { ...state, user: action.data, message: action.data.message, success: action.data.success }
        case logout:
            return { user: null }
        default:
            return state;
    }


}
