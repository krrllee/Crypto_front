import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import AddTransactionPage from "./pages/AddTransactionPage";


const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route  path="/"  element={<LoginPage/>} />
          <Route  path="/login" element={<LoginPage/>}/>
          <Route  path="/home"  element={<HomePage/>} />
          <Route  path="/register" element={<RegisterPage/>}/>
          <Route  path="/add" element={<AddTransactionPage/>}/>
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default Router;