import { Get_RePorts, Get_Extra_Reborts } from "../action/HomeAction";

const initialState = { reports: {}, product: [] }
export default (state = initialState, action) => {
    switch (action.type) {
        case Get_RePorts:
            return { ...state, reports: action.data }
        case Get_Extra_Reborts:
            return { ...state, product: action.data }
        default:
            return state;
    }
}