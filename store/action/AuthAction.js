import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base'
import CONST from '../../consts';
import consts from '../../consts';

export const Sign_In = 'Sign_In';
export const LOGIN_IS_LOADING = 'LOGIN_IS_LOADING';
export const login_success = 'login_success'
export const login_failed = 'login_failed';
export const temp_auth = 'temp_auth'
export const Sign_up = 'Sign_up';
export const Activate_Code = 'Activate_Code'
export const logout = 'logout'

const loginIsLoading = (bool) => {
    return {
        type: LOGIN_IS_LOADING,
        isLoading: bool
    }
};

export const tempAuth = () => {
    return (dispatch) => {
        dispatch({ type: temp_auth });
    };
};

export const SignIn = (phone, password, deviceId, lang, navigation) => {

    return (dispatch) => {

        axios.post(CONST.url + 'sign-in',
            { phone, password, lang, device_id: deviceId, user_type: 4 })
            .then(res => {

                dispatch(loginIsLoading(false));
                handelLogin(dispatch, res.data, navigation)
            })
            .catch(error => console.warn(error));

        dispatch({ type: Sign_In })

    }
}

const handelLogin = (dispatch, data, navigation) => {
    if (!data.success) {
        loginFailed(dispatch, data, navigation)
    } else {
        loginSuccess(dispatch, data, navigation)
    }

    Toast.show({
        text: data.message,
        type: data.success ? "success" : "danger",
        duration: 3000,
        textStyle: {
            color: "white",
            textAlign: 'center'
        }
    });
};



const loginSuccess = (dispatch, data, navigation) => {
    AsyncStorage.setItem('token', JSON.stringify(data.data.token))
        .then(() => dispatch({ type: login_success, data }));
};

const loginFailed = (dispatch, error, navigation) => {
    if (!(error.data.active)) {
        navigation.navigate('AccConfrm', {
            CodeAct: error.data.code,

        });
    }
    dispatch({ type: login_failed, error });
};



export const SignUp = (data, navigation) => {
    return (dispatch) => {
        AsyncStorage.getItem('deviceID').then(deviceId => {
            axios({
                url: consts.url + 'sign-up',

                method: 'POST',
                data: {
                    restaurant_name_ar: data.nameAR,
                    restaurant_name_en: data.nameEN,
                    password: data.password,
                    phone: data.phone,
                    email: data.email,
                    commercial_register: data.CommercialRegister,
                    city_id: data.city,
                    category_id: data.department,
                    lang: data.lang,
                    name: 'yasser',
                    device_id: deviceId,
                    user_type: 4
                }
            }).then(res => {
                dispatch({ type: Sign_up, payload: res.data })
                if (res.data.success) {
                    navigation.navigate('AccConfrm', { token: res.data.data.token })
                }
                console.log('message', res.data.message);

                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'flatMedium',
                        textAlign: 'center'
                    }
                });
            })


        })
    }

}

export const ActivationCode = (code, token, lang) => {
    return dispatch => {
        axios({
            url: consts.url + 'activate',
            method: 'post',
            data: { code },
            headers: {
                Authorization: 'Bearer ' + token,
                lang: lang
            }
        }
        ).then(res => {
            dispatch({ type: Activate_Code, data: res.data })


            Toast.show({
                text: res.data.message,
                type: res.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'flatMedium',
                    textAlign: 'center'
                }
            })
        }
        )


    }

}

export const CheckPhone = (lang, phone, navigation) => {
    return dispatch => {
        axios({
            method: 'post',
            url: consts.url + 'forget-password',
            data: { lang, phone }
        }).then(res => {
            if (res.data.success) {
                navigation.navigate('ForgetPass', { tokennn: res.data.data.token })
            }
            else {
                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'flatMedium',
                        textAlign: 'center'
                    }
                });
            }
        })

    }
}
export const ResendCode = (token, navigation) => {
    return dispatch => {
        axios({
            method: 'GET',
            url: consts.url + 'resend-code',
            headers: {
                Authorization: 'Bearer ' + token,

            }

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('NewPass', { token: token })

            }
            else {
                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'flatMedium',
                        textAlign: 'center'
                    }
                });
            }
        })
    }
}
export const ResetPassword = (password, token, navigation) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: consts.url + 'reset-password',
            data: { password },
            headers: {
                Authorization: 'Bearer ' + token,

            }
        }).then(res => {
            if (res.data.success) {
                navigation.navigate('Login')
            }
            else {
                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'flatMedium',
                        textAlign: 'center'
                    }
                });
            }
        })
    }
}

export const Logout = () => {
    return dispatch => {
        AsyncStorage.multiRemove(['token', 'auth',]);
        dispatch({ type: logout })
    }
}