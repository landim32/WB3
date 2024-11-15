import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

interface IUserModalParam {
  showModal: boolean;
  insertMode: boolean;
  name?: string;
  email?: string;
  birthday?: number;
  tags?: number;
  loading: boolean;
  onClose: () => void;
  onSave: (insertMode: boolean, name: string, email: string, birthday: number, tags: number) => void;
};

export default function PatientModal(param: IUserModalParam) {

  const [_name, _setName] = useState<string>(param.name);
  const [_email, _setEmail] = useState<string>(param.email);
  const [_birthday, _setBirthday] = useState<number>(param.birthday);
  const [_tags, _setTags] = useState<number>(param.tags);

  return (
    <Modal
      show={param.showModal}
      size="lg"
      onHide={param.onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Patient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {param.insertMode &&
            <Form.Text>
              You don't have health records on the blockchain yet. Fill in your details to tokenize them now.
            </Form.Text>
          }
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Name:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={_name} placeholder='Your name' onChange={(e) => {
                _setName(e.target.value);
              }} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Email:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" value={_email} placeholder='yourname@domain.com' onChange={(e) => {
                _setEmail(e.target.value);
              }} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Age:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="dateime" value={_birthday} placeholder='dd/mm/yyyy' onChange={(e) => {
                _setBirthday(parseInt(e.target.value));
              }} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {param.loading &&
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        }
        <Button variant="secondary" onClick={param.onClose}>
          Close
        </Button>
        <Button variant="primary" disabled={param.loading} onClick={(e) => {
          e.preventDefault();
          param.onSave(param.insertMode, _name, _email, _birthday, _tags);
        }}>Confirm Change</Button>
      </Modal.Footer>
    </Modal>
  );
}