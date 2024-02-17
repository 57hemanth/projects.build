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

export default function OpenSource() {

    const [openSources, setOpenSources] = useState([])
    const [searchedOpenSources, setSearchedOpenSources] = useState([])
    const [loading, setLoading] = useState(null)
    const { user } = useContext(MyContext)
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilter, setShowFilter] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("")

    const filters = ["Nextjs", "Node", "Prisma", "React", "MongoDB", "Express", "Planetscale", "Tinybird", "Clerk"]

    useEffect(() => {
        async function getOpenSources(){
            try {
                setLoading(true)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/opensource/all`)
                const result = await res.json()
                if(res.ok){
                    if(result.openSources.length >= 1){
                        setOpenSources(result.openSources)
                        setSearchedOpenSources(result.openSources)
                    }
                }
                setLoading(false)
            } catch(error){
                console.log(error)
            }
        }
        getOpenSources()
    }, [])

    async function handleLikeAndDislike(id){
        try {
            let clickedOpenSource = {}
            openSources.map((openSource) => {
                if(openSource._id == id){
                    clickedOpenSource = openSource
                }
            })
            if(user.name && !(clickedOpenSource.likedBy.includes(user.id))){
                const res = await fetch(`${import.meta.env.VITE_API_URL}/opensource/like/${id}`, {
                    method: "POST",
                    headers: {
                        "userid": user.id
                    }
                })
                const result = await res.json()
                if(res.ok){
                    let updatedOpenSource = openSources.map((openSource) => {
                        if(openSource._id == id){
                            openSource.likedBy.push(user.id)
                            return openSource
                        } else {
                            return openSource
                        }
                    })
                    setOpenSources(updatedOpenSource)
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
                    if(user.name && (clickedOpenSource.likedBy.includes(user.id))){
                        const res = await fetch(`${import.meta.env.VITE_API_URL}/opensource/dislike/${id}`, {
                            method: "POST",
                            headers: {
                                "userid": user.id
                            }
                        })
                        const result = await res.json()
                        if(res.ok){
                            let updatedOpenSource = openSources.map((openSource) => {
                                if(openSource._id == id){
                                    const updated = openSource.likedBy.filter((like) => like != user.id)
                                    return {...openSource, likedBy: updated}
                                } else {
                                    return openSource
                                }
                            })
                            setOpenSources(updatedOpenSource)
                            setSearchedOpenSources(updatedOpenSource)
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
                setSearchedOpenSources(openSources)
               } else {
                const foundOpenSources = openSources.filter((openSource) => openSource.title.toLowerCase().includes(searchTerm.toLowerCase()))
                setSearchedOpenSources(foundOpenSources)
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
                const filteredOpenSources = openSources.filter((openSource) => openSource.techStack.includes(filter))
                setSearchedOpenSources(filteredOpenSources)
            } else {
                setSelectedFilter("")
                setSearchedOpenSources(openSources)
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className="mb-20">
            <Heading text={"DO CONTRIBUTIONS"} />
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
                { searchedOpenSources.map((openSource) => 
                    <div key={openSource._id}  className="flex flex-row items-center shrink justify-between border px-4 py-2 rounded-md">
                        <Link to={`/opensource/${openSource._id}`} className="flex flex-col gap-2 w-[92%]">
                            <p className="text-sm sm:text-base">{openSource.title}</p>
                            <div className="flex flex-row gap-2 font-light items-center text-sm overflow-y-scroll no-scrollbar">
                                <p className="">{openSource.level}</p>
                                <p className="">•</p>
                                <ul className="flex flex-row gap-2 items-center">
                                    {openSource.techStack.map((tag) => <li key={tag} className="bg-[#EEEEEE] px-4 py-[1px] rounded-md text-sm">{tag}</li> )}
                                </ul>
                            </div>
                        </Link>
                        <div className="flex flex-col items-center cursor-pointer z-10 w-fit pl-2 bg-white" onClick={() => handleLikeAndDislike(openSource._id)}>
                            {openSource.likedBy.includes(user.id) ? <FaHeart color="red" className="w-[20px] h-[20px]" /> : <FaRegHeart className="w-[20px] h-[20px]" /> }    
                            <p className="text-[12px]">{openSource.likedBy.length}</p>
                        </div>
                    </div>
                )}
                { (loading == false && openSources.length == 0) && <p>No Opensource posts found</p> }  
                <ToastContainer />
            </div>
        </div>
    )
}