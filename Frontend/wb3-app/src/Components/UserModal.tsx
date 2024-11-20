import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

interface IUserModalParam {
    showModal: boolean;
    publicAddress: string;
    name: string;
    onClose: () => void;
    onSave: (name: string) => void;
};

export default function UserModal(param: IUserModalParam) {

    //const [showModal, setShowModal] = useState<boolean>(param.showModal);
    //const [publicAddress, setPublicAddress] = useState<string>(param.publicAddress);
    const [_name, _setName] = useState<string>(param.name);

    return (
        <Modal
        show={param.showModal}
        size="lg"
        onHide={param.onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" className="readonly" readOnly={true} value={param.publicAddress} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" value={_name} onChange={(e) => {
                _setName(e.target.value);
              }} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={param.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            param.onSave(_name);
          }}>Confirm Change</Button>
        </Modal.Footer>
      </Modal>
    );
}