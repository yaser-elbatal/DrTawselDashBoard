import consts from "../../consts";
import axios from 'axios';
import { Toast } from "native-base";



export const Get_OrderS = 'Get_OrderS';
export const Get_Order_Detailes = 'Get_Order_Detailes'

export const GetOrders = (token, status, lang) => {
    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: consts.url + 'provider-orders',
            data: { status },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_OrderS, data: res.data })

        })


    }
}



export const Order_Detailes = (token, id, lang) => {
    return async (dispatch) => {

        await axios({
            method: 'POST',
            url: consts.url + 'provider-orders-details',
            data: { id },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            dispatch({ type: Get_Order_Detailes, data: res.data })

        })


    }
}