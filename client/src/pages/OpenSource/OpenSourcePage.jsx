import { Link, useNavigate, useParams } from "react-router-dom";
import BackShareButton from "../../components/BackShareButton/BackShareButton";
import { LuExternalLink } from "react-icons/lu";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";

export default function OpenSourcePage() {

    const [openSource, setOpenSource] = useState(null)
    const {id} = useParams()
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        async function getOpenSources(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/opensource/id/${id}`)
                const result = await res.json()
                if(res.ok){
                    setOpenSource(result.openSource)
                } else {
                    navigate("/")
                }
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getOpenSources()
    }, [])

    return(
        <div className="mb-20 mt-10">
            <BackShareButton />
            { loading && <div className="flex justify-center"><Loading /></div> }
            { loading == false && <div className="my-6 flex flex-col gap-4">
                <h1 className="text-xl sm:text-3xl font-medium ml-[-1px]">{openSource.title}</h1>
                <p className="font-light"><span className="font-medium">Level :</span> {openSource.level}</p>
                <p className="font-medium">Description :</p>
                <p className="font-light">{openSource.description}</p>
                <p className="font-medium">Tech Stack :</p>
                <ul className="list-disc list-inside font-light px-2">
                    {openSource.techStack.map((tech) => (
                        <li key={tech}>{tech}</li>
                    ))}
                </ul>
                <Link to={openSource.hostedAt.link} className="px-4 py-2 text-white bg-black w-fit rounded-md flex flex-row items-center gap-1" target="_blank">
                    <p>{openSource.hostedAt.name}</p>
                    <LuExternalLink />
                </Link>
            </div> }
        </div>
    )
}