import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import StartPage from "./pages/StartPage"
import DiaryPage from "./pages/DiaryPage"
import ChatPage from "./pages/ChatPage"
import MainPage from "./pages/MainPage"
import Layout from "./pages/Layout"
import { useCookies } from "react-cookie"
import UserContext from "./context/UserContext"
import { useEffect } from "react"


function App() {
  const [cookies, setCookies]  = useCookies(['username']);
  const navigate = useNavigate();

  const setUsername = (username: String) => {
    setCookies('username', username);

  }

  useEffect(()=>{
    if(!cookies.username) {
      navigate('/start')
    }
  }, [cookies.username, navigate])

  return (
    <UserContext.Provider value={{
      username: cookies.username,
      setUsername
    }}>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<MainPage />} />
          <Route path="/start" element={<StartPage/ >} />
          <Route path="/diary" element={<DiaryPage/ >} />
          <Route path="/chat" element={<ChatPage/ >} />
        </Route>
        <Route path="*" element={<Navigate to={'/'} />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
