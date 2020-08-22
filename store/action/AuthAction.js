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

        dispatch(loginIsLoading(true));
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
        useNativeDriver: true,
        type: data.success ? "success" : "danger",
        duration: 3000,
        textStyle: {
            color: "white",
            textAlign: 'center'
        }
    });
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
                console.log('res.data' + res.data);
                dispatch({ type: Sign_up, payload: res.data })
            })
        })
    }

}


const loginSuccess = (dispatch, data, navigation) => {
    AsyncStorage.setItem('token', JSON.stringify(data.data.token))
        .then(() => dispatch({ type: login_success, data }));
};

const loginFailed = (dispatch, error, navigation) => {

    if (error.data.code) {
        navigation.navigate('AccConfrm', {
            code: error.data.code,
            userId: error.data.user_id,
        });
    }
    dispatch({ type: login_failed, error });
};
