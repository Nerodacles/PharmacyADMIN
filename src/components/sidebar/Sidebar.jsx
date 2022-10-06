import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext)

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // refresh page
    window.location.reload();
  }

  return (
    <div className="sidebar"> 
    <div className="top">
      <Link to="/" style={{textDecoration: "none"}}>
        <span className="logo">Pharmacy - Panel Administrador</span>
      </Link>
    </div>
    <hr />
    <div className="center">
        <ul>
          <p className="title">Principal</p>
            <Link to="/" style={{textDecoration: "none"}}>
              <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/users" style={{textDecoration: "none"}}>
              <p className="title">Listas</p>
              <li>
                <PersonOutlineOutlinedIcon className="icon" />
              <span>Usuarios</span>
              </li>
            </Link>
            <Link to="/products" style={{textDecoration: "none"}}>
              <li>
                <StoreIcon className="icon" />
              <span>Productos</span>
              </li>
            </Link>
            <Link to="/orders" style={{textDecoration: "none"}}>
              <li>
                <CreditCardIcon className="icon" />
              <span>Órdenes</span>
              </li>
            </Link>
            <li>
              <LocalShippingIcon className="icon" />
            <span>Delivery</span>
            </li>
            <li>
              <InputOutlinedIcon className="icon" />
            <span onClick={() => logout()}>Cerrar Sesion</span>
            </li>
        </ul>

    </div>
    <div className="bottom">
        <div className="colorOption" 
          onClick={() => dispatch({ type : "LIGHT"})}>
        </div>
        <div className="colorOption"
          onClick={() => dispatch({ type : "DARK"})}>
        </div>
    </div>
    </div>
  )
}

export default Sidebar
