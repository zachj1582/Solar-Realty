const initialState = {
    cart: []
}

const SET_CART = 'SET_CART';

export const setCart=(cart)=>{
    return {
        type: SET_CART,
        payload: cart
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case SET_CART:
            return {...state, cart: payload}
        default:
            return state;
    }
}