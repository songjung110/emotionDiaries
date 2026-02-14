import { Navigate, Route, Routes } from "react-router-dom"
import StartPage from "./pages/StartPage"
import DiaryPage from "./pages/DiaryPage"
import ChatPage from "./pages/ChatPage"
import MainPage from "./pages/MainPage"


function App() {

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/start" element={<StartPage/ >} />
      <Route path="/diary" element={<DiaryPage/ >} />
      <Route path="/chat" element={<ChatPage/ >} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default App
