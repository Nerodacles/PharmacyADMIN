import "./single.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Chart from "../../components/chart/Chart" 
import List from "../../components/table/Table"
import { useState, useEffect } from "react"
import axiosInstance from "../../store/axios"

const Single = () => {
  const url = window.location.pathname
  const id = url.split("/")[2]
  const [products, setProducts] = useState(null)
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      await axiosInstance.get(`api/getOne/${id}`).then((res) => { setProducts(res.data.data) })
      await axiosInstance.get(`orders/product/${id}`).then((res) => { setOrders(res.data) })
    }
    getUser()
  }, [id])

  const handleModify = () => {
    window.location.href = `/products/modify/${id}`
  }

  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => handleModify()}>Editar</div>
            <h1 className="title">Información</h1>
            <div className="item">
              <img src={`https://${products?.cover}`} crossOrigin="anonymous" alt="" className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">{products?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Precio:</span>
                  <span className="itemKey">RD$ {products?.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Cantidad:</span>
                  <span className="itemKey">{products?.stock}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Descripción:</span>
                  <span className="itemKey">{products?.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tags:</span>
                  <span className="itemKey">{products?.tags.toString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="Ventas ( Últimos 12 meses )" data={orders} tip/>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Ultimas Transacciones</h1>
          <List orders={orders}/>
        </div>
      </div>
    </div>
)
}

export default Single
