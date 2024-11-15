import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

interface IRecordModalParam {
  showModal: boolean;
  patientName?: string;
  recordType?: number;
  agendaAt?: number;
  data?: string;
  loading: boolean;
  onClose: () => void;
  onSave: (recordType: number, agendaAt: number, data: string) => void;
};

export default function RecordModal(param: IRecordModalParam) {

  const [_recordType, _setRecordType] = useState<number>(param.recordType);
  const [_agendaAt, _setAgendaAt] = useState<number>(param.agendaAt);
  const [_data, _setData] = useState<string>(param.data);

  return (
    <Modal
      show={param.showModal}
      size="lg"
      onHide={param.onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Patient:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={param.patientName} readOnly={true} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Record Type:
            </Form.Label>
            <Col sm="10">
              <Form.Select aria-label="Default select example" value={param.recordType} onChange={(e) => {
                _setRecordType(parseInt(e.target.value));
              }}>
                <option>--Select--</option>
                <option value="1">Annotation</option>
                <option value="2">Consultation</option>
                <option value="3">Exam</option>
                <option value="4">Surgery</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Agenda:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="dateime" value={_agendaAt} placeholder='dd/mm/yyyy' onChange={(e) => {
                _setAgendaAt(parseInt(e.target.value));
              }} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Information:
            </Form.Label>
            <Col sm="10">
              <Form.Control as="textarea" rows={5} value={_data} placeholder='your comments' onChange={(e) => {
                _setData(e.target.value);
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
        <Button variant="primary" disabled={param.loading} onClick={() => {
          param.onSave(_recordType, _agendaAt, _data);
        }}>Confirm Change</Button>
      </Modal.Footer>
    </Modal>
  );
}