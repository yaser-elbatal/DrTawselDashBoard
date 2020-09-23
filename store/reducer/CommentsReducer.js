import { Get_Ratings, Get_Wallet, Get_MyBankes } from '../action/CommentsAction';

const initialState = { comments: {}, wallet: {}, extra: {}, Banks: [], }

export default (state = initialState, action) => {
    switch (action.type) {

        case Get_Ratings:
            return { comments: action.data, extra: action.data.extra }

        case Get_Wallet:
            return { wallet: action.data }

        case Get_MyBankes:
            return { Banks: action.data.data }

        default:
            return state;
    }
}