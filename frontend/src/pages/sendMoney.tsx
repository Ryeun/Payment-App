import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
export const SendMoney = () => {
    const navigate = useNavigate();
    const [amount,setAmount] = useState(0);
    const [SearchParamas] = useSearchParams()
    const id = SearchParamas.get("id")
    const name = SearchParamas.get("name")
    return <div className="bg-slate-950 h-screen">
        <div className="flex justify-center pt-10">
            <div className="bg-emerald-50 w-96 p-9 rounded-4xl">
            <div className="font-semibold text-4xl pb-12 flex justify-center">Send Money</div>
            <div className="font-mono pb-2 text-2xl">To:{name}</div>
            <div className="font-extralight pb-1">Amount (in Rs)</div>
            <div className="pb-6"><input placeholder="Enter amount" type="number" className="border w-full rounded-sm p-2" onChange={
                (e) => {setAmount(parseInt(e.target.value))}
            }></input></div>
            <button className="text-white bg-green-500 rounded-2xl w-full p-2 cursor-pointer"
            onClick={
                () => {
                    axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to: id,
                        amount
                    },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
                }
            }>Initiate Transfer</button>
            <div className="cursor-pointer flex justify-center pt-2" onClick={() => {navigate("/dashboard")}}>Go Back</div>
        </div>
        </div>
    </div>
}