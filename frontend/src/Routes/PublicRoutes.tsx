import { Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../Components/Login";
import Register from "../Components/Register";

function PublicRoutes() {
    return (
          <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
          </Routes>
    )
}
  

export default PublicRoutes