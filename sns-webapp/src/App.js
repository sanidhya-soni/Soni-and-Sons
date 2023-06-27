import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPg from "./components/LoginPg";
import SignupPg from "./components/SignupPg";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPg />}></Route>
        <Route path="/signup" exact element={<SignupPg />} />
        <Route path="/login" exact element={<LoginPg />} />
      </Routes>
    </>
  );
}

export default App;
