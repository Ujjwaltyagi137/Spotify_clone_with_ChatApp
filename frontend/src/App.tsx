import { Route, Routes } from "react-router-dom"
import Homepage from "./pages/home/Homepage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage"
import MainLayout from "./layout/MainLayout"
import ChatPage from "./pages/chat/ChatPage"
import Albumpage from "./pages/album/Albumpage"
import AdminPage from "./pages/admin/AdminPage"
import {Toaster} from "react-hot-toast"
import NotFoundPage from "./pages/404/NotFoundPage"

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/sso-callback" element= {<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />} />
      <Route path="/auth-callback" element= {<AuthCallBackPage />} />
      <Route path="/admin" element={<AdminPage />} />
    <Route element={<MainLayout />} >
    <Route path="/" element= {<Homepage />} />
    <Route path="/chat" element= {<ChatPage />} />
    <Route path="/albums/:albumId" element= {<Albumpage />} />
    </Route>
    <Route path='*' element={<NotFoundPage />} />
    </Routes>
    <Toaster />
    </>
  )
}

export default App
