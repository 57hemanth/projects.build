import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

export default function Project({path}){
    const { _id, title, techStack, level, likedBy } = path
    return(
        <Link to={`/project/${_id}`} className="flex flex-row items-center justify-between shrink border px-4 py-2 rounded-md cursor-pointer w-[86%] sm:w-full">
                    <div className="flex flex-col gap-2 w-[92%]">
                        <p className="text-sm sm:text-base">{title}</p>
                        <div className="flex flex-row gap-2 font-light items-center text-sm overflow-y-scroll no-scrollbar">
                            <p className="">{level}</p>
                            <p className="">•</p>
                            <ul className="flex flex-row gap-2 items-center">
                                {techStack.map((tech) => (
                                    <li key={tech} className="bg-[#EEEEEE] px-4 py-[1px] rounded-md text-sm">{tech}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                        <FaRegHeart className="w-[20px] h-[20px]" />
                        <p className="text-[12px]">{likedBy.length}</p>
                    </div>
        </Link>
    )
}