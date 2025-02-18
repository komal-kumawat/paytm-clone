import Button from "../components/Button"
import InputBox from "../components/InputBox"
import Heading from "../components/Heading"
import SubHeading from "../components/SubHeading"
import BottomWarning from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Signin(){
  const [username, setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4" >
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
          setUsername(e.target.value);
        }} placeholder="harkirat@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
          setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div>
          <Button label={"Sign in"} onClick={async () => {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token)
      navigate("/dashboard")
    }} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}