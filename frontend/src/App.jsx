import { BrowserRouter , Routes,Route } from "react-router-dom";
import Signup from "./pages/Signup";
import  Signin  from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import "./index.css"
export default function App(){
  return (
    <>
    <div>hii there</div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/send" element={<SendMoney/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}