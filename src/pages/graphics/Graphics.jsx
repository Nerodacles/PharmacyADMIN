/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import "./graphics.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Chart from "../../components/chart/Chart"
import CircleChart from "../../components/chart/circleChart"
import BarChart from "../../components/chart/barChart"
import axiosInstance from "../../store/axios"
import { useEffect, useState } from "react"

const Graphics = () => {
  let [users, setUsers] = useState(null)
  let [orders, setOrders] = useState(null)
  let [drugs, setDrugs] = useState(null)

  useEffect(() => {
    axiosInstance.get("users/All").then((res) => { setUsers(res.data) })
    axiosInstance.get("orders").then((res) => { setOrders(res.data) })
    axiosInstance.get("api/getAll").then((res) => { setDrugs(res.data) })
  }, [])

  if (!users || !orders) return null

  let topUsers = orders.map((order) => { return { user: order.user, drugs: order.drugs, tags: [] } })
  .reduce((acc, curr) => {
    let user = acc.find((user) => user.user === curr.user)
    if (user) {
      user.drugs = [...user.drugs, ...curr.drugs]
      curr.drugs.map((drug) => {
        let NTags = []
        drug.tags.map((tag) => { if (!user.tags.includes(tag)) { NTags.push(tag) } })
        user.tags = [...user.tags, ...NTags]
      })
    } else {
      acc.push(curr)
    }
    return acc
  }, [])
  .sort((a, b) => b.drugs.length - a.drugs.length).slice(0, 5)

  let topTags = orders.map((order) => { return { user: order.user, drugs: order.drugs, tags: [] } })
  .reduce((acc, curr) => {
    let user = acc.find((user) => user.user === curr.user)
    if (user) {
      user.drugs = [...user.drugs, ...curr.drugs]
      curr.drugs.map((drug) => {
        let NTags = []
        drug.tags.map((tag) => { if (!user.tags.includes(tag)) { NTags.push(tag) } })
        user.tags = [...user.tags, ...NTags]
      })
    } else {
      acc.push(curr)
    }
    return acc
  }, [])
  .reduce((acc, curr) => {
    curr.tags.map((tag) => {
      let tagInAcc = acc.find((tagInAcc) => tagInAcc.tag === tag)
      if (tagInAcc) {
        tagInAcc.quantity++
      } else {
        acc.push({ tag, quantity: 1, drugs: curr.drugs.filter((drug) => drug.tags.includes(tag)) })
      }
    })
    return acc
  }, [])

  function ordersByTags(){
    let tags = []
    orders.forEach(order => {
      order.drugs.forEach(drug => {
        drug.tags.forEach(tag => {
          let tagIndex = tags.findIndex(t => t.tag === tag)
          if (tagIndex === -1) {
            tags.push({tag: tag, drug: drug.name, quantity: drug.quantity, count: 1})
          } else {
            tags[tagIndex].count++
          }
        })
      })
    })
    return tags
  }

  function ordersByTagsCurrentDay(){
    let tags = []
    orders.forEach(order => {
      if (new Date(order.createdTime).getDate() + 1 === new Date().getDate() && new Date(order.createdTime).getMonth() === new Date().getMonth()) {
        order.drugs.forEach(drug => {
          drug.tags.forEach(tag => {
            let tagIndex = tags.findIndex(t => t.tag === tag)
            if (tagIndex === -1) {
              tags.push({tag: tag, drug: drug.name, quantity: drug.quantity, count: 1})
            } else {
              tags[tagIndex].count++
            }
          })
        })
      }
    })
    return tags
  }

  return (
    <div className="home">
      <Sidebar/>
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets">
          <CircleChart aspect={3/1} data={ordersByTags()} title={'Fármacos vendidos por Síntomas'}/>
          <Chart aspect={3/1} data={orders} title={'Ventas de Fármacos (12 meses)'}/>
        </div>
        <div className="charts">
          <BarChart aspect={2/1} data={topUsers}/>
          <CircleChart aspect={2/1} data={ordersByTagsCurrentDay()} title={'Fármacos vendidos por Síntomas (Por Día)'}/>
        </div>
        <div className="charts">
          <BarChart aspect={6/1} data={topTags} title={'Fármacos según los síntomas que más se han vendidos'}/>
        </div>
      </div>
    </div>
  )
}

export default Graphics