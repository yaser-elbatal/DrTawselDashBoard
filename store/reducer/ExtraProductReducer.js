import { Get_Extra_Product, Add_Extra_Product, Edit_Extra_Product, Delete_Extra_Product } from "../action/ExtraProductAction";

const initialstate = {
    ExtraProduct: [
        { id: '', ProductnameExtraAR: '', ProductnameExtraEn: " ", priceProductExtra: '' },
    ]
};

export default (state = initialstate, action) => {
    switch (action.type) {
        case Get_Extra_Product:
            return { ...state, ExtraProduct: [...state.ExtraProduct] };
        case Add_Extra_Product:
            return {
                ...state,
                ExtraProduct: state.ExtraProduct.concat(action.payload)
            };
        case Edit_Extra_Product:
            return {
                ...state,
                ExtraProduct: state.ExtraProduct.map(
                    (content, i) => content.id === action.payload.id ? { ...content, ProductnameExtraAR: action.payload.ProductnameExtraAR, ProductnameExtraEn: action.payload.ProductnameExtraEn, priceProductExtra: action.payload.priceProductExtra }
                        : content)
            };
        case Delete_Extra_Product:
            return {
                ...state,
                ExtraProduct: state.ExtraProduct.filter(item => item.id !== action.payload)
            };
        default:
            return state;
    }
};

