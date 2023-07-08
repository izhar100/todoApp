import { DARK } from "./actionType"

export const darkMode=(payload)=>(dispatch)=>{
    dispatch({type:DARK,payload:payload})
}