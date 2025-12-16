import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import QuesCard from "../UtilComponents/QuesCard";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchQuizData, generateCertificate } from "../../../Services/FetchContent";

function Quiz() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  // ------------------------------------------------------------
  // Fetch Quiz Questions
  // ------------------------------------------------------------
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizData(language);

        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [language]);

  // ------------------------------------------------------------
  // Handle Answer Select
  // ------------------------------------------------------------
  const handleSelect = (questionId, option) => {
    if (submitted && !canEdit) return; // Prevent editing after submission
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // ------------------------------------------------------------
  // Handle Quiz Submit
  // ------------------------------------------------------------
const handleSubmit = async () => {
  if (questions.length === 0) {
    alert("No questions available.");
    return;
  }

  setSubmitted(true);
  setCanEdit(true);

  let score = 0;
  questions.forEach((q) => {
    if (answers[q.id] === q.correct) score++;
  });

  const percent = (score / questions.length) * 100;

  if (percent >= 70) {
    setLoading(true);
    // Get response from backend
    const result = await generateCertificate(language, percent);
    setLoading(false);

    // Pass certificate details to next page
    navigate(`/certificates/${result.data.certificateId}`, { state: { result : result.data } });
  }
};


  // ------------------------------------------------------------
  // Loading State
  // ------------------------------------------------------------
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  // ------------------------------------------------------------
  // Main UI
  // ------------------------------------------------------------
  return (
    <Container className="my-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="h4 fw-bold text-capitalize">{language} — Assessment</h1>
        </Col>
        <Col xs="auto">
          <Link to={`/learn/${language}`} className="btn btn-outline-secondary">
            Back to Overview
          </Link>
        </Col>
      </Row>

      <Card className="shadow-sm mb-4 p-3">
        <Card.Body>
          <div className="mt-2 mb-4">
            <h2 className="h5 fw-bold text-capitalize">{language} Final Exam</h2>
            <p>
              Answer all questions carefully. Passing score:{" "}
              <span className="fw-bold text-primary">70%</span>
            </p>
          </div>

          {questions.length > 0 ? (
            questions.map((q, index) => (
              <QuesCard
                key={q.id}
                index={index}
                question={q}
                selected={answers[q.id]}
                onSelect={handleSelect}
                selectedAnswerArr={answers}
                isSubmmited={submitted}
                canEditAnswer={canEdit}
              />
            ))
          ) : (
            <p className="text-danger">No questions available for this quiz.</p>
          )}
        </Card.Body>
      </Card>

      <Button
        variant="primary"
        size="lg"
        className="w-100"
        onClick={handleSubmit}
        disabled={submitted && !canEdit}
      >
        Submit Exam
      </Button>
    </Container>
  );
}

export default Quiz;
