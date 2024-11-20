import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faPlay, faPlus, faEdit, faCoins, faMoneyBill, faMoneyBills, faCancel, faBurn, faFire } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import BurnHeader from "./BurnHeader";
import BurnText from "./BurnText";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";


export default function BurnPage() {

    const [show, setShow] = useState(true);

    return (
        <>
            <div className="mb-3"></div>
            <Container>
                <Row>
                    <Col md={12}>
                        <Alert key="danger" variant="danger" onClose={() => setShow(false)} dismissible>
                            <FontAwesomeIcon icon={faWarning} /> This app is using the <strong>TestNet Network</strong>. Coins have no value here!
                        </Alert>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={8}>
                        <BurnHeader />
                        <BurnText />
                    </Col>
                    <Col md={4}>
                        <Card className="mb-3">
                            <Card.Header>
                                <Card.Title>Queimar tokens</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Ativo:</Form.Label>
                                        <Col sm="8">
                                            <Form.Select>
                                                <option value="WPETR4">WPETR4</option>
                                                <option value="WVALE3">WVALE3</option>
                                                <option value="WVALE3">WABEV3</option>
                                            </Form.Select>
                                            <Form.Text>Ex: WPETR4, WVALE3, WABEV3, etc</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Preço venda (BRL):</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="number" placeholder="0,00" style={{ textAlign: "right" }} />
                                            <Form.Text>Preço de ordem de venda na B3</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Data Limite:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="date" placeholder="dd/mm/yyyy" style={{ textAlign: "right" }} />
                                            <Form.Text>Data limite para a ordem ser executada</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Quantidade:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="number" placeholder="0,00" value={100} style={{ textAlign: "right" }} />
                                            <Form.Text>Quantidade de ativos</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="4">Total em BUSD:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="number" disabled={true} style={{ textAlign: "right" }} value={0} />
                                            <Form.Text>Valor total em BUSD</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="danger" size="lg"><FontAwesomeIcon icon={faFire} /> Queimar Tokens</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}