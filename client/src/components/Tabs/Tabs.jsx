import { Link, useLocation } from "react-router-dom";
import "./tabs.css";
import { IoSparkles } from "react-icons/io5";

export default function Tabs() {
    const tabs = [
        {
            text: "Projects",
            link: "/"
        },
        {
            text: "Open Source",
            link: "/opensource"
        },
        {
            text: "Ideas",
            link: "/ideas"
        },
        {
            text: "Roadmaps",
            link: "/roadmaps"
        },
        {
            text: "Templates",
            link: "/templates"
        },
        {
            text: "Live Streams",
            link: "/livestreams"
        }
    ]

    const location = useLocation()
    const url = location.pathname

    return(
        <div className="flex-row items-center gap-6 pl-[1px] hidden sm:flex flex-wrap">
            <ul className="flex flex-row gap-6">
                {tabs.map((tab) => (
                    <li key={tab.text}><Link to={tab.link} className={url == tab.link ? "text-white bg-black rounded-full px-6 py-1" : ""}>{tab.text}</Link></li>
                ))}
            </ul>
            <Link to={"/subscribe"} className="border-gradient px-6 py-[2px]">
                <div className="flex flex-row items-center gap-1">
                    <p className="text-gradient">Subscribe</p>
                    <div className="text-[#FFD700]">
                        <IoSparkles />
                    </div>
                </div>
            </Link>
        </div>
    )
}