import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export const Signin = () => {
    const [username,setUsername] = useState("");
    const [password,setPassw] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-950 h-screen">
        <div className="flex justify-center pt-10">
            <div className="bg-emerald-50 w-96 p-9 rounded-4xl">
            <div className="font-semibold text-4xl pb-2 flex justify-center">Sign In</div>
            <div className="pb-4 flex justify-center font-light">Enter your credentials to login</div>
            <div className="font-mono">Email</div>
            <div className="pb-3"><input placeholder="youremail@gmail.com" className="border w-full rounded-sm p-1" onChange={e => {setUsername(e.target.value)}}></input></div>
            <div className="font-mono">Password</div>
            <div className="pb-6"><input placeholder="123456" className="border w-full rounded-sm p-1" onChange={e => {setPassw(e.target.value)}}></input></div>
            <button className="text-white bg-black rounded-2xl w-full p-2 cursor-pointer" onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin",{username, password})
                localStorage.setItem("token",response.data.token)
            }}>Sign In</button>
            <div className="flex justify-center pt-4">New User?<a className="underline cursor-pointer" onClick={() => {navigate("/signup")}}>Sign up</a></div>
        </div>
        </div>
    </div>
}