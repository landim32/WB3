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
import { faStopwatch, faClock, faPlay, faCircleUser, faPlus, faPlusSquare, faPrint, faShare, faPen, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import PatientModal from "../../Components/PatientModal";
import { useParams } from "react-router-dom";
import RecordModal from "../../Components/RecordModal";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PatientInfo from "../../DTO/Domain/PatientInfo";
import ErrorToast from "../../Components/ErrorToast";
import RecordInfo from "../../DTO/Domain/RecordInfo";

export default function PatientPage() {

    let { address } = useParams();

    const authContext = useContext(AuthContext);
    const gehrContext = useContext(GehrContext);

    const [insertPatient, setInsertPatient] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showRecordModal, setShowRecordModal] = useState<boolean>(false);

    const [showError, setShowError] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>("");

    const throwError = (message: string) => {
        setMessageError(message);
        setShowError(true);
    }; 

    useEffect(() => {
        //authContext.loadUserSession();
        //console.log("authContext.sessionInfo: ", authContext.sessionInfo);
        if (authContext.sessionInfo) {
            let _addr = address;
            if (!_addr) {
                _addr = authContext.sessionInfo?.publicAddress;
            }
            gehrContext.loadPatient(_addr).then((ret) => {
                if (ret.sucesso) {
                    gehrContext.listRecords(_addr).then((retRec) => {
                        if (!retRec.sucesso) {
                            throwError(retRec.mensagemErro);
                        }
                    });
                }
                else {
                    throwError(ret.mensagemErro);
                    setInsertPatient(true);
                    setShowModal(true);
                }
            });
        }
        //let userSession = authContext.sessionInfo;
        //await gehrContext.loadPatient(userSession.publicAddress);
    }, []);

    return (
        <>
            <ErrorToast 
                showError={showError} 
                messageError={messageError} 
                onClose={() => setShowError(false)}
            ></ErrorToast>
            <PatientModal
                showModal={showModal}
                insertMode={insertPatient}
                name={gehrContext.currentPatient?.name}
                email={gehrContext.currentPatient?.email}
                birthday={gehrContext.currentPatient?.birthday}
                loading={gehrContext.loadingChangePacient}
                onSave={async (insertMode, name, email, birthday, tags) => {
                    let _patient: PatientInfo;
                    if (insertMode) {
                        let ret = await gehrContext.createPatient({
                            ..._patient,
                            name: name,
                            email: email,
                            birthday: birthday,
                            tags: tags
                        });
                        if (ret.sucesso) {
                            setShowModal(false);
                        }
                        else {
                            throwError(ret.mensagemErro);
                            setShowModal(false);
                        }
                    }
                    else {
                        if (authContext.sessionInfo) {
                            let _addr = address;
                            if (!_addr) {
                                _addr = authContext.sessionInfo?.publicAddress;
                            }
                            let ret = await gehrContext.changePatient({
                                ..._patient,
                                owner: _addr,
                                name: name,
                                email: email,
                                birthday: birthday,
                                tags: tags
                            });
                            if (ret.sucesso) {
                                setShowModal(false);
                            }
                            else {
                                throwError(ret.mensagemErro);
                                setShowModal(false);
                            }
                        }
                    }
                }}
                onClose={() => {
                    setShowModal(false);
                }}
            ></PatientModal>
            <RecordModal
                showModal={showRecordModal}
                patientName={gehrContext.currentPatient?.name}
                recordType={gehrContext.currentRecord?.recordType}
                agendaAt={gehrContext.currentRecord?.agendaAt}
                loading={gehrContext.loadingInsertRecord}
                onSave={async (recordType, agendaAt, data) => {
                    let rec: RecordInfo;
                    let _addr = address;
                    if (!_addr) {
                        _addr = authContext.sessionInfo?.publicAddress;
                    }
                    let ret = await gehrContext.addRecord({
                        ...rec,
                        ownerAddr: _addr,
                        operatorAddr: authContext.sessionInfo.publicAddress,
                        operatorInfo: authContext.sessionInfo.name,
                        recordType: recordType,
                        agendaAt: agendaAt,
                        data: data,
                    });
                    console.log("ret: ", JSON.stringify(ret, (key, value) =>
                        typeof value === 'bigint'
                            ? value.toString()
                            : value // return everything else unchanged
                    ));
                    if (ret.sucesso) {
                        setShowRecordModal(false);
                    }
                    else {
                        throwError(ret.mensagemErro);
                        setShowRecordModal(false);
                    }
                }}
                onClose={() => {
                    setShowRecordModal(false);
                }}
            ></RecordModal>
            <Container>
                <Row>
                    <Col md="3">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Service Duration</Card.Title>
                                <Card>
                                    <Card.Body>
                                        <h1 className="text-center">
                                            <FontAwesomeIcon icon={faStopwatch} />&nbsp;00:00:00
                                        </h1>
                                        <div className="d-grid gap-2">
                                            <Button variant="primary"><FontAwesomeIcon icon={faPlay} /> Start Service</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="9">
                        <h3><FontAwesomeIcon icon={faPlusSquare} /> Health Records</h3>
                        <Card className="mb-3">
                            <Card.Body>
                                <Row>
                                    <Col md="2">
                                        <FontAwesomeIcon size="7x" icon={faCircleUser} />
                                    </Col>
                                    <Col md="7">
                                        <h5>{!gehrContext.loadingPatient ? gehrContext.currentPatient?.name : <Skeleton></Skeleton>}</h5>
                                        <div>
                                            <span>{!gehrContext.loadingPatient ? "Age: " + gehrContext.currentPatient?.birthday : <Skeleton></Skeleton>}</span>
                                        </div>
                                        <div>
                                            <span>{!gehrContext.loadingPatient ? "First service in: " + gehrContext.currentPatient?.addedAt : <Skeleton></Skeleton>}</span>
                                        </div>
                                        {!gehrContext.loadingPatient ?
                                            <>
                                                <Badge bg="danger">New</Badge>
                                                &nbsp;
                                                <a href="#" onClick={() => { }}>+New Tag</a>
                                            </>
                                            :
                                            <Skeleton></Skeleton>
                                        }
                                    </Col>
                                    <Col md="3">
                                        <Button variant="primary" size="sm" className="float-end" onClick={() => {
                                            setInsertPatient(false);
                                            setShowModal(true);
                                        }}><FontAwesomeIcon icon={faPen} /> Edit Info</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Row>
                            <Col md="12" className="text-end">
                                <Button variant="primary" size="sm" onClick={() => {
                                    setShowRecordModal(true);
                                }}><FontAwesomeIcon icon={faPlus} /> Add Record</Button>&nbsp;
                                <Button variant="success" size="sm"><FontAwesomeIcon icon={faShare} /> Share</Button>&nbsp;
                                <Button variant="danger" size="sm"><FontAwesomeIcon icon={faPrint} /> Print</Button>
                            </Col>
                        </Row>
                        {gehrContext.recordList && gehrContext.recordList.map((record) => {
                            return (
                                <Row className="mb-3">
                                <Col md="12">
                                    <p className="calendar">
                                        11<em>November</em>
                                    </p>
                                    <Card className="mb-3" style={{ marginTop: '8px' }}>
                                        <Card.Header>
                                            <Card.Title>
                                                <Row>
                                                    <Col md="9">By: {record.operatorInfo} <Badge bg="info">Annotation</Badge></Col>
                                                    <Col md="3" className="text-end"><FontAwesomeIcon icon={faClock} /> 10:00</Col>
                                                </Row>
                                            </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <p>{record.data}</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
            {
                /*
            :
            <Container>
                <Row>
                    <Col md="6" className='offset-md-3'>
                        <Card className="mb-3">
                            <Card.Body className="text-center">
                                <FontAwesomeIcon size="7x" icon={faCircleUser} />
                                {gehrContext.loadPatient ?
                                <Card.Text>
                                    <Skeleton count={2} />
                                </Card.Text>
                                :
                                <Card.Text>
                                    You don't have health records on the blockchain yet. <br />
                                    Do you want to tokenize your records?
                                </Card.Text>
                                }
                                <Button variant="primary"><FontAwesomeIcon icon={faCheck} /> Yes</Button>&nbsp;
                                <Button variant="danger"><FontAwesomeIcon icon={faClose} /> No</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            */
            }
        </>
    );
}