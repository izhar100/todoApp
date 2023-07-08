import { useState, useEffect } from 'react'
import Todo from './components/Todo'
import { useSelector } from 'react-redux'
import { Box } from '@chakra-ui/react'

function App() {
  const isDark = useSelector((store) => store.modeReducer.isDark)
  useEffect(() => {
    console.log(isDark)
  }, [isDark])

  return (
    <>
      <Box bgColor={isDark?"#322f40":"#d2e5ff"} p={{xl:"50px",lg:"50px",md:"50px",sm:"20px",base:"20px"}} h={"100vh"} textColor={isDark?"white":"black"}>
        <Todo />
      </Box>
    </>
  )
}

export default App
