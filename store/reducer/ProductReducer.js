
import { Get_Products, Add_product, Product_Detailes, Edit_Product, Addextra_Products, Get_Product_extra, Delete_Extra_Products } from "../action/ProductAction";

const initialState = { products: [], product: [], size: [], ExtraProduct: [], loader: false }
export default (state = initialState, action) => {
    switch (action.type) {
        case Get_Products:
            return { ...state, products: action.data.data }

        case Product_Detailes:
            return { ...state, product: action.data }
        case Add_product:
            return { ...state, products: action.data.data }
        case Edit_Product:
            return { ...state, products: action.data.data, loader: action.data.success }
        case Get_Product_extra:
            return { ...state, ExtraProduct: action.data }
        case Addextra_Products:
            return { ...state, ExtraProduct: action.data, }
        case Delete_Extra_Products:
            return { ...state, product: action.data }
        default:
            return state;
    }
}