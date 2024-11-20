import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faPlay, faPlus, faEdit, faCoins, faMoneyBill, faMoneyBills, faCancel, faLock } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/esm/Col';

export default function BurnHeader() {
    return (
        <div className="container py-4 py-md-6">
            <div className="row mb-4">
                <Col md={12} className="text-center">
                    <h2 className="display-2">Queimando tokens WB3</h2>
                    <p className="lead">WB3 (Wrapped B3 ou B3 empacotados)</p>
                </Col>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 col-xl-3 mb-4">
                    <div className="lc-block text-center ">
                        <div className="lc-block rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4 bg-light bg-light" style={{ width: "72px", height: "72px" }}>
                            <span className="text-success"><FontAwesomeIcon icon={faEdit} fixedWidth size="2x" /></span>
                        </div>
                        <div className="lc-block">
                            <div className="rich">
                                <h5 className="">Preencha o form</h5>
                                <p className="text-muted">Preencha a ordem de compra ao lado, abrirá sua metamask e você deverá bloquear a quantidade de BUSD no contrato.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3 mb-4">
                    <div className="lc-block text-center ">
                        <div className="lc-block rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4 bg-light" style={{ width: "72px", height: "72px" }}>
                            <span className="text-info"><FontAwesomeIcon icon={faCoins} fixedWidth size="2x" /></span>
                        </div>
                        <div className="lc-block">
                            <div>
                                <h5 className="">Compra na B3</h5>
                                <p className="text-muted">Depois que os BUSD forem bloqueados no contrato inteligente, o sistema irá emitir uma ordem de compra na B3.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3 mb-4">
                    <div className="lc-block text-center ">
                        <div className="lc-block rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4 bg-light" style={{ width: "72px", height: "72px" }}>
                            <span className="text-danger"><FontAwesomeIcon icon={faMoneyBills} fixedWidth size="2x" /></span>
                        </div>
                        <div className="lc-block">
                            <div>
                                <h5 className="">Saque seus Token</h5>
                                <p className="text-muted">Caso a ordem de venda seja executada, os tokens serão bloqueados no contrato, junto qualquer valor que sobrar.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-xl-3 mb-4">
                    <div className="lc-block text-center ">
                        <div className="lc-block rounded-circle d-flex justify-content-center align-items-center mx-auto mb-4 bg-light" style={{ width: "72px", height: "72px" }}>
                            <span className="text-primary"><FontAwesomeIcon icon={faLock} fixedWidth size="2x" /></span>
                        </div>
                        <div className="lc-block">
                            <div>
                                <h5 className="">Tudo com segurança</h5>
                                <p className="text-muted">Se a ordem de compra não for executada, receba todo o seu dinheiro, sem taxas. Garantido pela segurança da blockchain.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}