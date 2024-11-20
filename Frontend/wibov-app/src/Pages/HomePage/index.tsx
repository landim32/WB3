import { useContext, useState } from "react";
import AuthContext from "../../Contexts/Auth/AuthContext";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faPlus, faBurn, faFire, faSearch, faDollar, faClock } from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import MintHeader from "../MintPage/MintHeader";


export default function HomePage() {

    const authContext = useContext(AuthContext);

    let navigate = useNavigate();

    return (
        <>
            <div className="container py-5 my-4 bg-light text-dark text-center">
                <div className="row justify-content-center mb-4">

                    <div className="lc-block col-xl-8">
                        <h1 className="display-2 fw-bold">
                            Ações da B3 <span className="text-danger">tokenizadas</span> com segurança, transparência e negociação 24/7.
                        </h1>
                    </div>

                </div>
                <div className="row justify-content-center mb-4">

                    <div className="lc-block col-xl-6 lh-lg">
                        <div>
                            <p>&nbsp;WB3 é uma iniciativa revolucionária que conecta o mercado de ações brasileiro ao ecossistema blockchain.
                                Transforme ações da Bovespa em tokens digitais negociáveis globalmente e sem limitações de horário.
                            </p>
                        </div>
                    </div>

                </div>
                <div className="row pb-4">
                    <div className="col-md-12">
                        <div className="lc-block d-grid gap-3 d-md-block">
                            <Button variant="success" size="lg" className="me-md-2" onClick={() => {
                                navigate("/mint");
                            }}><FontAwesomeIcon icon={faPlus} fixedWidth />Mint</Button>
                            <Button variant="danger" size="lg" onClick={() => {
                                navigate("/burn");
                            }}><FontAwesomeIcon icon={faFire} fixedWidth />Burn</Button>
                        </div>
                    </div>
                </div>
            </div>
            <section id="overview" className="py-5">
                <MintHeader />
            </section>
            <section id="how-it-works" className="bg-light py-5">
                <Container fluid>
                    <Row className="mb-4">
                        <Col md={12} className="text-center">
                            <h4 className="display-2 mb-0">Visão Geral do Projeto</h4>
                        </Col>
                    </Row>
                    <div className="row row-cols-1 row-cols-lg-3 justify-content-center py-6">
                        <div className="col lc_border_lg w-auto ">
                            <div className="lc-block">
                                <div className="lc-block card border-0 bg-transparent">
                                    <div className="card-body">
                                        <div className="d-flex px-1 px-lg-3 ">
                                            <div className="lc-block">
                                                <FontAwesomeIcon icon={faSearch} size="2x" />
                                            </div>
                                            <div className="ps-2 ps-md-3">
                                                <div className="lc-block">
                                                    <h3 className="rfs-6">TRANSPARÊNCIA</h3>
                                                    <p className="text-muted rfs-4">Smarts Contracts são públicos e abertos</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col lc_border_lg w-auto">
                            <div className="lc-block card border-0 bg-transparent">
                                <div className="card-body">
                                    <div className="d-flex px-1 px-lg-3 ">
                                        <div className="lc-block">
                                            <FontAwesomeIcon icon={faDollar} size="2x" />
                                        </div>
                                        <div className="ps-2 ps-md-3">
                                            <div className="lc-block">

                                                <h3 className="rfs-6">NEGOCIAÇÃO GARANTIDA</h3>
                                                <p className="text-muted rfs-4">Smarts Contracts garantem o seu dinheiro</p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col w-auto">

                            <div className="lc-block  card border-0 bg-transparent">
                                <div className="card-body">
                                    <div className="d-flex px-1 px-lg-3 ">
                                        <div className="lc-block">
                                            <FontAwesomeIcon icon={faClock} size="2x" />
                                        </div>
                                        <div className="ps-2 ps-md-3">
                                            <div className="lc-block">

                                                <h3 className="rfs-6">ALTA DISPONIBILIDADE</h3>
                                                <p className="text-muted rfs-4">24/7 disponível para negociação</p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Container>
            </section>
            <section id="dividends" className="py-5">
                <Container>
                    <Row className="mb-4">
                        <Col md={12} className="text-center">
                            <h4 className="display-2 mb-0">Dividendos</h4>
                            <p className="lead">Os investidores WB3 participam automaticamente dos dividendos gerados pelos ativos empacotados.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-4">
                            <div className="lc-block text-center rounded shadow text-primary bg-light px-4 py-5" style={{ minHeight: "50vh" }}>
                                <FontAwesomeIcon icon={faWarning} size="3x" />
                                <h4 className="mt-3 mb-4">Reinvestimento Automático</h4>
                                <p>Todo dia 1º de cada mês, dividendos são usados para comprar novos ativos.</p>
                            </div>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="lc-block text-center rounded shadow text-light px-4 py-5 bg-primary" style={{ minHeight: "50vh" }}>
                                <FontAwesomeIcon icon={faWarning} size="3x" />
                                <h4 className="mt-3 mb-4">Distribuição Proporcional</h4>
                                <p>Tokens são distribuídos conforme a proporção de tokens WB3 detidos.</p>
                            </div>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="lc-block text-center rounded shadow text-primary bg-light px-4 py-5" style={{ minHeight: "50vh" }}>
                                <FontAwesomeIcon icon={faWarning} size="3x" />
                                <h4 className="mt-3 mb-4">Benefícios</h4>
                                <p>Crescimento contínuo dos investimentos sem ação manual necessária.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id="roadmap" className="bg-light py-5">
                <Container>
                    <Row className="text-center justify-content-center mb-5">
                        <Col xp={6} lg={8}>
                            <h2 className="display-2 mb-0">Roadmap</h2>
                            <p className="text-muted">Expansão com integração a exchanges descentralizadas e parcerias com corretoras.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="timeline-steps aos-init aos-animate" data-aos="fade-up">
                                <div className="timeline-step">
                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2003">
                                        <div className="inner-circle"></div>
                                        <p className="h6 mt-3 mb-1">2023</p>
                                        <p className="h6 text-muted mb-0 mb-lg-0">Whitepaper</p>
                                    </div>
                                </div>
                                <div className="timeline-step">
                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2004">
                                        <div className="inner-circle"></div>
                                        <p className="h6 mt-3 mb-1">2024</p>
                                        <p className="h6 text-muted mb-0 mb-lg-0">Testnet</p>
                                    </div>
                                </div>
                                <div className="timeline-step">
                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2005">
                                        <div className="inner-circle"></div>
                                        <p className="h6 mt-3 mb-1">2025</p>
                                        <p className="h6 text-muted mb-0 mb-lg-0">Mainnet & +Ativos</p>
                                    </div>
                                </div>
                                <div className="timeline-step">
                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2010">
                                        <div className="inner-circle"></div>
                                        <p className="h6 mt-3 mb-1">2026</p>
                                        <p className="h6 text-muted mb-0 mb-lg-0">Novos Mercados</p>
                                    </div>
                                </div>
                                <div className="timeline-step mb-0">
                                    <div className="timeline-content" data-toggle="popover" data-trigger="hover" data-placement="top" title="" data-content="And here's some amazing content. It's very engaging. Right?" data-original-title="2020">
                                        <div className="inner-circle"></div>
                                        <p className="h6 mt-3 mb-1">2027</p>
                                        <p className="h6 text-muted mb-0 mb-lg-0">Quem sabe?</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );

}