import "./chart.scss"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const circleChart = ({aspect , title, data}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#FF00FF', '#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#000000', '#808080', '#C0C0C0', '#FFFFFF']

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    
    if (data.length < 1 ) { return 0}
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const CustomTooltip = ({ active, payload, drug }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Síntoma: ${payload[0].payload.tag}`}</p>
        </div>
  )}}

  if (data.length === 0) {
    let data = [ { name: 'Group A', value: 400 } ]
    return (
      <div className='chart'>
        <div className="title">{title}</div>
        <ResponsiveContainer width="100%" aspect={aspect}>
          <PieChart width={1200} height={1200}>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value" >
              <Cell key={`cell-1`} fill={COLORS[0]} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  return (
    <div className='chart'>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height="100%" aspect={aspect}>
        <PieChart width={1200} height={1200}>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="count" >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default circleChart
