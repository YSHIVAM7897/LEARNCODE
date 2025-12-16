import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopicContent } from "../../../Services/FetchContent";
import "../Learning/ContentPage.css";

const ContentPage = ({
  content,
  activeLesson,
  setActiveLesson,
  setSideBarToggle,
  sideBarToggle,
}) => {

  const { language, topic } = useParams();
  const [htmlContent, setHtmlContent] = useState([]);
  const topicContent = content.find((lesson) => lesson.slug === topic);

  useEffect(() => {
    const loadHtmlContent = async () => {
      try {
        const response = await fetchTopicContent(language, topic);
        let data = await response;
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        if (data.message === "Module not found") {
          data = [{ id: 0, content: "<center class=\"not-found\">Module not found <center>" }];
        }
        setHtmlContent(data);
      } catch (error) {
        console.error("Error loading HTML content:", error);
      }
    };

    loadHtmlContent();
  }, [language, topic]);

  if (!topicContent) {
    return (
      <div className="flex-grow-1 d-flex flex-column">
      <nav className="navbar navbar-expand-lg border-bottom bg-light">
        <div className="navbar-brand d-flex align-items-center gap-3 px-4 py-2 m-0">
          <i
            className="bi bi-layout-sidebar fs-5 text-primary"
            onClick={() => setSideBarToggle(!sideBarToggle)}
          ></i>
          <div>
            <p className="m-0 small text-muted">
              {language ? language.charAt(0).toUpperCase() + language.slice(1) : ""} / Module{" "}
              {topicContent ? topicContent.moduleNumber : ""}
            </p>
            <p className="mb-0">{topicContent ? topicContent.moduleTitle : ""}</p>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1 p-5 text-center">
        <h2 className="text-secondary fw-light">
          Please select a topic from the sidebar.
        </h2>
      </div>
      </div>
    );
  }

  return (
    <div className="flex-grow-1 d-flex flex-column">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg border-bottom bg-light">
        <div className="navbar-brand d-flex align-items-center gap-3 px-4 py-2 m-0">
          <i
            className="bi bi-layout-sidebar fs-5 text-primary"
            onClick={() => setSideBarToggle(!sideBarToggle)}
          ></i>
          <div>
            <p className="m-0 small text-muted">
              {language.charAt(0).toUpperCase() + language.slice(1)} / Module{" "}
              {topicContent.moduleNumber}
            </p>
            <p className="mb-0">{topicContent.moduleTitle}</p>
          </div>
        </div>
      </nav>

      <div className="flex-grow-1 d-flex flex-column">
        <div className="">
          {/* Loop through the array */}
          {htmlContent.map(
            (item) => 
              item.id === activeLesson && (
                <div
                  key={item.id}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="container py-4 mt-auto">
          <div className="row justify-content-between m-v-5">
            <div className="col-auto">
              <button
                className="btn btn-success"
                disabled={activeLesson < 1}
                onClick={() =>
                  setActiveLesson(activeLesson > 0 && activeLesson - 1)
                }
              >
                Previous
              </button>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-success"
                disabled={activeLesson >= htmlContent.length - 1}
                onClick={() =>
                  setActiveLesson((prev) =>
                    prev + 1 < htmlContent.length ? prev + 1 : 0
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContentPage;
