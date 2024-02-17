import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import MyContext from "../../MyContext"
import { RiUserHeartLine } from "react-icons/ri"
import { ToastContainer, toast } from "react-toastify"
import { TiThMenu } from "react-icons/ti"
import { IoCloseOutline } from "react-icons/io5"
import { IoSparkles } from "react-icons/io5"

export default function NavBar() {
    const [showSidebar, setShowSidebar] = useState(false)
    const navigate = useNavigate()
    const { user } = useContext(MyContext);
    const tabs = [
        { text: "Projects", link: "/" },
        { text: "Open Source", link: "/opensource" },
        { text: "Ideas", link: "/ideas" },
        { text: "Roadmaps", link: "/roadmaps" },
        { text: "Templates", link: "/templates" },
        { text: "Live Streams", link: "/livestreams" },
    ]

    async function handleLogout(){
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
            method: "POST",
            credentials: "include"
        })
        const result = await res.json()
        toast.info(result.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigate("/")
        window.location.reload()
    }

    return(
        <div className="">
            <div className="h-20 flex flex-row justify-between items-center flex-wrap">
            <Link to="/"><p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#F12711] to-[#4286F4]">projects.build</p></Link>
            <ToastContainer />
            <ul className="flex-row gap-8 hidden sm:flex">
                <li className="text-md"><Link to={"/contact"}>Contact</Link></li>
                {user.name ? <li className="text-md">
                    <div className="flex flex-row gap-8 items-center">
                        <Link to={"/profile"} className="flex flex-row gap-2 items-center">
                            <RiUserHeartLine />
                            <p>{user.name}</p>
                        </Link>
                        <button className="text-md" onClick={handleLogout}>Logout</button>
                    </div>
                    </li> : <li className="text-md"><Link to={"/login"}>Login</Link></li> 
                }
                
            </ul>
            <TiThMenu className="text-2xl sm:hidden cursor-pointer" onClick={() => setShowSidebar((show) => !show)} />
            </div>
            {showSidebar && <div className="fixed bg-white top-0 w-full left-0 h-full z-50 flex flex-col p-4 gap-4">
                <div className="flex flex-row justify-between items-center">
                    <Link to="/"><p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#F12711] to-[#4286F4]">projects.build</p></Link>
                    <IoCloseOutline className="text-4xl cursor-pointer" onClick={() => setShowSidebar((show) => !show)}/>
                </div>
                <hr></hr>
                <div className="flex flex-col gap-2">
                    {tabs.map((tab) => (
                        <Link key={tab.text} to={tab.link} onClick={() => setShowSidebar((show) => !show)}>{tab.text}</Link>
                    ))}
                    <Link to={"/subscribe"} className="border-gradient px-6 py-[2px] w-fit" onClick={() => setShowSidebar((show) => !show)}>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-gradient">Subscribe</p>
                        <div className="text-[#FFD700]">
                            <IoSparkles />
                        </div>
                    </div>
                    </Link>
                </div>
                <hr></hr>
                <div className="flex flex-col gap-2">
                    <Link to={"/contact"} onClick={() => setShowSidebar((show) => !show)}>Contact</Link>
                    {user.name ? <div className="text-md">
                    <div className="flex flex-col gap-2">
                        <Link to={"/profile"} onClick={() => setShowSidebar((show) => !show)} className="flex flex-row gap-2 items-center">
                            <RiUserHeartLine />
                            <p>{user.name}</p>
                        </Link>
                        <div className="text-md cursor-pointer" onClick={handleLogout}>Logout</div>
                    </div>
                    </div> : <Link to={"/login"} onClick={() => setShowSidebar((show) => !show)}>Login</Link>
                    }
                </div>
            </div>}
        </div>
    )
}