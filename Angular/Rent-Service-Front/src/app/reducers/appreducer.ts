import {Appstate} from './appstate';
import {LOGIN,HOME,LOGOUT,NOT_HOME, ADD_TO_CART} from './appactions';

// Try not to navigate in Reducers or the place where Reducers are Subscribed
export function appreducer(state=getState(),action):Appstate{
    switch(action.type){
        case LOGIN:{
            const st={
                ...state,
                isLoggedIn:true,
                token:action.payload.token
            }
            return st;
        }
        case LOGOUT:{
            const st={
                ...state,
                isLoggedIn:false,
                token:"GARBAGE"
            }
            clearState();
            return st;
        }
        case HOME:{
            const st={
                ...state,
                ishome:true
            }
            setState(st);
            return st;
        }
        case NOT_HOME:{
            const st={
                ...state,
                ishome:false
            }
            setState(st);
            return st;
        }
        case ADD_TO_CART:{
            const st={
                ...state,
                cart:action.payload.cart
            }
            setState(st);
            return st;
        }
        default:
            return state;
    }
}
function getState():Appstate{
    if(localStorage.getItem('state')!=null){
        return JSON.parse(localStorage.getItem('state'));
    }else{
        return {isLoggedIn:false,ishome:true,token:"GARBAGE",cart:0}
    }
}
function setState(st):void{
    localStorage.setItem('state',JSON.stringify(st));
}
function clearState():void{
    localStorage.clear();
}