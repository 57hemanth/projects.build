import { Routes, Route } from "react-router-dom";
import Projects from "./pages/Project/Projects";
import Ideas from "./pages/Idea/Ideas";
import IdeaPage from "./pages/Idea/IdeaPage";
import NavBar from "./components/NavBar/NavBar";
import ProjectPage from "./pages/Project/ProjectPage";
import OpenSourcePosts from "./pages/OpenSource/OpenSourcePage";
import OpenSource from "./pages/OpenSource/OpenSource";
import Roadmaps from "./pages/Roadmap/Roadmaps";
import RoadmapsPage from "./pages/Roadmap/RoadmapPage";
import Templates from "./pages/Template/Templates";
import TemplatePage from "./pages/Template/TemplatePage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Community from "./pages/Community/Community";
import Submit from "./pages/Submit/Submit";
import Subscribe from "./pages/Subscribe/Subscribe";
import LiveStreams from "./pages/LiveStream/LiveStreams";
import Contact from "./pages/Contact/Contact";
import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import Profile from "./pages/Profile/Profile";

export default function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getProfile() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/auth`, {
        method: "POST",
        credentials: "include"
      })
      const result = await res.json()
      if(res.ok){
        setUser(result.user)
      }
    }
    getProfile()
  }, [])

  return(
    <MyContext.Provider value={{user, setUser}}>
      <div className="container relative">
      <NavBar />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectPage />}/>
        <Route path="/opensource" element={<OpenSource />} />
        <Route path="/opensource/:id" element={<OpenSourcePosts />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/idea/:id" element={<IdeaPage />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/roadmaps/:id" element={<RoadmapsPage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/template/:id" element={<TemplatePage />} />
        <Route path="/livestreams" element={<LiveStreams />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/community" element={<Community />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
    </MyContext.Provider>
  )
}