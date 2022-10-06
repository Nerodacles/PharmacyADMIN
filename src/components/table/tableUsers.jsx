import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = ({orders}) => {
  if (!orders) return null;

  if (orders.length === 0) return (
  <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className="tableCell" align="center">No hay pedidos</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
  )
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">ID</TableCell>
          <TableCell className="tableCell">Fármaco</TableCell>
          <TableCell className="tableCell">Fecha</TableCell>
          <TableCell className="tableCell">Precio</TableCell>
          <TableCell className="tableCell">Forna de Pago</TableCell>
          <TableCell className="tableCell">Estado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((row) => (
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
            <TableCell className="tableCell" align="left">{row.createdTime.split("T")[0]}</TableCell>
            <TableCell className="tableCell" align="left">RD$ {Number(row.totalPrice).toLocaleString("en-US")}</TableCell>
            <TableCell className="tableCell">PayPal</TableCell>
            <TableCell className="tableCell">
              <span className={`status ${row.status ? 'Approved' : 'Pending'}`}>{row.status ? 'Approved' : 'Pending'}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List
