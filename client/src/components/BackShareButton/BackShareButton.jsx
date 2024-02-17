import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";

export default function BackShareButton(){
    const [copiedLink, setCopiedLink] = useState(false);
    let navigate = useNavigate();

    function handleShare(){
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        setCopiedLink((copiedLink) => !copiedLink);
    }

    function handleBack(){
        navigate(-1);
    }

    return(
        <div className="mb-10 flex flex-row justify-between">
            <div className="flex flex-row items-center gap-2 bg-[#EEEEEE] w-fit px-4 py-1 rounded-md cursor-pointer" onClick={handleBack}>
                <IoMdArrowRoundBack />
                <p>Back</p>
            </div>
            <div className="flex flex-row items-center gap-2 bg-[#EEEEEE] w-fit px-4 py-1 rounded-md cursor-pointer" onClick={handleShare}>
                <p>{copiedLink ? "Link copied" : "Share"}</p>
                <IoShareSocial />
            </div>
        </div>
    )
}