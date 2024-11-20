import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { faTextWidth, faWarning } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faSquareTwitter, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";

export default function Footer() {

    let navigate = useNavigate();

    return (
        <>
            <footer className="bg-dark text-light">
                <Container className="py-5">
                    <Row>
                        <Col md={3}>
                            <div className="lc-block small">
                                <div>
                                    <p>WB3 é uma iniciativa revolucionária que conecta o mercado de ações brasileiro ao ecossistema blockchain.</p>
                                </div>
                            </div>
                            <div className="lc-block py-2">
                                <a className="text-decoration-none" href="#">
                                    <FontAwesomeIcon icon={faFacebook} size="2x" fixedWidth />
                                </a>
                                <a className="text-decoration-none" href="#">
                                    <FontAwesomeIcon icon={faTwitter} size="2x" fixedWidth />
                                </a>
                                <a className="text-decoration-none" href="#">
                                    <FontAwesomeIcon icon={faInstagram} size="2x" fixedWidth />
                                </a>
                            </div>

                        </Col>
                        <Col md={2} className="offset-md-1">
                            <div className="lc-block mb-4">
                                <div>
                                    <h4>Home</h4>
                                </div>
                            </div>
                            <div className="lc-block small">
                                <div>
                                    <p>Criação de Tokens</p>
                                    <p>Visão Geral</p>
                                    <p>Dividendos</p>
                                </div>
                            </div>
                        </Col>
                        <div className="col-lg-2 offset-lg-1">
                            <div className="lc-block mb-4">
                                <div>
                                    <h4>Negociações</h4>
                                </div>
                            </div>
                            <div className="lc-block small">
                                <div>
                                    <p><a href="#" onClick={() => navigate("/mint")}>Mint</a></p>
                                    <p><a href="#" onClick={() => navigate("/burn")}>Burn</a></p>
                                    <p><a href="#">Livro de ofertas</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 offset-lg-1">
                            <div className="lc-block mb-4">
                                <div>
                                    <h4>Smarts Contracts</h4>
                                </div>
                            </div>
                            <div className="lc-block small">
                                <div>
                                    <p>Mint & Burn</p>
                                    <p>Order Book</p>
                                    <p>BUSD</p>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
                <Container className="py-5">
                    <Row>
                        <Col md={6} className="small">
                            <div className="lc-block">
                                <div>
                                    <p>Copyright © WB3 2024</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={6} className="text-end small">
                            <div className="lc-block">
                                <div>
                                    <p>Todos os direitos reservados</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}