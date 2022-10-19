import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../store/axios";
import Switch from "react-switch";

const Datatable = () => {
  const [users, setUsers] = useState(null);

  const handleSwitch = useCallback( (id, chequed) => {
      axiosInstance.patch(`/users/${id}`, { status: !chequed }).then((response) => {
        setUsers(users.map((order) => order.id === id ? { ...order, status: !chequed } : order));
      });
    },[users] );
    
  useEffect(() => {
    axiosInstance.get("users/All").then((res) => { setUsers(res.data); });
  }, []);

  if (!users) return null;

  const columns = [
    {field: "id", headerName: "ID", width: 250},
    {field: "username", headerName: "Nombre", width: 200},
    {field: "email", headerName: "Email", width: 300},
    {field: "role", headerName: "Rol", width: 70},
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
      headerName: "Acciónes",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Ver</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Usuarios
      </div>
      <DataGrid
        className="datagrid"
        getRowHeight={() => 'auto'}
        getRowSpacing={() => 'auto'}
        rows={users}
        key={users.id}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default Datatable;