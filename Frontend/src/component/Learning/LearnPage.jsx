import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import { fetchLanguageContent } from "../../../Services/FetchContent";
import ContentPage from "./ContentPage";
import useIsDesktop from '../../../CostumeHooks/useIsDesktop'
import { Activity } from "react"; 

const LearnPage = () => {
  const isDesktop  = useIsDesktop();
  const { language } = useParams();
  const [langContent, setLangContent] = useState(null); 
  const [activeLesson, setActiveLesson] = useState(0); 
  const [sideBarToggle, setSideBarToggle] = useState(isDesktop);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const result = await fetchLanguageContent(language);
        setLangContent(result); 

      } catch (err) {
        console.error("Error loading JSON:", err);
      }
    };
    loadContent();
  }, [language]);

  if (!langContent) return <p>Loading...</p>;

  return (
    <div className="d-flex">
      <Activity mode= {sideBarToggle ? "Visible" : "hidden"}>
        <Sidebar
          content={langContent[0]}
          activeLesson={activeLesson}
          setActiveLesson={setActiveLesson}
          sideBarToggle = {sideBarToggle}
        /> 
      </Activity>

      <ContentPage
        content={langContent[0].modules ? langContent[0].modules : []}
        activeLesson={activeLesson}
        setActiveLesson={setActiveLesson}
        setSideBarToggle={setSideBarToggle}
        sideBarToggle = {sideBarToggle}
      /> 
    </div>
  );
};

export default LearnPage;
