import consts from "../../consts";
import { Toast } from "native-base";
import axios from 'axios';

export const Get_Products = 'Get_Products';
export const Add_product = 'Get_Products';
export const Product_Detailes = 'Product_Detailes';
export const Delete_Product = 'Delete_Product';
export const Edit_Product = 'Edit_Product';
export const Addextra_Products = 'Addextra_Products';
export const Get_Product_extra = 'Get_Product_extra';

export const Delete_Extra_Products = 'Delete_Extra_Products'


export const GetProducts = (token, lang) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: consts.url + 'provider-products',
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => dispatch({ type: Get_Products, data: res.data })



        )
    }
}



export const ProductDetailes = (token, lang, id) => {
    return async (dispatch) => {
        await axios({
            method: 'GET',
            url: `${consts.url}product?id=${id}`,
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            console.log('ddd' + res.data);
            dispatch({ type: Product_Detailes, data: res.data })
        }).catch(err => console.warn(err))

    }
}

export const DeleteProduct = (token, lang, id) => {
    return async (dispatch) => {
        await axios({
            method: 'DELETE',
            url: `${consts.url}delete-product`,
            data: { id },
            params: { lang },
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






export const EditProducts = (token, lang, id, name_ar, name_en, price, available, details_ar, details_en, available_kilos, discount, quantity, menue_id, small_price, mid_price, large_price, image, ExtraProduct, navigation) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}update-product`,
            data: { id, name_ar, name_en, price, available, details_ar, details_en, available_kilos, discount, quantity, menue_id, small_price, mid_price, large_price, image, extras: ExtraProduct },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }
        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Edit_Product, data: res.data })
                navigation.navigate('Products')
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


        }).catch(err => console.warn(err))

    }
}

export const Add_Products = (token, lang, name_ar, name_en, price, details_ar, details_en, available, available_kilos, discount, quantity, small_price, mid_price, large_price, menue_id, image, navigation, extras,) => {
    return async (dispatch) => {
        await axios({
            method: 'POST',
            url: `${consts.url}add-product`,
            data: { name_ar, name_en, price, details_ar, details_en, available, available_kilos, discount, quantity, small_price, mid_price, large_price, menue_id, image, extras, },
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

export const GetProductExtrasFromEdit = (id, token, lang) => {


    return async dispatch => {
        await axios({
            method: 'GET',
            url: `${consts.url}product-extras?id=${id}`,
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {

            dispatch({ type: Get_Product_extra, data: res.data })



        })
    }
}





export const DeleteProductExtrasFromEdit = (id, token,) => {
    return async dispatch => {
        await axios({
            method: 'DELETE',
            url: `${consts.url}delete-product-extra`,
            data: { id },
            headers: { Authorization: 'Bearer ' + token, },

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Delete_Extra_Products, data: res.data })

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

export const AddExtraProductsFromEdit = (name_ar, name_en, price, product_id, token, lang) => {
    return async dispatch => {
        await axios({
            method: 'POST',
            url: `${consts.url}add-product-extra`,
            data: { name_ar, name_en, price, product_id },
            headers: { Authorization: 'Bearer ' + token, },
            params: { lang }

        }).then(res => {
            if (res.data.success) {
                dispatch({ type: Addextra_Products, data: res.data })

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