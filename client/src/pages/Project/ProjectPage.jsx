import { Fragment, useEffect, useState } from "react";
import BackShareButton from "../../components/BackShareButton/BackShareButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

export default function ProjectPage() {

    const [project, setProject] = useState(null)
    const {id} = useParams()
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        async function getProjectDetails(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/project/id/${id}`)
                const result = await res.json()
                if(res.ok){
                    setProject(result.project)
                } else {
                    navigate("/")
                }
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getProjectDetails()
    }, [])

    return(
        <div className="mb-20 mt-10">
            <BackShareButton />
            { loading && <div className="flex justify-center"><Loading /></div> }
            { loading == false && <div className="my-6 flex flex-col gap-4">
                <h1 className="text-xl sm:text-3xl font-medium ml-[-1px]">{project.title}</h1>
                <p className="font-light"><span className="font-medium">Level : </span>{project.level}</p>
                <p className="font-medium">Description :</p>
                <p className="font-light">{project.description}</p>
                <p className="font-medium">Tech Stack :</p>
                <ul className="list-disc list-inside font-light px-2">
                    {project.techStack.map((tech) => <li key={tech}>{tech}</li> )}
                </ul>
                <p className="font-medium">Videos :</p>
                <div className="flex flex-row flex-wrap gap-6">
                    {project.videoLinks.map((video) => 
                    <Fragment key={video}>
                        <iframe src={video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </Fragment>)}
                </div>
                <p>Thanks to <Link to={project.createdBy.link} className="font-medium">{project.createdBy.name}</Link></p>
            </div> }
        </div>
    )
}