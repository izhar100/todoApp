import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react'
import React,{useEffect,useState} from 'react'
import { BsFillMoonFill,BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { darkMode } from '../redux/modeReducer/action';
import { addTodo } from '../redux/todoReducer/action';
import TodoCard from './TodoCard';
const Todo = () => {
    const isDark=useSelector((store)=>store.modeReducer.isDark)
    const todos=useSelector((store)=>store.todoReducer.todos)
    const [todo,setTodo]=useState("")
    const dispatch=useDispatch()
    
    useEffect(()=>{
      console.log(todos)
    },[todos])

    const handleDarkMode=()=>{
      dispatch(darkMode(!isDark))
    }
    const handleKey=(e)=>{
        if(e.key=="Enter"){
            let task={
                id:`${Date.now()+Math.random()}`,
                title:todo,
                isCompleted:false
            }
            dispatch(addTodo(task))
            setTodo("")
        }
    }
  return (
    <>
      <Box>
         <Flex justifyContent={"space-between"} alignItems={"center"} w={{xl:"50%",lg:"50%",md:"60%",sm:"100%",base:"100%"}} m={"auto"}>
            <Heading>TODO</Heading>
            {isDark?<BsFillSunFill size={"20px"} onClick={handleDarkMode}/>:<BsFillMoonFill size={"20px"} onClick={handleDarkMode}/>}
         </Flex>
         <br />
         <Box w={{xl:"50%",lg:"50%",md:"60%",sm:"100%",base:"100%"}} m={"auto"}>
          <Input placeholder="Create new todo..." value={todo} onChange={(e)=>setTodo(e.target.value)} onKeyDown={handleKey} bgColor={isDark?"#000000":"#ffffff"}/>
         </Box>
         <br />
         <br />
         <Box w={{xl:"50%",lg:"50%",md:"60%",sm:"100%",base:"100%"}} m={"auto"}>
           <TodoCard/>
         </Box>
      </Box>
    </>
  )
}

export default Todo
