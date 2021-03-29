import {Appstate} from './appstate';
import {LOGIN,HOME,LOGOUT,NOT_HOME, ADD_TO_CART} from './appactions';

// Try not to navigate in Reducers or the place where Reducers are Subscribed
export function appreducer(state={isLoggedIn:false,ishome:true,token:"GARBAGE",cart:0},action):Appstate{
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                isLoggedIn:true,
                token:action.payload.token
            }
        case LOGOUT:
            return{
                ...state,
                isLoggedIn:false,
                token:"GARBAGE"
            }
        case HOME:{
            return{
                ...state,
                ishome:true
            }
        }
        case NOT_HOME:{
            return {
                ...state,
                ishome:false
            }
        }
        case ADD_TO_CART:{
            return {
                ...state,
                cart:action.payload.cart
            }
        }
        default:
            return state;
    }
}