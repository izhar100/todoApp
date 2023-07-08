import { DARK } from "./actionType"

const initState={
    isDark:false
}
export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case DARK:{
            return {
                ...state,isDark:payload
            }
        }
        default:{
            return state
        }
    }
}