import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_TODO } from "./actionType"

const initState={
    todos:[]
}
export const reducer=(state=initState,{type,payload})=>{
    switch(type){
        case ADD_TODO:{
            return {
                ...state,todos:[...state.todos,payload]
            }
        }
        case COMPLETE_TODO:{
            return {
                ...state,todos:payload
            }
        }
        case CLEAR_COMPLETED:{
            return {
                ...state,todos:payload
            }
        }
        default:{
            return state
        }
    }
}