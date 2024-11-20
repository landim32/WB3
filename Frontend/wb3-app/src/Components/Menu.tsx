import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../Contexts/Auth/AuthContext';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons/faWarning';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons/faCircleUser';
import { faPencil } from '@fortawesome/free-solid-svg-icons/faPencil';
import { faClose } from '@fortawesome/free-solid-svg-icons/faClose';
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faCoins, faFileMedical, faFire, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import UserModal from './UserModal';
import { useNavigate } from "react-router-dom";

export default function Menu() {

  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  //const [_name, setName] = useState<string>("");

  let navigate = useNavigate();

  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUserSession();
    console.log("Session: ", JSON.stringify(authContext.sessionInfo));
  }, []);
  return (
    <>
      <UserModal
        showModal={showModal}
        name={authContext.sessionInfo?.name}
        publicAddress={authContext.sessionInfo?.publicAddress}
        onSave={(name) => {
          if (name) {
            let userSession = authContext.sessionInfo;
            userSession.name = name;
            authContext.setSessionInfo(userSession);
            setShowModal(false);
          }
          else {
            alert("Name cant be empty!");
          }
        }}
        onClose={() => {
          setShowModal(false);
        }}
      ></UserModal>
      <Navbar expand="lg" className="navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="/">WB3</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {authContext.sessionInfo &&
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className='nav-link' to="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</Link>
                <Link className='nav-link' to="/mint"><FontAwesomeIcon icon={faPlus} fixedWidth /> Mint</Link>
                <Link className='nav-link' to="/burn"><FontAwesomeIcon icon={faFire} fixedWidth /> Burn</Link>
                <Link className='nav-link' to="/order-book"><FontAwesomeIcon icon={faCoins} fixedWidth /> Comprar & Vender</Link>
              </Nav>
            </Navbar.Collapse>
          }
          <Navbar.Collapse>
            <Nav className="ms-auto justify-content-end">
              <Nav.Link href='https://metamask.io/download/' target='_blank'>Install Metamask</Nav.Link>
              {
                authContext.sessionInfo ?
                  <NavDropdown title={
                    <>
                      <FontAwesomeIcon icon={faCircleUser} />&nbsp;
                      <span>{authContext.sessionInfo.name}</span>
                    </>
                  } id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={async () => {
                      //setName(authContext.sessionInfo?.name);
                      setShowModal(true);
                    }}><FontAwesomeIcon icon={faPencil} fixedWidth /> Change Account</NavDropdown.Item>
                    <NavDropdown.Item onClick={async () => {
                      let ret = authContext.logout();
                      if (!ret.sucesso) {
                        alert(ret.mensagemErro);
                      }
                      navigate(0);
                    }}><FontAwesomeIcon icon={faClose} fixedWidth /> Logout</NavDropdown.Item>
                  </NavDropdown>
                  :
                  <Nav.Item><Button variant="danger" onClick={async () => {
                    var ret = await authContext.login();
                    if (!ret.sucesso) {
                      alert(ret.mensagemErro);
                    }
                  }}>Connect</Button></Nav.Item>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
