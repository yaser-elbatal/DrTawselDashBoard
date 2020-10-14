
import { Get_Products, Add_product, Product_Detailes, Edit_Product, Addextra_Products, Get_Product_extra, Delete_Extra_Products, Search_Product } from "../action/ProductAction";

const initialState = { products: null, product: null, size: [], ExtraProduct: null, loader: false, EditProduct: [] }
export default (state = initialState, action) => {
    switch (action.type) {
        case Get_Products:
            return { ...state, products: action.data.data }

        case Product_Detailes:
            return { product: action.data.data, EditProduct: action.data.data }
        case Add_product:
            return { ...state, products: action.data.data }
        case Edit_Product:
            return { ...state, products: action.data.data, loader: action.data.success }
        case Get_Product_extra:
            return { ...state, ExtraProduct: action.data.data }
        case Addextra_Products:
            return { ...state, ExtraProduct: action.data.data }
        case Delete_Extra_Products:
            return { ...state, product: action.data.data }

        case Search_Product:
            return { products: action.data.data }
        default:
            return state;
    }
}