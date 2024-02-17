import { useNavigate, useParams } from "react-router-dom";
import BackShareButton from "../../components/BackShareButton/BackShareButton";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";

export default function IdeaPage() {

    const [idea, setIdea] = useState(null)
    const {id} = useParams()
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        async function getIdeas(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/idea/id/${id}`)
                const result = await res.json()
                if(res.ok){
                    setIdea(result.idea)
                } else {
                    navigate("/")
                }
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getIdeas()
    }, [])

    return(
        <div className="mb-20 mt-10">
            <BackShareButton />
            { loading && <div className="flex justify-center"><Loading /></div> }
            { loading == false && <div className="my-6 flex flex-col gap-4">
                <h1 className="text-xl sm:text-3xl font-medium ml-[-1px]">{idea.title}</h1>
                <p className="font-medium">Description :</p>
                <p className="font-light">{idea.description}</p>
            </div> }
        </div>
    )
}