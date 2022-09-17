import ReactDOM from "react-dom/client";
//import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Layout from "./pages/Layout";
import FormSignup from './pages/FormSignup'
//import Home from './pages/Login'
import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <FormSignup /> 
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Layout />}>
    //       <Route index element={<Home />} />
    //       <Route path="formsignup" element={<FormSignup />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


