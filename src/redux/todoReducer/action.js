import { ADD_TODO, CLEAR_COMPLETED, COMPLETE_TODO } from "./actionType"

export const addTodo=(todo)=>(dispatch)=>{
    dispatch({type:ADD_TODO,payload:todo})
}
export const completesTodo=(todo)=>(dispatch)=>{
    dispatch({type:COMPLETE_TODO,payload:todo})
}
export const clearCompleted=(payload)=>(dispatch)=>{
    dispatch({type:CLEAR_COMPLETED,payload:payload})
}