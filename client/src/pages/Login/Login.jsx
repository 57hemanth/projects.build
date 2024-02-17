import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MyContext from "../../MyContext";
 
export default function Login() {

    const navigate = useNavigate();
    const [enteredData, setEnteredData] = useState({
        email: "",
        password: ""
    });
    const inpRef = useRef();
    useEffect(() => {
        inpRef.current.focus();
    }, []);
    const { user, setUser } = useContext(MyContext);

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
            method: "POST",
            body: JSON.stringify(enteredData),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const response = await res.json();
        setEnteredData({
            email: "",
            password: ""
        });
        if(res.ok){
            toast.success('Login successful', {
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
            window.location.href = "/"
        } else {
            toast.error(response.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            inpRef.current.focus();
        }
    }

    return(
        <div className="flex flex-col max-w-[480px] mx-auto min-h-full mt-10 rounded-md gap-4">
            <p className="text-2xl text-center pb-4 font-semibold">Login</p>
            <form className="flex flex-col gap-4">
                <input ref={inpRef} className="outline-none border px-2 py-1 rounded" type="email" name="email" placeholder="Email" value={enteredData.email} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))}></input>
                <input className="outline-none border px-2 py-1 rounded" type="password" name="password" placeholder="Password" value={enteredData.password} onChange={(e) => setEnteredData((data) => ({...data, [e.target.name]: e.target.value}))}></input>
                <button className="bg-black text-white rounded-md py-1" type="submit" onClick={handleLogin}>Submit</button>
            </form>
            <p className="text-[#9CA3AF]">No account? <Link to={"/signup"} className="text-black">Click here</Link></p>
            <ToastContainer />
        </div>
    )
}