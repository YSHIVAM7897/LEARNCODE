import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import { data, Link, useParams } from "react-router-dom"; 
import AddLinks from "../PopUps/AddLinks";
import styles from "./Profile.module.css";
import AddEducation from "../PopUps/AddEducation";
import UploadResume from "../PopUps/UploadResume";
import { getProfileDetails } from "../../../Services/ProfileServices";

const Profile = () => { 
  const uid = useParams(); 
  const [isLoggedIn, setIsLoggedIn ] = useState(false);
  const [showLinkPopup, setshowLinkPopup] = useState(false);
  const [showEduPopup, setshowEduPopup] = useState(false);
  const [showResumetPopup, setshowResumetPopup] = useState(false);
  const [user, setUserData] = useState([]);
  

  const getDate = (startingDate, endDate) => {
    const d1 = new Date(startingDate);
    const d2 = new Date(endDate);

    const startMonth = d1
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const endMonth = d2
      .toLocaleString("default", { month: "short" })
      .toUpperCase();

    return `${startMonth}-${d1.getFullYear()} to ${endMonth}-${d2.getFullYear()}`;
  };

  const iconMap = { linkedin: "bi bi-linkedin", github: "bi bi-github", portfolio: "bi bi-globe2",};

  useEffect(() => { 
    const fetchCertificates = async () => {
      const result = await getProfileDetails( uid.userid );

      setUserData(result.data); 
      setIsLoggedIn(result.isLoggedIn);
    };

    fetchCertificates();
  }, []);
 
  return (
    <div
      className={`${styles["custome-container"]} d-flex flex-column flex-lg-row gap-4 min-vh-100 bg-light`}
    >
      {/* LEFT SIDE */}
      <div className={`${styles["left-container"]} d-flex flex-column gap-4`}>
        {/* USER CARD */}
        <Card className="p-2 shadow-sm rounded-4 border-1">
          <div className="d-flex p-3 flex-column gap-3">
            <Image
              src={
                user.profilePic ||
                "https://api.dicebear.com/7.x/pixel-art/svg?seed=Gamer"
              }
              roundedCircle
              width="70"
              height="70"
              className="shadow-sm bg-light"
            />

            <div>
              <h4 className="fw-bold mb-1">
                {user.firstName} {user.lastName}
              </h4>
              <span className="text-muted">@{user.userId}</span>
            </div>
          </div>
        </Card>

        {/* PERSONAL INFO */}
        <Card className="p-4 shadow-sm rounded-4 border-1">
          <h5 className="fw-bold mb-4">Personal Information</h5>

          <div className="mb-2 d-flex gap-2 align-items-center">
            <i class="bi bi-envelope-open" />
            <span>{user.email}</span>
          </div>

          <div className="mb-2 d-flex gap-2 align-items-center">
            <i class="bi bi-telephone" />
            <span>+91 785555398</span>
          </div>

          <div className="mb-2 d-flex gap-2 align-items-center">
            <i class="bi bi-geo-alt" />
            <span>Delhi, India</span>
          </div>
        </Card>

        <Card className="p-4 shadow-sm rounded-4 border-1">
          <div className="d-flex  justify-content-between">
            <h5 className="fw-bold mb-3">My Resume</h5>
            {isLoggedIn && <button
              className="btn text-primary rounded-pill mb-3 p-0"
              onClick={() => setshowResumetPopup(true)}
            >
              + Add Resume
            </button>}

            <UploadResume
              show={showResumetPopup}
              onHide={() => setshowResumetPopup(false)}
            />
          </div>

          <span>Add your resume here</span>
        </Card>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-100 d-flex flex-column gap-4">
        <Card className="p-4 shadow-sm rounded-4 border-1">
          <div className="d-flex gap-2 align-items-center mb-3">
            <i class="bi bi-award fs-5" />
            <h5 className="fw-bold m-0">My Badges</h5>
          </div>
          {user.certificates ? (
            <div className="d-flex flex-wrap gap-3">
              {user.certificates.map((item) => (
                <Card
                  key={item._id}
                  className="p-3 shadow-sm rounded-4"
                  style={{ width: "150px", background: "#e2fddbff" }}
                >
                  <div className="d-flex gap-2 align-items-center ">
                    <i className="bi bi-fire" />
                    <h5 className="fw-bold text-capitalize m-0">
                      {item.courseName}
                    </h5>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">No Badges yet</p>
          )}
        </Card>

        <Card className="p-4 shadow-sm rounded-4 border-1">
          <div className="d-flex gap-2 align-items-center mb-3">
            <i class="bi bi-patch-check fs-5" />
            <h5 className="fw-bold m-0">Certificates</h5>
          </div>

          {user.certificates ? (
            <div className="d-flex flex-wrap gap-3">
              {user.certificates.map((item) => (
                <Card
                  key={item._id}
                  className={`${styles["certificate-bg"]} p-3 shadow-sm rounded-3`}
                >
                  <div className="d-flex gap-2 align-items-center mb-1">
                    <i className="bi bi-bookmark-star" />
                    <h5 className="fw-bold mb-1 text-capitalize">
                      {item.courseName}
                    </h5>
                  </div>

                  <p className="text-muted small mb-2 tw-semibold">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <Link
                    className="btn btn-outline-success rounded-3"
                    to={`/certificates/${item.certificateId}`}
                  >
                    View Certificate
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0">No certificates yet</p>
          )}
        </Card>

        <Card className="p-4 shadow-sm rounded-4 border-1">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-2 align-items-center mb-3">
              <i class="bi bi-book fs-5" />
              <h5 className="fw-bold m-0">Education</h5>
            </div>
            {isLoggedIn && <button
              className="btn text-primary rounded-pill px-3"
              onClick={() => setshowEduPopup(true)
              }
            >
              + Add Education
            </button>}

            <AddEducation
              show={showEduPopup}
              onHide={() => setshowEduPopup(false)}
              data={user.education}
            />
          </div>
          {user.education ? (
            user.education?.map((item, index) => {
              return (
                <div key={index} className="border-2 border-bottom">
                  <h3>{item.institute}</h3>
                  <ul className={`${styles["edu-list"]} d-flex`}>
                    <li className="font-size-sm">{item.degree}</li>
                    <li className="font-size-sm">
                      {getDate(item.startDate, item.endDate)}
                    </li>
                    <li>CGPA: {item.cgpa}</li>
                  </ul>

                  <div className="border-2 " />
                </div>
              );
            })
          ) : (
            <p className="text-muted mb-0">Add your education details here</p>
          )}
        </Card>

        <Card className="p-4 shadow-sm rounded-4 border-0 bg-white">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-2 align-items-center">
              <i className="bi bi-link-45deg fs-4 text-dark" />
              <h5 className="fw-semibold m-0">Links</h5>
            </div>

            {isLoggedIn && <button
              className="btn text-primary rounded-pill px-3"
              onClick={() => setshowLinkPopup(true)}
            >
              + Add Link
            </button>}

            <AddLinks
              show={showLinkPopup}
              onHide={() => setshowLinkPopup(false)}
              data={user.links}
            />
          </div>

          {user.links && user.links.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {user.links.map((item) => (
                <div
                  key={item._id}
                  className="d-flex flex-row align-items-center p-3 border-2 border-bottom"
                >
                  <i
                    className={`${
                      iconMap[item.title.toLowerCase()] || "bi bi-link-45deg"
                    } fs-4 text-primary bg-light rounded-5 p-1`}
                  />
                  <div className="ms-3 d-flex flex-column">
                    <h6 className="mb-1 fw-bold text-capitalize">
                      {item.title}
                    </h6>
                    <a
                      className="text-primary small"
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ wordBreak: "break-all" }}
                    >
                      {item.link}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted mb-0 text-center py-2">
              Add your portfolio or social links
            </p>
          )}
        </Card>
      </div>
    </div>
  );

};

export default Profile;
