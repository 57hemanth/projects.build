import { useEffect, useState } from "react";
import BackShareButton from "../../components/BackShareButton/BackShareButton";
import Project from "../../components/Project/Project";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function RoadmapsPage() {
    const { id } = useParams()
    const [roadmap, setRoadmap] = useState()
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function getRoadmap(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/roadmap/id/${id}`)
                const result = await res.json()
                if(!result.roadmap){
                    navigate("/roadmaps")
                }
                setRoadmap(result.roadmap)
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getRoadmap()
    }, [])

    return(
        <div className="mb-20 mt-10">
            <BackShareButton />
            { loading && <div className="flex justify-center"><Loading /></div> }
            { loading == false && <div className="flex flex-col gap-4 w-full">
                <h1 className="text-3xl font-medium ml-[-1px] mb-4">{roadmap.title}</h1>
                {roadmap.path.map((item, i) => (
                    <div key={i} className="flex flex-row items-center gap-4">
                        <p className="bg-[#EEEEEE] px-3 py-1 rounded-full">{i+1}</p>
                        <Project path={item} />
                    </div>
                ))}
            </div>
            }
        </div>
    )
}