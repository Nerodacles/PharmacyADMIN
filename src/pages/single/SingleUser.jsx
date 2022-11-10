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
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState(null)

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  useEffect(() => {
    const getUser = async () => {
      await axiosInstance.get(`users/${id}`).then((res) => { setUser(res.data) })
      await axiosInstance.get(`orders/user/${id}`).then((res) => { setOrders(res.data) })
    }
    getUser()
  }, [id])

  if (!user || !orders) return null

  let dataOrders = orders?.sort((a, b) => {
    return new Date(b.createdTime) - new Date(a.createdTime)
  })

  return (
    <div className="single">
      <Sidebar/>
      <div className="singleContainer">
        <Navbar/>
        <div className="top">
          <div className="left">
            <h1 className="title">Información</h1>
            <div className="item">
              <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=536&q=80" alt="" className="itemImg"/>
              <div className="details">
                <h1 className="itemTitle">{user?.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Número Telefonico:</span>
                  <span className="itemKey">{user?.phone ? `+1 ${formatPhoneNumber(user?.phone)}` : '+1 000-000-000'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemKey">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Dirección:</span>
                  {
                    user?.moreDetails ?
                      <>
                        <>
                          <span className="itemKey">{user?.moreDetails.direction}</span>
                        </>
                        
                        <div className="detailItem">
                          <span className="itemKey">Número de casa:</span>
                          <span className="itemKey">{user?.moreDetails.houseNumber}</span>
                        </div>

                        <>
                          <span className="itemKey">Referencia:</span>
                          <span className="itemKey">{user?.moreDetails.reference}</span>
                        </>
                        
                      </>
                    :
                    <span className="itemKey">256 Collect House, Buteko Avenue, Ndola</span>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={4/1} title="Gastos del usuario ( Últimos 12 meses )" data={dataOrders} tip/>
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Últimas Transacciónes</h1>
          <List orders={dataOrders}/>
        </div>
      </div>
    </div>
)
}

export default Single
