import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

// Lists
// eslint-disable-next-line
import UserList from "./pages/lists/users";
import ProductsList from "./pages/lists/products";
import OrdersList from "./pages/lists/orders";

// Single
import SingleUser from "./pages/single/Single";
import SingleProduct from "./pages/single/Single";
import SingleOrder from "./pages/single/Single";

// Pages
import New from "./pages/new/New";

// Sources
import { productInputs, userInputs, orderInputs } from "./formSource";

import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const {darkMode} = useContext(DarkModeContext)
  const ProtectedRoute = ({ children }) => {
    let user = localStorage.getItem("user");
  
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/"> 
            <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="login" element={<Login/>}/>
            <Route path="users">
              <Route index element={<ProtectedRoute><UserList/></ProtectedRoute>} />
              <Route path=":userId" element={<SingleUser/>}/>
              <Route path="new" element={<New inputs={userInputs} title="Add New User"/>}/>
            </Route>
            <Route path="products">
              <Route index element={<ProtectedRoute><ProductsList/></ProtectedRoute>}/>
              <Route path=":productId" element={<SingleProduct/>}/>
              <Route path="new" element={<New inputs={productInputs} title="Add New Product"/>}/>
            </Route>
            <Route path="orders">
              <Route index element={<ProtectedRoute><OrdersList/></ProtectedRoute>}/>
              <Route path=":orderId" element={<SingleOrder/>}/>
              <Route path="new" element={<New inputs={orderInputs} title="Add New Order"/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
