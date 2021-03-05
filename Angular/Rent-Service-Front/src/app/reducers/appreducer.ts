import {Appstate} from './appstate';
import {LOGIN,HOME,LOGOUT,NOT_HOME} from './appactions';

export function appreducer(state={isLoggedIn:false,ishome:true,token:"GARBAGE"},action):Appstate{
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                isLoggedIn:true
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
        default:
            return state;
    }
}