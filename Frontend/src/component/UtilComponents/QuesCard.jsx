import React from "react";
import { Card, Form } from "react-bootstrap";

function QuesCard({
  question,
  selected,
  onSelect,
  index,
  selectedAnswerArr,
  isSubmmited,
  canEditAnswer
}) {
  const isCorrect = selectedAnswerArr[question.id] === question.correct;

  return (
    <Card className="mb-4 shadow-sm border-0 rounded-4">
      <Card.Body>
        <Card.Title className="fw-semibold mb-3"> {index + 1}. {question.question} </Card.Title>

        <Form>
          {question.options.map((opt, idx) => {
            const isOptionCorrect = isSubmmited && opt === question.correct;
            const isOptionWrong =
              isSubmmited && opt === selected && opt !== question.correct;

            return (
              <div
                key={idx}
                className={`p-2 px-3 rounded mb-2 ${
                  isOptionCorrect
                    ? "bg-success bg-opacity-10 border border-success"
                    : isOptionWrong
                    ? "bg-danger bg-opacity-10 border border-danger"
                    : "border border-light"
                }`}
              >
                <Form.Check
                  type="radio"
                  label={
                    <span
                      className={`${
                        isOptionCorrect
                          ? "text-success fw-semibold"
                          : isOptionWrong
                          ? "text-danger fw-semibold"
                          : ""
                      }`}
                    >
                      {opt}
                    </span>
                  }
                  name={`question-${question.id}`}
                  checked={selected === opt}
                  onChange={() => onSelect(question.id, opt)}
                  disabled={canEditAnswer || isSubmmited}
                />
              </div>
            );
          })}
        </Form>

        {isSubmmited && (
          <div className="mt-3 p-2 rounded bg-light">
            {isCorrect ? (
              <p className="text-success fw-semibold mb-0">
                ✅ Well done! Correct Answer: {question.correct}
              </p>
            ) : (
              <p className="text-danger fw-semibold mb-0">
                ❌ Correct Answer: {question.correct}
              </p>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default QuesCard;
