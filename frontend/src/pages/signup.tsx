import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {
    const [firstname,setFname] = useState("");
    const [lastname,setLname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassw] = useState("");
    const navigate = useNavigate()
    return <div className="bg-slate-950 h-screen">
        <div className="flex justify-center pt-10">
            <div className="bg-emerald-50 w-96 p-9 rounded-4xl">
            <div className="font-semibold text-4xl pb-2 flex justify-center">Sign Up</div>
            <div className="pb-4 flex justify-center font-light">Enter your information to create an account</div>
            <div className="font-mono">First Name</div>
            <div className="pb-3"><input placeholder="John" className="border w-full rounded-sm p-1" onChange={e => {setFname(e.target.value)}}></input></div>
            <div className="font-mono">Last Name</div>
            <div className="pb-3"><input placeholder="Doe" className="border w-full rounded-sm p-1" onChange={e => {setLname(e.target.value)}}></input></div>
            <div className="font-mono">Email</div>
            <div className="pb-3"><input placeholder="youremail@gmail.com" className="border w-full rounded-sm p-1" onChange={e => {setUsername(e.target.value)}}></input></div>
            <div className="font-mono">Password</div>
            <div className="pb-6"><input placeholder="123456" className="border w-full rounded-sm p-1" onChange={e => {setPassw(e.target.value)}}></input></div>
            <button className="text-white bg-black rounded-2xl w-full p-2 cursor-pointer" onClick={async () => 
                {
                    await axios.post("http://localhost:3000/api/v1/user/signup",{firstname, lastname, username, password});
                    navigate("/signin");
                }
                }>Sign Up</button>
            <div className="flex justify-center pt-4">Already have an account?<a className="underline cursor-pointer" onClick={() => {navigate("/signin")}}>Sign in</a></div>
        </div>
        </div>
    </div>
}
