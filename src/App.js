import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Graphics from "./pages/graphics/Graphics"

import UserList from "./pages/lists/users"
import ProductsList from "./pages/lists/products"
import OrdersList from "./pages/lists/orders"
import RouteList from "./pages/lists/route"

// Single
import SingleUser from "./pages/single/SingleUser"
import SingleProduct from "./pages/single/SingleProduct"
import SingleOrder from "./pages/single/SingleOrder"

// Pages
import New from "./pages/new/New"
import Modify from "./pages/modify/Modify"

// Sources
import { productInputs } from "./formSource"

import "./style/dark.scss"
import { useContext } from "react"
import { DarkModeContext } from "./context/darkModeContext"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

function App() {
  const {darkMode} = useContext(DarkModeContext)
  const ProtectedRoute = ({ children }) => {
    let user = localStorage.getItem("user")
  
    if (!user) {
      return <Navigate to="/login" replace />
    }
  
    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/"> 
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="login" element={<Login/>}/>
            <Route path="users">
              <Route index element={<ProtectedRoute><UserList/></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><SingleUser/></ProtectedRoute>}/>
            </Route>
            <Route path="products">
              <Route index element={<ProtectedRoute><ProductsList/></ProtectedRoute>}/>
              <Route path=":productId" element={<ProtectedRoute><SingleProduct/></ProtectedRoute>}/>
              <Route path="new" element={<ProtectedRoute><New inputs={productInputs} title="Añadir nuevo fármaco"/></ProtectedRoute>}/>
              <Route path="modify/:productId" element={<ProtectedRoute><Modify inputs={productInputs} title="Editar fármaco"/></ProtectedRoute>}/>
            </Route>
            <Route path="orders">
              <Route index element={<ProtectedRoute><OrdersList/></ProtectedRoute>}/>
              <Route path=":orderId" element={<ProtectedRoute><SingleOrder/></ProtectedRoute>}/>
            </Route>
            <Route path="deliveries">
              <Route index element={<ProtectedRoute><RouteList/></ProtectedRoute>}/>
            </Route>
            <Route path="graphics">
              <Route index element={<ProtectedRoute><Graphics/></ProtectedRoute>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
