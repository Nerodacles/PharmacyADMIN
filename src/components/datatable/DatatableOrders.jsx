import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Switch from "react-switch";
import { useCallback } from "react";
import axiosInstance from "../../store/axios";

const Datatable = () => {
  const [orders, setOrders] = useState(null);

  const handleSwitch = useCallback( (id, chequed) => {
      axiosInstance.patch("status/" + id, { status: !chequed }).then((response) => {
        setOrders(orders.map((order) => order.id === id ? { ...order, status: !chequed } : order));
      });
  },[orders] );

  useEffect(() => {
    axiosInstance.get("orders").then((res) => { setOrders(res.data); });
  }, []);

  if (!orders) return null;

  const handleDelete = (id) => {
    setOrders(orders.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "totalPrice", headerName: "Precio Total", width: 100 },
    { field: "createdTime", headerName: "Fecha", width: 100, renderCell: (params) => {
        return (
          <div>{params.value.split("T")[0]}</div>
        )}
    },
    { field: "delivered", headerName: "Entregado", width: 100, renderCell: (params) => {
        return (
          <div>{params.value ? "Si" : "No"}</div>
        )}
    },
    { field: "drugs", headerName: "Medicamentos", width: 200, renderCell: (params) => {
      return ( 
        <div> {params.value.map((drug) => ( 
          <div key={drug.id}> <p>{drug.name}</p> </div> 
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
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Drug
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={orders}
        columns={columns.concat(actionColumn)}
        key={orders.id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;