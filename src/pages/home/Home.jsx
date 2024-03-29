import "./home.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import Table from "../../components/table/Table"
import axiosInstance from "../../store/axios"
import { useEffect, useState } from "react"


const Home = () => {
  let [users, setUsers] = useState(null)
  let [orders, setOrders] = useState(null)

  useEffect(() => {
    axiosInstance.get("users/All").then((res) => { setUsers(res.data) })
    axiosInstance.get("orders").then((res) => { setOrders(res.data) })
  }, [])

  if (!users || !orders) return null

  let totalEarnings = orders.reduce((acc, curr) => {
    if (curr.delivered === "yes") { return acc + curr.totalPrice } 
    else { return acc }
  }, 0)

  let diffUsersPastMonth = users.filter((user) => {
    return new Date(user.date).getMonth() === new Date().getMonth()
  }).length

  let diffOrdersPastMonth = orders.filter((order) => {
    return new Date(order.date).getMonth() === new Date().getMonth()
  }).length

  let diffEarningsPastMonth = orders.filter((order) => {
    return new Date(order.date).getMonth() === new Date().getMonth()
  }).reduce((acc, curr) => {
    return acc + curr.totalPrice
  }, 10)

  let ordersPastMonth = orders.filter((order) => {
    return new Date(order?.deliveredDate).getMonth() === new Date().getMonth()
  })

  let porcentage = (a, b) => {
    if (a === 0) { return 0 }
    return ((a - b) / a) * 100
  }

  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
      <Navbar/>
      <div className="widgets">
        <Widget type="user" amount={users.length} diff={porcentage(users.length, diffUsersPastMonth)}/>
        <Widget type="order" amount={orders.length} diff={porcentage(orders.length, diffOrdersPastMonth)}/>
        <Widget type="orders" amount={ordersPastMonth.length} diff={porcentage(ordersPastMonth.length, diffOrdersPastMonth)}/>
        <Widget type="earning" amount={totalEarnings} diff={diffEarningsPastMonth}/>
      </div>
      <div className="charts">
        <Featured data={orders}/>
        <Chart title="Últimos 12 meses (Ventas)" aspect={4/1} data={orders} tip/>
      </div>
      <div className="listContainer">
        <div className="listTitle">Ultimas Transacciones</div>
        <Table orders={orders}/>
      </div>
      </div>
    </div>
  )
}

export default Home