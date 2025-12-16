import { Button, Form, Modal } from "react-bootstrap";

const UploadResume = ( props ) => {
  const { onHide } = props;

  const handleSave = () => {}

  return (
    <Modal
     {...props} 
     centered>
      <Modal.Header closeButton >
        <Modal.Title>Upload Resume</Modal.Title>
      </Modal.Header>

      <Modal.Body centered>
        <div className="p-5 justify-centent-center align-items-center">
           <h4 className="mb-3">Upload your Resume</h4>
        <Form.Control type="file" size="sm"/>
        </div>
      </Modal.Body>

      <Modal.Footer>
         <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );

}

export default UploadResume;