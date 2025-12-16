import { Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateLinks } from "../../../Services/ProfileServices";

function AddLinks(props) {
  const { onHide, data = [] } = props;

  const platforms = [
    { title: "LinkedIn", icon: "bi bi-linkedin", placeholder: "https://www.linkedin.com/in/" },
    { title: "GitHub", icon: "bi bi-github", placeholder: "https://github.com/" },
    { title: "Portfolio", icon: "bi bi-globe2", placeholder: "https://your-portfolio.com/" }
  ];

  const [links, setLinks] = useState([]);

  // Load initial data from backend
  useEffect(() => {
    const cleanedData = data.map((item) => ({
      title : item.title,
      link: item.link
    }))
    setLinks(cleanedData);  
  }, [data]);

  // Update an item in array
  const handleChange = (platform, value) => {
    setLinks((prev) => {
      const updated = [...prev];

      const index = updated.findIndex((x) => x.title.toLowerCase() === platform.toLowerCase());

      if (index !== -1) {
        updated[index].link = value;
      } else {
        updated.push({ title: platform, link: value });
      }

      return updated;
    });
  };

  const getValue = (title) => {
    const found = links.find((x) => x.title.toLowerCase() === title.toLowerCase());
    return found ? found.link : "";
  };

  const handleSave = async () => { 
  // Get all links that are not empty
  const dbData = links.filter(x => x.link && x.link.trim() !== "");

  if (dbData.length === 0) {
    return;
  }

  await updateLinks(dbData);
  onHide();
};

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Links</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4">
        {platforms.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="d-flex gap-2 mb-1">
              <i className={`${item.icon} fs-5`} />
              <label className="fw-semibold">{item.title}</label>
            </div>

            <Form.Control
              type="url"
              placeholder={item.placeholder}
              value={getValue(item.title)}
              onChange={(e) => handleChange(item.title, e.target.value)}
            />
          </div>
        ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddLinks;
