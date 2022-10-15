import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Switch from "react-switch";
import axiosInstance from "../../store/axios";

const Datatable = () => {
  const [orders, setOrders] = useState(null);

  const handleSwitch = useCallback( (id, chequed) => {
      axiosInstance.patch(`/orders/status/${id}`, { status: !chequed }).then((response) => {
        setOrders(orders.map((order) => order.id === id ? { ...order, status: !chequed } : order));
      });
  },[orders] );

  useEffect(() => {
    axiosInstance.get("orders").then((res) => { setOrders(res.data); });
  }, []);

  if (!orders) return null;

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "totalPrice", headerName: "Precio Total", width: 100 },
    { field: "user", headerName: "Usuario", width: 70 },
    { field: "createdTime", headerName: "Fecha", width: 100, renderCell: (params) => {
        return (
          <div>{params.value.split("T")[0]}</div>
        )}
    },
    { field: "delivered", headerName: "Se entregó", width: 120, renderCell: (params) => {
        if (params.value === 'no'){ return <div>{params.value}</div> }
        if (params.value === 'on the way'){ return <div>está de camino</div> }
        if (params.value === 'yes'){ return <div>si</div> }
      }
    },
    { field: "drugs", headerName: "Medicamentos", width: 200, renderCell: (params) => {
      return ( 
        <div className="drugs"> {params.value.map((drug) => ( 
          <div key={drug.id}> <p>{drug.name}</p></div> 
          ))}
        </div>
      )},
    },
  ];

  const actionColumn = [
    { field: "status", headerName: "Estado", width: 80, renderCell: (params) => {
        return (
          <div>
            <Switch
              onChange={() => handleSwitch(params.row.id, params.row.status)}
              checked={params.value}
              
            />
          </div>
        )
      }},
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Órdenes
      </div>

      <DataGrid
        className="datagrid"
        rows={orders}
        columns={columns.concat(actionColumn)}
        key={orders.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableColumnFilter={false}
      />
    </div>
  );
};

export default Datatable;