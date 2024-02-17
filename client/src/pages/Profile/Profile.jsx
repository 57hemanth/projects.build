import { useContext, useEffect } from "react";
import Heading from "../../components/Heading/Heading";
import MyContext from "../../MyContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const { user } = useContext(MyContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(user.name == undefined){
            navigate("/")
        }
    }, [])
    
    return(
        <div className="flex flex-col gap-2">
            <Heading text={"Profile"} />
            <p className="text-xl">Name: <span className="text-gray-500">{user.name}</span></p>
            <p className="text-xl">Email: <span className="text-gray-500">{user.email}</span></p>
        </div>
    )
}