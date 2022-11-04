/* eslint-disable array-callback-return */
import "./featured.scss"
import { CircularProgressbar } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { KeyboardArrowUpOutlined, KeyboardArrowDown } from "@mui/icons-material"

const Featured = ({data}) => {
  let today = new Date().toLocaleDateString()
  let target = 2000
  
  let earningsToday = data.filter((order) => {
    if (order.delivered === "yes") { 
      return new Date(order.createdTime).toLocaleDateString() === today 
    }
  })
  .reduce((acc, curr) => { return acc + curr.totalPrice }, 0)

  let earningsLastWeek = data.filter((order) => {
    if (order.delivered === "yes") {
      return new Date(order.createdTime).getMonth() === new Date().getMonth() && new Date(order.createdTime).getDate() > new Date().getDate() - 7
    }
  })
  .reduce((acc, curr) => { return acc + curr.totalPrice }, 0)

  let earningsLastMonth = data.filter((order) => {
    if (order.delivered === "yes") {
      return new Date(order.createdTime).getMonth() === new Date().getMonth() - 1
    }
  })
  .reduce((acc, curr) => { return acc + curr.totalPrice }, 0)

  let percentage = Math.round((earningsToday / target) * 100)

  const ResultItem = (data) => {
    if (data.data > target) { 
      return (
        <div className="itemResult positive">
          <KeyboardArrowUpOutlined fontSize="small"/>
          <div className="resultAmount">RD$ {Number(data.data).toLocaleString("en-US")}</div>
        </div>
      )  
    }
    if (data.data === target) { 
      return (
        <div className="itemResult neutral">
          <div className="resultAmount">RD$ {Number(data.data).toLocaleString("en-US")}</div>
        </div>
      )  
    }
    return (
      <div className="itemResult negative">
        <KeyboardArrowDown fontSize="small" />
        <div className="resultAmount">RD$ {Number(data.data).toLocaleString("en-US")}</div>
      </div>
    )
  }

  return (
    <div className='featured'>
      <div className="top">
        <h1 className="title">Ventas Totales</h1>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth="5"/>
        </div>
        <p className="title">Total de ventas hechas hoy</p>
        <p className="amount">RD$ {Number(earningsToday).toLocaleString("en-US")}</p>
        <p className="desc">Las transacciones previas aún se siguen procesando. Es posible que no se incluyan los últimos pagos.</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Objetivo</div>
            <ResultItem data={target}/>
          </div>
          <div className="item">
            <div className="itemTitle">Semana Pasada</div>
            <ResultItem data={earningsLastWeek}/>
          </div>  
            <div className="item">
            <div className="itemTitle">Mes Pasado</div>
            <ResultItem data={earningsLastMonth}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured
