
import consts from '../../consts';
import axios from 'axios';
import { Toast } from "native-base";

export const profile_data = 'profile_data'
export const Update_Profile = 'Update_Profile'

export const GetProfile = (token) => {
    return dispatch => {
        axios({
            url: consts.url + 'profile',
            method: 'GET',
            headers: { Authorization: 'Bearer ' + token, },

        }).then(response => {
            const data = response.data;
            dispatch({ type: profile_data, data })
        })
    }
}


export const UpdateProfile = (token, lang, name, phone, email, cityId, avatar, navigation) => {
    return dispatch => {
        axios({
            url: consts.url + 'edit-profile',
            method: 'POST',
            data: { lang, name, phone, email, cityId, avatar },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('MyProfile')
                dispatch({ type: Update_Profile, data: res.data })

            }
        }
        )

        Toast.show({
            text: res.data.message,
            type: res.data.success ? "success" : "danger",
            duration: 3000,
            textStyle: {
                color: "white",
                fontFamily: 'cairo',
                textAlign: 'center'
            }
        });
    }
}