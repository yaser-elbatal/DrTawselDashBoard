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



export const tempAuth = () => {
    return (dispatch) => {
        dispatch({ type: temp_auth });
    };
};

export const SignIn = (phone, password, device_id, lang, navigation) => {

    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: CONST.url + 'sign-in',
            data: { phone, password, device_id, lang, user_type: 4 },
            params: { lang }
        })

            .then(res => {
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


};



const loginSuccess = (dispatch, data, navigation) => {
    if (!data.data.active) {
        navigation.navigate('ActivateCode', { token: data.data.token, })

    }
    else {
        AsyncStorage.setItem('token', JSON.stringify(data.data.token))
            .then(() => dispatch({ type: login_success, data }));
    }

};

const loginFailed = (dispatch, error, navigation) => {
    if (!(error.success)) {
        //     navigation.navigate('ActivateCode', {
        //         token: error.data.token,

        //     });
        // }
        dispatch({ type: login_failed, error });

        Toast.show({
            text: error.message,
            type: "danger",
            duration: 3000,
            textStyle: {
                color: "white",
                fontFamily: 'flatMedium',
                textAlign: 'center'
            }
        });

    }
};



export const SignUp = (data, navigation) => {
    return async (dispatch) => {
        await AsyncStorage.getItem('deviceID').then(deviceId => {
            console.log(deviceId)
            axios({
                url: consts.url + 'sign-up',

                method: 'POST',
                data: {
                    name: data.name,
                    restaurant_name_ar: data.nameAR,
                    restaurant_name_en: data.nameEN,
                    password: data.password,
                    phone: data.phone,
                    email: data.email,
                    commercial_register: data.CommercialRegister,
                    city_id: data.city,
                    category_id: data.department,
                    is_owner: data.isowner,
                    num_of_branches: data.BranchNum,
                    address: data.MyLocation,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    website_url: data.WebUrl,
                    authorization_commercial: data.selecCommerical,
                    available_delivery: data.SelectDelivery,
                    device_id: deviceId,
                    user_type: 4,

                }
                , params: {
                    lang: data.lang,
                }
            }).then(res => {
                console.log('toooooooken' + res.data.data.token);
                dispatch({ type: Sign_up, payload: res.data })
                if (res.data.success) {
                    navigation.navigate('ActivateCode', { token: res.data.data.token })
                }

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

export const ActivationCode = (code, token, lang, navigation) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: consts.url + 'activate',
            data: { code },
            params: { lang },
            headers: {
                Authorization: 'Bearer ' + token,

            }

        }
        ).then(res => {
            if (res.data.success) {
                dispatch({ type: Activate_Code, data: res.data })

            }
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
    return async dispatch => {
        await axios({
            method: 'post',
            url: consts.url + 'forget-password',
            data: { lang, phone }
        }).then(res => {
            if (res.data.success) {
                navigation.navigate('AccConfrm', { token: res.data.data.token })
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

export const ResendCode = (token, navigation, lang) => {
    return async dispatch => {
        await axios({
            method: 'GET',
            url: consts.url + 'resend-code',
            headers: {
                Authorization: 'Bearer ' + token,
                lang, lang
            }

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('NewPass', { token: token })

            }
            else
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
    }
}

export const ResetPassword = (password, token, navigation) => {
    return async dispatch => {
        await axios({
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

export const Logout = (token) => {
    return dispatch => {
        axios({
            method: 'GET',
            url: consts.url + 'logout',
            headers: {
                Authorization: 'Bearer ' + token,

            }
        }).then(res => {
            dispatch({ type: logout })


        })
    }
}

