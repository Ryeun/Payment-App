import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Dashboard = () => {
    const navigate = useNavigate();
    const [users,setUsers] = useState([])
    const [filter,setFilter] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then(response => {
            setUsers(response.data.user)
        })
    },[filter])
    return <div className="bg-slate-100 h-screen">
        <div className="p-2">
            <div className="flex justify-between p-4 border-b shadow-md">
            <div>Payment App</div>
            <div className="flex gap-2">Hello <div onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
                }} className="font-semibold cursor-pointer">Logout</div></div>
            </div>
            <div className="font-semibold pb-9 pl-4">Your Balance Rs 10000000</div>
            <div className="font-semibold pb-2 pl-4">Users</div>
            <div className="pb-4"><input onChange={(e) => {setFilter(e.target.value)}} placeholder="Search users" className="border w-full rounded-4xl p-2 pl-4"></input></div>
            <div>
                {users.map(user => (
                    <div className="flex justify-between p-2">
                    <div className="pl-4">{user.firstname} {user.lastname}</div>
                    <div 
                        onClick={() => {
                        navigate("/send?id=" + user._id + "&name=" + user.firstname)
                    }}
                    ><button className="text-white bg-black rounded-2xl px-3 py-1 cursor-pointer">Send Money</button></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
}