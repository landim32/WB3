import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faPlay, faPlus, faEdit, faCoins, faMoneyBill, faMoneyBills, faCancel } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";



export default function OrderBookPage() {

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
                    <Col md={9} style={{ paddingBottom: "40px", minHeight: "650px" }}>
                        <AdvancedRealTimeChart
                            symbol="BMFBOVESPA:PETR4"
                            locale="br"
                            allow_symbol_change={false}
                            save_image={false}
                            autosize
                        ></AdvancedRealTimeChart>
                    </Col>
                    <Col md={3}>
                        <Card className="mb-3">
                            <Card.Header>
                                <Card.Title>Ordem</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Tipo:</Form.Label>
                                        <Col sm="8">
                                            <ButtonGroup>
                                                <ToggleButton
                                                    //key={idx}
                                                    id="radioComprar"
                                                    type="radio"
                                                    variant='outline-success'
                                                    name="radio"
                                                    value="buy"
                                                    checked={true}
                                                //onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                >Comprar</ToggleButton>
                                                <ToggleButton
                                                    //key={idx}
                                                    id="radioVender"
                                                    type="radio"
                                                    variant='outline-danger'
                                                    name="radio"
                                                    value="buy"
                                                    checked={true}
                                                //onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                >Vender</ToggleButton>
                                            </ButtonGroup>
                                            <Form.Text>Tipo de ordem</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Ativo:</Form.Label>
                                        <Col sm="8">
                                            <Form.Select>
                                                <option value="WPETR4">WPETR4</option>
                                                <option value="WVALE3">WVALE3</option>
                                                <option value="WVALE3">WABEV3</option>
                                            </Form.Select>
                                            <Form.Text>Ex: WPETR4, WVALE3, etc</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Preço:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="number" placeholder="0,00" style={{ textAlign: "right" }} />
                                            <Form.Text>Preço de ordem</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Qtde:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="number" placeholder="0,00" value={100} style={{ textAlign: "right" }} />
                                            <Form.Text>Quantidade de ativos</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="4">BUSD:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="number" disabled={true} style={{ textAlign: "right" }} value={0} />
                                            <Form.Text>Valor total em BUSD</Form.Text>
                                        </Col>
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" size="lg">Executar</Button>
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