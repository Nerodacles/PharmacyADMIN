import "./chart.scss"
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({aspect , title, data}) => {
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

  let chartData = [
    { month: monthNames[10], price: 0 }, 
    { month: monthNames[11], price: 0 }, 
    { month: monthNames[0], price: 0 }, 
    { month: monthNames[1], price: 0 },
    { month: monthNames[2], price: 0 },
    { month: monthNames[3], price: 0 },
    { month: monthNames[4], price: 0 },
    { month: monthNames[5], price: 0 },
    { month: monthNames[6], price: 0 },
    { month: monthNames[7], price: 0 },
    { month: monthNames[8], price: 0 },
    { month: monthNames[9], price: 0 },
  ];
  
  data?.forEach((item) => {
    if (item.delivered === "yes") {
      let month = monthNames[new Date(item.createdTime).getMonth()];
      let price = item.totalPrice;
      let index = chartData.findIndex((item) => item.month === month);
      if (index < 0) {
        chartData.push({ month, price });
      } else {
        chartData[index].price += price;
      }
    }
  });

  return (
    <div className='chart'>
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
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#total)" />
      </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
