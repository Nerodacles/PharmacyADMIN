import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from "../../store/axios";
import { useEffect, useState } from "react";

// Made by Moses Mwila 
// for Zykar Solutions Limited

const List = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axiosInstance.get("orders").then((res) => { setOrders(res.data); });
  }, []);

  if (!orders) return null;
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell">Tracking ID</TableCell>
          <TableCell className="tableCell">Product</TableCell>
          <TableCell className="tableCell">Customer</TableCell>
          <TableCell className="tableCell">Date</TableCell>
          <TableCell className="tableCell">Amount</TableCell>
          <TableCell className="tableCell">Payment Method</TableCell>
          <TableCell className="tableCell">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((row) => (
          <TableRow
            key={row.id} >
            <TableCell className="tableCell" align="left">{row.id}</TableCell>
            <TableCell className="tableCell" align="left">
                {row.drugs.map((drug) => (
                  <div className="cellWrapper" key={drug.id} >
                    <img src={drug.cover} alt="" className="image" />
                    {drug.name}
                  </div>
                ))}
            </TableCell>
            <TableCell className="tableCell">{row.user}</TableCell>
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
