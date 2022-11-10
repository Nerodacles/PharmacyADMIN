import "./chart.scss"
import { BarChart, Bar, AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const Chart = ({aspect , title, data, tip = false}) => {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const COLORS = ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]
  let monthDrugs = {}

  let chartData = monthNames.map((month, index) => {
    if (data){
      if (index === 11) {
        return { month: monthNames[new Date(data[0]?.createdTime).getMonth()], price: 0 }
      }
      if (index === 0) {
        return { month: monthNames[new Date(data[0]?.createdTime).getMonth() + 1], price: 0 }
      }
      return { month: monthNames[new Date(data[0]?.createdTime).getMonth() - (11 - index)], price: 0 }
    }
    return { month: month, price: 0 }
  })
  
  data?.forEach((item) => {
    if (item.delivered === "yes") {
      let month = monthNames[new Date(item?.createdTime).getMonth()]
      let price = item.totalPrice
      let index = chartData.findIndex((item) => item.month === month)
      item.drugs.forEach(drug => {
        if (monthDrugs[month]) {
          if (monthDrugs[month][drug.name]) { monthDrugs[month][drug.name] += drug.quantity } 
          else { monthDrugs[month][drug.name] = drug.quantity }
        } 
        else {  monthDrugs[month] = {[drug.name]: drug.quantity} }
      })
      if (index < 0) { chartData.push({ month, price }) }
      else { chartData[index].price += price }
    }
  })

  function returnNames(month){
    if (!monthDrugs[month]) {
      return null
    }
    let names = []
    for (const [key, value] of Object.entries(monthDrugs[month])) {
      names.push(`${key} - ${value}`)
    }
    return names
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      if (tip === false){
        if (!returnNames(label)){ return null }
        return (
          <div className="custom-tooltip">
            <p className="label">{`${label} : RD$ ${payload[0].value.toLocaleString("en-US")}`}</p>
            <br />
            <p className="intro">{`Farmacos vendidos:`}</p>
            { returnNames(label)?.map((item, index) => { return <p className="label" key={index}>{item}</p> }) }
          </div>
        )
      }
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : RD$ ${payload[0].value.toLocaleString("en-US")}`}</p>
        </div>
      )
    }
  }

  return (
    tip ? <div className='chart'>
      <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <AreaChart width={730} height={250} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="gray" />
            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
            <Tooltip content={<CustomTooltip />}/>
            <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    :
      <div className='chart'>
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart width={730} height={250} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <Bar dataKey="price" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
            <XAxis dataKey="month" />
            <Tooltip content={<CustomTooltip/>}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
  )
}

export default Chart
