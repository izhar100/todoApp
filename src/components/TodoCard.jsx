import { Box, Flex, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { FiEdit } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { clearCompleted, completesTodo } from '../redux/todoReducer/action';
const TodoCard = () => {
    const isDark = useSelector((store) => store.modeReducer.isDark)
    const todos = useSelector((store) => store.todoReducer.todos)
    const [todo,setTodo]=useState([])
    const [index, setIndex] = useState(null)
    const [id,setId]=useState(null)
    const [name,setName]=useState("")
    const [flag,setFlag]=useState(false)
    const dispatch=useDispatch()
    useEffect(() => {
        setTodo(todos)
    }, [todos,flag])
    const handleMouseOver = (id) => {
        console.log(id)
        setIndex(id)
    }
    const handleMouseOut = () => {
        setIndex(null)
    }
    const handleComplete=(e,id)=>{
        console.log(e.target.checked,"index:",id)
        let completedTodo=todo.map((el)=>{
            if(el.id==id){
                el.isCompleted=e.target.checked
            }
            return el;
        })
        dispatch(completesTodo(completedTodo))

    }
    const handleActive=()=>{
        let activeTodos=todos.filter((el)=>el.isCompleted==false)
        setTodo(activeTodos)
        setFlag(false)
    }
    const showCompleted=()=>{
        let completedata=todos.filter((el)=>el.isCompleted==true)
        if(completedata.length==0){
            setFlag(true)
        }
        setTodo(completedata)
    }
    const handleDelete=(id)=>{
        let remainingData=todos.filter((el)=>el.id!==id)
        dispatch(clearCompleted(remainingData))
        setFlag(false)
        
    }
    const handleClearCompleted=()=>{
        let notcompletedata=todos.filter((el)=>el.isCompleted==false)
        dispatch(clearCompleted(notcompletedata))
        setFlag(false)
    }
    const handleEdit=(id)=>{
        let editTodo=todo.find((el)=>el.id==id)
        setName(editTodo.title)
        setId(id)
        setFlag(false)
    }
    const handleKey=(e)=>{
        if(e.key=="Enter"){
            let alltodo=todo.map((el)=>{
                if(el.id==id){
                    el.title=name;
                }
                return el;
            })
            dispatch(clearCompleted(alltodo))
            setId(null)
        }
        setFlag(false)
    }
    if(todo.length==0){
        return (
            <Text bgColor={isDark?"#000000":"#ffffff"} p={"10px"} borderRadius={"5px"} textColor={isDark?"white":"black"} textAlign={"center"}>Nothing to show Please add some todo...</Text>
        )
    }
    return (
        <>
            <Box borderBottomRadius={"20px"}>
                <Box display={id?"block":"none"}>
                <Input textColor={isDark?"white":"black"} value={name} onChange={(e)=>setName(e.target.value)} bgColor={isDark?"#000000":"#ffffff"} onKeyDown={handleKey}/>
                <br />
                <br />
                </Box>
                {
                    flag?
                    <>
                    <Text bgColor={isDark?"#000000":"#ffffff"} p={"10px"} borderRadius={"5px"} textColor={isDark?"white":"black"} textAlign={"center"}>No any todo completed yet...</Text>
                    <br />
                    </>
                    :
                    todo?.map((el, ind) => {
                        return (
                            <>
                            <Flex key={el.id} onMouseOver={() => handleMouseOver(el.id)} onMouseOut={handleMouseOut} alignItems={"center"} justifyContent={"space-between"} padding={"10px"} bgColor={isDark?"#000000":"#ffffff"} textColor={isDark?"white":"black"}>
                                <Checkbox defaultChecked={el.isCompleted==true} onChange={(e)=>handleComplete(e,el.id)} textDecoration={el.isCompleted==true?"line-through":"none"} textColor={el.isCompleted==true?"#bbbbbb":isDark?"white":"black"} >{el.title}</Checkbox>
                                {index === el.id && el.isCompleted==false ?
                                    <Flex _hover={{cursor:"pointer"}} alignItems={"center"} gap={"10px"}>
                                        <FiEdit size={"18px"} onClick={()=>handleEdit(el.id)} />
                                        <MdClear size={"25px"} onClick={()=>handleDelete(el.id)}/>
                                    </Flex> : index === el.id && el.isCompleted==true?<MdClear size={"25px"} onClick={()=>handleDelete(el.id)}/>:""}
                            </Flex>
                            <hr />
                        </>)
                    })
                }
                <Flex bgColor={isDark?"#000000":"#ffffff"} borderBottomRadius={"10px"} p={{xl:"10px",lg:"10px",md:"10px",sm:"5px",base:"5px"}} fontSize={{xl:"16px",lg:"16px",md:"16px",sm:"12px",base:"12px"}} color={"#989898"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text>{todo?.length} items left</Text>
                    <Flex gap={{xl:"10px",lg:"10px",md:"10px",sm:"5px",base:"5px"}}>
                    <Text _hover={{cursor:"pointer"}} onClick={()=>{
                        setTodo(todos)
                        setFlag(false)
                        }}>All</Text>
                    <Text _hover={{cursor:"pointer"}} onClick={handleActive}>Active</Text>
                    <Text _hover={{cursor:"pointer"}} onClick={showCompleted}>Completed</Text>
                    </Flex>
                    <Text _hover={{cursor:"pointer"}} onClick={handleClearCompleted}>Clear Completed</Text>
                </Flex>
            </Box>
        </>
    )
}

export default TodoCard
