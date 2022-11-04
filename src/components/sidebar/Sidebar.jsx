import "./sidebar.scss"
import { AutoGraph, InputOutlined, LocalShipping, CreditCard, Store, PersonOutlineOutlined, Dashboard } from "@mui/icons-material"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location.reload()
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
              <Dashboard className="icon" />
              <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/users" style={{textDecoration: "none"}}>
              <p className="title">Listas</p>
              <li>
                <PersonOutlineOutlined className="icon" />
              <span>Usuarios</span>
              </li>
            </Link>
            <Link to="/products" style={{textDecoration: "none"}}>
              <li>
                <Store className="icon" />
              <span>Productos</span>
              </li>
            </Link>
            <Link to="/orders" style={{textDecoration: "none"}}>
              <li>
                <CreditCard className="icon" />
              <span>Órdenes</span>
              </li>
            </Link>
            <Link to="/deliveries" style={{textDecoration: "none"}}>
              <li>
                <LocalShipping className="icon" />
              <span>Mapa</span>
              </li>
            </Link>
            <Link to="/graphics" style={{textDecoration: "none"}}>
              <li>
                <AutoGraph className="icon" />
              <span>Gráficos</span>
              </li>
            </Link>
            <li>
              <InputOutlined className="icon" />
            <span onClick={() => logout()}>Cerrar Sesion</span>
            </li>
        </ul>

    </div>
    </div>
  )
}

export default Sidebar
