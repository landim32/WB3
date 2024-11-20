import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Menu from "./Components/Menu";
import ContextBuilder from './Contexts/Utils/ContextBuilder';
import AuthProvider from './Contexts/Auth/AuthProvider';
import GehrProvider from './Contexts/Gehr/GehrProvider';
import PatientPage from './Pages/PatientPage';
import PatientListPage from './Pages/PatientListPage';
import AgendaPage from './Pages/AgendaPage';
import HomePage from './Pages/HomePage';
import Container from 'react-bootstrap/esm/Container';
import MintPage from './Pages/MintPage';
import Footer from './Components/Footer';
import BurnPage from './Pages/BurnPage';
import OrderBookPage from './Pages/OrderBookPage';

function Error404() {
  return (
    <Container>
      <h2>Error 404</h2>
    </Container>
  );
}

function Layout() {
  return (
    <div>
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  const ContextContainer = ContextBuilder([AuthProvider, GehrProvider]);

  return (
    <ContextContainer>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/mint" element={<MintPage />} />
          <Route path="/burn" element={<BurnPage />} />
          <Route path="/order-book">
            <Route index element={<OrderBookPage />} />
            <Route path=":asset" element={<OrderBookPage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </ContextContainer>
  );
}

export default App;
