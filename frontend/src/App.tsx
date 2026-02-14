import { Navigate, Route, Routes } from "react-router-dom"


function App() {

  return (
    <Routes>
      <Route path="" element={<div>Home</div>} />
      <Route path="/diary" element={<div>Diary</div>} />
      <Route path="/chat" element={<div>Chat</div>} />
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default App
