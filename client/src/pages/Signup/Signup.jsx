import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {

    const [enteredData, setEnteredData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    async function handleCreate(e) {
        e.preventDefault();
        if(enteredData.name == "" || enteredData.email == "" || enteredData.password == ""){
            alert("Please enter all details");
        }
        try {
            const createUser = await fetch(`${import.meta.env.VITE_API_URL}/user/new`, {
                method: "POST",
                body: JSON.stringify(enteredData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const res = await createUser.json();
            setEnteredData({
                name: "",
                email: "",
                password: ""
            })
            if(createUser.ok){
                toast.success('User created successfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                await new Promise(resolve => setTimeout(resolve, 1000))
                navigate("/login");
            } else {
                toast.error(res.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch(error) {
            console.log(error);
        }
    } 

    return(
        <div className="flex flex-col max-w-[480px] mx-auto min-h-full mt-16 rounded-md gap-4">
            <p className="text-2xl text-center pb-4 font-semibold">Signup</p>
            <form className="flex flex-col gap-4">
                <input className="outline-none border px-2 py-1 rounded" name="name" type="text" placeholder="Name" value={enteredData.name} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))}></input>
                <input className="outline-none border px-2 py-1 rounded" type="email" placeholder="Email address" name="email" value={enteredData.email} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))}></input>
                <input className="outline-none border px-2 py-1 rounded" type="password" placeholder="Password" name="password" value={enteredData.password} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))}></input>
                <button className="bg-black text-white rounded-md py-1" type="submit" onClick={handleCreate}>Create account</button>
            </form>
            <p className="text-[#9CA3AF]">Have account? <Link to={"/login"} className="text-black">Login here</Link></p>
            <ToastContainer />
        </div>
    )
}