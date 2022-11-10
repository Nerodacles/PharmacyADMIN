/* eslint-disable no-unused-vars */
import "./chart.scss"
import { BarChart, Bar, XAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const barChart = ({aspect , title, data}) => {
  const COLORS = ["#ea5545", "#f46a9b", "#ef9b20", "#edbf33", "#ede15b", "#bdcf32", "#87bc45", "#27aeef", "#b33dc6"]
  
  function returnNames(string){
    let names = []
    if (string[0]?.name) {
      string.forEach(element => {
        if (names.indexOf(element.name) === -1) { names.push(element.name) }
      })
    }
    if (!string[0]?.name){
      for (const [key, value] of Object.entries(string)) { names.push(`${value}`) }}
    return names
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      if (!payload[0].payload?.tag) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`Usuario: ${label}`}</p>
            <br />
            <p className="intro">{`Síntomas de fármacos:`}</p>
            {returnNames(payload[0].payload?.tags)?.map((item, index) => { return <p className="label" key={index}>{item}</p> })}
          </div>
        )
      }
      return (
        <div className="custom-tooltip">
          <p className="label">{`Usuario: ${label}`}</p>
          <br />
          <p className="intro">{`Síntomas de fármacos:`}</p>
          { returnNames(payload[0].payload?.drugs)?.map((item, index) => { return <p className="label" key={index}>{item} </p> })}
        </div>
      )
    }
  }

  
  if (!data[0].tag){
    return (
      <div className='chart'>
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <BarChart width={150} height={40} data={data}>
            <Bar dataKey="drugs.length" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
            <XAxis dataKey="user" />
            <Tooltip content={<CustomTooltip/>}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className='chart'>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart width={150} height={40} data={data}>
          <Bar dataKey="drugs.length" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
          <XAxis dataKey="tag" />
          <Tooltip content={<CustomTooltip/>}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default barChart