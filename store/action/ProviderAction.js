import axios from 'axios';
import consts from '../../consts';
import { Update_Profile } from './ProfileAction';
import { Toast } from "native-base";


export const Update_provider = 'Update_provider'



export const EditProvider = (token, lang, restaurant_name_ar, restaurant_name_en, latitude, longitude, preparing_time_from, preparing_time_to, cover, available, navigation) => {
    return dispatch => {
        axios({
            method: 'POST',
            url: consts.url + 'update-provider',
            headers: { Authorization: 'Bearer ' + token, },
            data: { lang, restaurant_name_ar, restaurant_name_en, latitude, longitude, preparing_time_from, preparing_time_to, cover, available }

        }).then(res => {
            if (res.data.success) {
                navigation.navigate('HomePage')
                dispatch({ type: Update_Profile, data: res.data })
            }
            Toast.show({
                text: res.data.message,
                type: res.data.success ? "success" : "danger",
                duration: 9000,
                textStyle: {
                    color: "white",
                    textAlign: 'center'
                }
            });
        })
    }

}