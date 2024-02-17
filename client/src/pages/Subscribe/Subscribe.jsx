import { useState } from "react"
import { IoMdHeart } from "react-icons/io"

export default function Subscribe() {

    const [subscribed, setSubscribed] = useState(false)
    const [enteredData, setEnteredData] = useState({
        name: "",
        email: ""
    })

    async function handleSubmit(e){
        e.preventDefault()
        const res = await fetch(`${import.meta.env.VITE_API_URL}/subscribe/add`, {
            method: "POST",
            body: JSON.stringify(enteredData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const result = await res.json()
        if(res.ok){
            setSubscribed(true)
        }
    }
    return(
        <div>
            {subscribed == false && 
                <div className="flex flex-col max-w-xl mx-auto min-h-full mt-8 rounded-md">
                    <h1 className="py-6 font-inter font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#BDC3C7] to-[#2C3E50] w-fit">SUBSCRIBE TO OUR NEWSLETTER</h1>
                    <p>Life is too short for boring emails.</p>
                    <p>Join us and get the latest updates on Projects, Templates, and more ♥️</p>
                    <form className="flex flex-col gap-2 pt-4" onSubmit={handleSubmit}>
                        <input name="name" value={enteredData.name} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))} className="outline-none border px-2 py-1 rounded" type="text" placeholder="Enter your name"></input>
                        <input name="email" value={enteredData.email} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))} className="outline-none border px-2 py-1 rounded" type="email" placeholder="Enter your email"></input>
                        <button className="outline-none border px-2 py-1 rounded bg-black text-white">Subscribe</button>
                    </form>
                </div>
            }
            { subscribed && 
                <div className="flex flex-col gap-4 items-center mt-16">
                    <p className="text-7xl">🎉</p>
                    <div className="flex flex-row items-center justify-center gap-1">
                        <p className="text-xl">Thank you </p>
                        <IoMdHeart fill="red"/>
                    </div>
                </div>
            }
        </div>
        
    )
}