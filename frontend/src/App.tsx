// import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./context/AuthProvider";
import Private from "./Private";
import Employee from "./components/Employee";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";

const NotFound = () => {
  return (
    <div className="w-screen h-screen  justify-center items-center">
      <h2 className="text-3xl text-center">Not Found 404</h2>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Private />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/employee_list" element={<EmployeeList />}></Route>
            <Route path="/create" element={<Employee />}></Route>
          </Route>
          {/* <Route path="/" element={<Protected />}> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* </Route> */}

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
