import './App.css';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Menu from "./Components/Menu";
import ContextBuilder from './Contexts/Utils/ContextBuilder';
import AuthProvider from './Contexts/Auth/AuthProvider';
import GehrProvider from './Contexts/Gehr/GehrProvider';
import PatientPage from './Pages/PatientPage';
import PatientListPage from './Pages/PatientListPage';
import AgendaPage from './Pages/AgendaPage';

function Error404() {
  return (
    <div>
      <h2>Error 404</h2>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Menu />
      <Outlet />
    </div>
  );
}

function App() {
  const ContextContainer = ContextBuilder([AuthProvider, GehrProvider]);

  return (
    <ContextContainer>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PatientPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/my-records" element={<PatientPage />} />
          <Route path="/patients">
            <Route index element={<PatientListPage />} />
            <Route path=":address" element={<PatientPage />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </ContextContainer>
  );
}

export default App;
