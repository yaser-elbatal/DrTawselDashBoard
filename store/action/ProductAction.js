import consts from "../../consts";
import { Toast } from "native-base";
import axios from 'axios';

export const Get_Products = 'Get_Products';
export const Add_product = 'Get_Products';
export const Product_Detailes = 'Product_Detailes';
export const Delete_Product = 'Delete_Product';



export const GetProducts = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'provider-products',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Get_Products, data: res.data })
            }


        })
    }
}



export const ProductDetailes = (token, lang, id) => {

    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: `${consts.url}product?id=${id}`,
            data: { id },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {

            dispatch({ type: Product_Detailes, data: res.data })



        })
    }
}

export const DeleteProduct = (token, lang, id) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: `${consts.url}delete-product`,
            data: { lang, id },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(res => {

            if (res.data.success) {

                Toast.show({
                    text: res.data.message,
                    type: res.data.success ? "success" : "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        textAlign: 'center'
                    }
                });
            }



        })
    }

}

export const AddExtraPrdoduc = (token, lang, name_ar, name_en, price) => {

}



export const Add_Products = (token, lang, name_ar, name_en, price, details_ar, details_en, available_kilos, discount, quantity, small_price, mid_price, large_price, menue_id, image, navigation, extras_name_ar, extras_name_en, extras_price,) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}add-product`,
            data: { name_ar, name_en, price, details_ar, details_en, available_kilos, discount, quantity, small_price, mid_price, large_price, menue_id, image, extras_name_ar, extras_name_en, extras_price, },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {

            if (res.data.success) {
                navigation.navigate('SuccessAddition')

                dispatch({ type: Add_product, data: res.data })
            }
            Toast.show({
                text: res.data.message,
                type: res.data.success ? "success" : "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    textAlign: 'center'
                }
            });




        })
    }

}