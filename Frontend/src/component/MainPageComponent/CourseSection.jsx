import { use, useState } from "react";
import LangCard from "../UtilComponents/LangCard";
import { fetchSupportedLanguage } from "../../../Services/FetchContent";
import { useEffect } from "react"; 
import Loading from "../UtilComponents/Loading";
import styles from "./CourseSection.module.css"

const CourseSection = () => {
  const pathName = window.location.pathname;
 
  const [itemToShow, setItemToShow] = useState(5);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const result = await fetchSupportedLanguage();
        setCourses(result); 
        
        if(pathName==="/courses") setItemToShow(result.length);
        
      } catch (err) {
         console.error(err)
      }
    };

    loadContent();
  }, []); 

  if (!courses) return <div style={{minHeight: "15rem"}}><Loading height={'15rem'}/></div>;
 
  return (
    <section
      id="course"
      className="px-5 py-5"
      aria-labelledby="languages-heading"
    >
      <div className="row mb-5 align-items-end">
            <div className="col-md-8">
               <h2 className="fw-bold display-6 mb-0">Top Courses in 
                 <span className={`${styles.gradientText}`}> easy way</span> to learn
               </h2>
            </div>
      </div>

      {/* course cards  */}
      <div className="d-flex flex-wrap gap-4 ">
        {courses.slice(0, itemToShow).map((lang) => (
          <LangCard key={lang.slug} lang={lang} />
        ))}
      </div>

      {/* load more button  */}
      <div className="text-center mt-5">
        {itemToShow < courses.length && (
          <button
            className="btn btn-light border px-4 py-2 rounded-pill fw-bold text-primary"
            onClick={() => setItemToShow(itemToShow + 3)}
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default CourseSection;
