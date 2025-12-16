import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownMenu,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import styles from "./AddEdu.module.css";
import { updateEduData } from "../../../Services/ProfileServices";

const AddEducation = (props) => {
  const { onHide, data = [] } = props;

  const [eduData, setEduData] = useState([]);
  const [courses, setCourses] = useState([]);

  const fields = [
    {
      key: "institute",
      label: "Institute",
      placeholder: "Howard University",
      type: "text",
      icon: "bi bi-mortarboard",
    },
    {
      key: "degree",
      label: "Degree",
      placeholder: "B.Tech / Other",
      type: "dropdown",
    },
    { key: "startDate", label: "Start Date", type: "date" },
    { key: "endDate", label: "End Date", type: "date" },
    {
      key: "cgpa",
      label: "CGPA",
      placeholder: "Enter your CGPA",
      type: "text",
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "https://yshivam7897.github.io/project/courses.json"
        );
        const json = await res.json();
        setCourses(json.courses || {});
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
    // setEduData(data[0]|| {}); 
  }, [data]);

  const handleOnchange = (key, value) => {
    setEduData((prev) => {
      const updated = { ...prev };

      updated[key] = value;

      return updated;
    });
  };

  const handleOnSubmit = async () => {
    await updateEduData(eduData);
    onHide(); 
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Education</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {fields.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex align-items-center gap-2 mb-1">
              <i className={`${item.icon} fs-5`} />
              <label className="fw-semibold">{item.label}</label>
            </div>

            {item.type === "dropdown" ? (
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="ex: B.E"
                  value={eduData.degree || ""}
                  onChange={(e) => handleOnchange("degree", e.target.value)}
                />

                <Dropdown>
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-split-basic"
                  />
                  <DropdownMenu className={styles["dropdown-menu"]}>
                    {courses.map((course, index) => (
                      <Dropdown.Item
                        key={index}
                        onClick={() => handleOnchange("degree", course.name)}
                      >
                        {course.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroup>
            ) : (
              <Form.Control
                type={item.type}
                placeholder={item.placeholder}
                value={eduData[item.key]}
                onChange={(e) => handleOnchange(item.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleOnSubmit()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEducation;