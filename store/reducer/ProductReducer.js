
import { Get_Products, Add_product, Product_Detailes, Get_sizes } from "../action/ProductAction";

const initialState = { products: [], product: [], size: [] }
export default (state = initialState, action) => {
    switch (action.type) {
        case Get_Products:
            return { ...state, products: action.data.data }

        case Product_Detailes:
            return { ...state, product: action.data }
        case Add_product:
            return { ...state, products: action.data.data }

        default:
            return state;
    }
}