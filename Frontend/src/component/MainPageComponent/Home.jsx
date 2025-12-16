import { Link } from "react-router-dom";  
import blurImg from "../../assets/image.png";   
import CourseSection from "./CourseSection";
import styles from "./Home.module.css";

const HeroSection = () => { 

  return (
    <div>
      <main className={`${styles["main-container"]} container-fluid mb-3`}>
      <div className="row align-items-center justify-content-center min-vh-50">
        <div className="col-12 col-lg-6 px-4 mb-5 mb-lg-0">
          <header className="mb-4">
            <h1 className="display-5 fw-bold mb-3 text-center text-lg-start">
              Learn Programming by Doing
            </h1>
            <p className="lead text-secondary text-center text-lg-start">
              Hands-on tutorials for React and Node.js (plus more), each followed
              by short quizzes to reinforce learning. Practice with real examples
              and track your progress lesson by lesson.
            </p>
          </header>

          <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
            <Link to="/courses" className="btn btn-dark btn-lg rounded-4 shadow-sm d-flex align-items-center gap-2">
              Browse course
            </Link>
            <Link to="/learn/java" className="btn btn-light btn-lg">
              Start with Java
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className="col-12 col-lg-6 position-relative d-flex justify-content-center">
          <img
            rel="preload"
            src={blurImg}
            alt="Blur Background"
            className={`${styles.img} img-fluid rounded-4`} />
        </div>
      </div>
    </main>

    <CourseSection/>

    <section className="py-5 bg-light border-top">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-4 position-relative d-inline-block">
                About us..
                <span className="position-absolute bottom-0 start-0 w-50 border-bottom border-2 border-primary rounded"></span>
              </h2>
              <div className="bg-white p-5 rounded-4 shadow-soft border">
                <p className="lead text-secondary mb-0">
                  <strong className="text-dark">LearnCode</strong> is a practical learning platform inspired by the clarity of W3Schools and the depth of GFG. Lessons are concise, example-driven, and followed by quizzes to help you retain concepts. We currently focus on <span className="text-primary fw-bold">React</span> and <span className="text-primary fw-bold">Node.js</span>, with additional languages like Python, Java, and C++ and many more courses available as you grow.
                </p>
              </div>
            </div>
          </div>
        </div>
     </section>
    </div>
    
  );
};

export default HeroSection;
