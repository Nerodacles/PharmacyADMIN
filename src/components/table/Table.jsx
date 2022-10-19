import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = ({orders: items}) => {
  if (!items) return null;

  function IsOrderUser(props){
    if (items[0].user) {
      if (props.head) return <TableCell className="tableCell">Usuario</TableCell>
      if (props.body) {
        if (props.user.user) return <TableCell className="tableCell">{props.user.user}</TableCell>
        return <TableCell className="tableCell">{props.user}</TableCell>
      }
    }
  }

  const EstadoDelivery = (data) => {
    console.log()
    if (data.data === 'yes'){
      return (
        <span className={`status Approved`}>Entregado</span>
      )
    }
    if (data.data === 'on the way'){
      return (
        <span className={`status Pending`}>De camino</span>
      )
    }
    return (
      <span className={`status Waiting`}>En espera</span>
    )
  };

  let sortedOrders = items.sort((a, b) => {
    return Date.parse(b.createdTime) - Date.parse(a.createdTime);
  });

  if (items.length === 0) return (
  <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className="tableCell" align="center">No hay items</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="drugs table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Fármaco</TableCell>
            <IsOrderUser head/>
            <TableCell className="tableCell">Fecha</TableCell>
            <TableCell className="tableCell">Precio</TableCell>
            <TableCell className="tableCell">Forma de Pago</TableCell>
            <TableCell className="tableCell">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedOrders.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell" align="left">{row.id}</TableCell>
              <TableCell className="tableCell" align="left">
                  {row.drugs.map((drug) => (
                    <div className="cellWrapper" key={drug.id}>
                      <img crossOrigin="anonymous" src={'https://'+drug.cover} alt="" className="image" />
                      {drug.name} x {drug.quantity}
                    </div>
                  ))}
              </TableCell>
              <IsOrderUser body user={row}/>
              <TableCell className="tableCell" align="left">{row.createdTime.split("T")[0]}</TableCell>
              <TableCell className="tableCell" align="left">RD$ {Number(row.totalPrice).toLocaleString("en-US")}</TableCell>
              <TableCell className="tableCell">{row.payment.paymentMethod}</TableCell>
              <TableCell className="tableCell"> <EstadoDelivery data={row.delivered} /> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List
