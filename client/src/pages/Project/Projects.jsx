import Heading from "../../components/Heading/Heading";
import Tabs from "../../components/Tabs/Tabs";
import { MdFilterListAlt } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import MyContext from "../../MyContext";
import { ToastContainer, toast } from "react-toastify";

export default function Projects() {

    const [projects, setProjects] = useState([])
    const [searchedProjects, setSearchedProjects] = useState([])
    const [loading, setLoading] = useState(null)
    const { user } = useContext(MyContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("")

    const filters = ["Nextjs", "Nodejs", "Prisma", "Liveblocks", "Django", "Java", "Typescript", "GraphQL", "React", "MongoDB", "Appwrite", "Firebase", "Planetscale", "Clerk"]

    useEffect(() => {
        async function getPojects(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/project/all`)
                const result = await res.json()
                if(res.ok){
                    if(result.projects.length >= 1){
                        setProjects(result.projects)
                        setSearchedProjects(result.projects)
                    }
                }
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getPojects()
    }, [])

    async function handleLikeAndDislike(id){
        try {
            let clickedProject = {}
            projects.map((project) => {
                if(project._id == id){
                    clickedProject = project
                }
            })
            if(user.name && !(clickedProject.likedBy.includes(user.id))){
                const res = await fetch(`${import.meta.env.VITE_API_URL}/project/like/${id}`, {
                    method: "POST",
                    headers: {
                        "userid": user.id
                    }
                })
                const result = await res.json()
                if(res.ok){
                    let updatedProject = projects.map((project) => {
                        if(project._id == id){
                            project.likedBy.push(user.id)
                            return project
                        } else {
                            return project
                        }
                    })
                    setProjects(updatedProject)
                }
            } else {
                if(!user.name){
                    toast.error('Please login', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    })
                } else {
                    if(user.name && (clickedProject.likedBy.includes(user.id))){
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/project/dislike/${id}`, {
                            method: "POST",
                            headers: {
                                "userid": user.id
                            }
                        })
                        const result = await res.json()
                        if(res.ok){
                            let updatedProject = projects.map((project) => {
                                if(project._id == id){
                                    const updated = project.likedBy.filter((like) => like != user.id)
                                    return {...project, likedBy: updated}
                                } else {
                                    return project
                                }
                            })
                            setProjects(updatedProject)
                            setSearchedProjects(updatedProject)
                        }
                    }
                }
            }
        } catch(error) {
            console.log(error)
        }       
    }

    useEffect(() => {
        function handleSearch(){
            try {
                setShowFilter(false)
               if(searchTerm == ""){
                setSearchedProjects(projects)
               } else {
                const foundProjects = projects.filter((project) => project.title.toLowerCase().includes(searchTerm.toLowerCase()))             
                setSearchedProjects(foundProjects)
               }
            } catch(error) {
                console.log(error)
            }
        }
        handleSearch()
    }, [searchTerm])

    function handleFilter(filter){
        try{
            if(filter != selectedFilter){
                setSelectedFilter(filter)
                const filteredProjects = projects.filter((project) => project.techStack.includes(filter))
                setSearchedProjects(filteredProjects)
            } else {
                setSelectedFilter("")
                setSearchedProjects(projects)
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className="mb-20">
            <Heading text={"LEARN BY BUILDING"} />
            <Tabs />
            <div className="py-4 sm:py-8 w-full flex flex-row gap-6 justify-between">
                <div className="flex flex-row justify-between items-center w-full border px-2 py-[4px] rounded-md text-sm">
                    <input type="text" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} placeholder="Search" className="outline-none w-full"></input>
                    <IoIosSearch className="w-4 h-4 text-[#9CA3AF]" />
                </div>
                <div className="flex flex-row items-center gap-1 cursor-pointer" onClick={() => setShowFilter((filter) => !filter)}>
                    <p>Filter</p>
                    <MdFilterListAlt />
                </div>
            </div>
            {showFilter && 
                <div className="pb-8 flex flex-row gap-4 flex-wrap">
                    {filters.map((filter) => (
                        <div key={filter} className={`border py-1 px-2 bg-[#EEEEEE] rounded-md cursor-pointer ${selectedFilter == filter && "bg-[#fff]"}`} onClick={() => handleFilter(filter)}>{filter}</div>
                    ))}
                </div>
            }
            <div className="flex flex-col gap-4">
                { loading && <div className="flex justify-center"><Loading /></div> }
                { searchedProjects.map((project) => 
                    <div key={project._id}  className="flex flex-row items-center shrink justify-between border px-4 py-2 rounded-md">
                        <Link to={`/project/${project._id}`} className="flex flex-col w-[92%] gap-2">
                            <p className="text-sm sm:text-base">{project.title}</p>
                            <div className="flex flex-row gap-2 font-light items-center text-sm overflow-y-scroll no-scrollbar">
                                <p className="">{project.level}</p>
                                <p className="">•</p>
                                <ul className="flex flex-row gap-2 items-center">
                                    {project.techStack.map((tag) => <li key={tag} className="bg-[#EEEEEE] px-4 py-[1px] rounded-md text-sm">{tag}</li> )}
                                </ul>
                            </div>
                        </Link>
                        <div className="flex flex-col items-center justify-center cursor-pointer z-10 w-fit" onClick={() => handleLikeAndDislike(project._id)}>
                            {project.likedBy.includes(user.id) ? <FaHeart color="red" className="w-[20px] h-[20px]" /> : <FaRegHeart className="w-[20px] h-[20px]" /> }    
                            <p className="text-[12px]">{project.likedBy.length}</p>
                        </div>
                    </div>
                )}
                { (loading == false && projects.length == 0) && <p>No projects found</p> }  
                <ToastContainer />
            </div>
        </div>
    )
}