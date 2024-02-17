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

export default function Templates() {

    const [templates, setTemplates] = useState([])
    const [searchedTemplates, setSearchedTemplates] = useState([])
    const [loading, setLoading] = useState(null)
    const { user } = useContext(MyContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("")

    const filters = ["Nextjs", "Tailwind", "Prisma", "Supabase", "Vue", "Firebase", "Remix", "Sanity", "Upstash", "Nuxt", "Postgres", "NextAuth"]

    useEffect(() => {
        async function getTemplates(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/template/all`)
                const result = await res.json()
                if(res.ok){
                    if(result.templates.length >= 1){
                        setTemplates(result.templates)
                        setSearchedTemplates(result.templates)
                    }
                }
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getTemplates()
    }, [])

    async function handleLikeAndDislike(id){
        try {
            let clickedTemplate = {}
            templates.map((template) => {
                if(template._id == id){
                    clickedTemplate = template
                }
            })
            if(user.name && !(clickedTemplate.likedBy.includes(user.id))){
                const res = await fetch(`${import.meta.env.VITE_API_URL}/template/like/${id}`, {
                    method: "POST",
                    headers: {
                        "userid": user.id
                    }
                })
                const result = await res.json()
                if(res.ok){
                    let updatedTemplate = templates.map((template) => {
                        if(template._id == id){
                            template.likedBy.push(user.id)
                            return template
                        } else {
                            return template
                        }
                    })
                    setTemplates(updatedTemplate)
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
                    if(user.name && (clickedTemplate.likedBy.includes(user.id))){
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/template/dislike/${id}`, {
                            method: "POST",
                            headers: {
                                "userid": user.id
                            }
                        })
                        const result = await res.json()
                        if(res.ok){
                            let updatedTemplate = templates.map((template) => {
                                if(template._id == id){
                                    const updated = template.likedBy.filter((like) => like != user.id)
                                    return {...template, likedBy: updated}
                                } else {
                                    return template
                                }
                            })
                            setTemplates(updatedTemplate)
                            setSearchedTemplates(updatedTemplate)
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
                setSearchedTemplates(templates)
               } else {
                const foundTemplates = templates.filter((template) => template.title.toLowerCase().includes(searchTerm.toLowerCase()))
                setSearchedTemplates(foundTemplates)
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
                const filteredTemplates = templates.filter((template) => template.techStack.includes(filter))
                setSearchedTemplates(filteredTemplates)
            } else {
                setSelectedFilter("")
                setSearchedTemplates(templates)
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className="mb-20">
            <Heading text={"PICK YOUR TEMPLATE"} />
            <Tabs />
            <div className="py-8 w-full flex flex-row gap-6 justify-between">
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
                { searchedTemplates.map((template) => 
                    <div key={template._id}  className="flex flex-row items-center shrink justify-between border px-4 py-2 rounded-md">
                        <Link to={`/template/${template._id}`} className="flex flex-col w-[92%] gap-2">
                            <p className="text-sm sm:text-base">{template.title}</p>
                            <div className="flex flex-row gap-2 font-light items-center text-sm overflow-y-scroll no-scrollbar">
                                <ul className="flex flex-row gap-2 items-center">
                                    {template.techStack.map((tag) => <li key={tag} className="bg-[#EEEEEE] px-4 py-[1px] rounded-md text-sm">{tag}</li> )}
                                </ul>
                            </div>
                        </Link>
                        <div className="flex flex-col items-center cursor-pointer z-10 w-fit pl-2 bg-white" onClick={() => handleLikeAndDislike(template._id)}>
                            {template.likedBy.includes(user.id) ? <FaHeart color="red" className="w-[20px] h-[20px]" /> : <FaRegHeart className="w-[20px] h-[20px]" /> }    
                            <p className="text-[12px]">{template.likedBy.length}</p>
                        </div>
                    </div>
                )}
                { (loading == false && templates.length == 0) && <p>No templates found</p> }  
                <ToastContainer />
            </div>
        </div>
    )
}