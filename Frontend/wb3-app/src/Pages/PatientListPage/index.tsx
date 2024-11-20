import { useContext, useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import GehrContext from "../../Contexts/Gehr/GehrContext";
import AuthContext from "../../Contexts/Auth/AuthContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons/faStopwatch';
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faHeadSideCough } from '@fortawesome/free-solid-svg-icons/faHeadSideCough';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons/faPlusSquare';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import PatientModal from "../../Components/PatientModal";
import ErrorToast from "../../Components/ErrorToast";

export default function PatientListPage() {

    const authContext = useContext(AuthContext);
    const gehrContext = useContext(GehrContext);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>("");

    const throwError = (message: string) => {
        setMessageError(message);
        setShowError(true);
    }; 

    return (
        <>
            <ErrorToast 
                showError={showError} 
                messageError={messageError} 
                onClose={() => setShowError(false)}
            ></ErrorToast>
            <PatientModal
                showModal={showModal}
                insertMode={false}
                name={gehrContext.currentPatient?.name}
                email={gehrContext.currentPatient?.email}
                birthday={gehrContext.currentPatient?.birthday}
                loading={gehrContext.loadingChangePacient}
                onSave={(name) => {
                    /*
                    if (name) {
                      let userSession = authContext.sessionInfo;
                      userSession.name = name;
                      authContext.setSessionInfo(userSession);
                      setShowModal(false);
                    }
                    else {
                      alert("Name cant be empty!");
                    }
                      */
                }}
                onClose={() => {
                    setShowModal(false);
                }}
            ></PatientModal>
        <Container>
            <h3 className="mb-3"><FontAwesomeIcon icon={faPlusSquare} /> My Patients</h3>
            <Row>
                <Col md="3">
                    <Card className="mb-3">
                        <Card.Body className="text-center">
                            <FontAwesomeIcon size="7x" icon={faCircleUser} />
                            <Card.Title>Rodrigo Landim Carneiro</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Age: 46 years</Card.Subtitle>
                            <Card.Text>
                                First service in 10/11/2024, 8 Health Records and 3 faults
                            </Card.Text>
                            <Card.Text>
                                <Badge bg="danger">New</Badge>
                            </Card.Text>
                            <Card.Link href="#" onClick={() => {
                                setShowModal(true);
                            }}><FontAwesomeIcon icon={faPen} /> Edit</Card.Link>
                            <Card.Link href="/patients/0x18ED21c516205582a3CFBeaA89FbE229e0948981"><FontAwesomeIcon icon={faHeadSideCough} /> Records</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}