import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../store/axios";
import Switch from "react-switch";

const Datatable = () => {
  const [users, setUsers] = useState(null);

  const handleSwitch = useCallback( (id, chequed) => {
      axiosInstance.patch("status/" + id, { status: !chequed }).then((response) => {
        setUsers(users.map((order) => order.id === id ? { ...order, status: !chequed } : order));
      });
  },[users] );

  useEffect(() => {
    axiosInstance.get("users/All").then((res) => { setUsers(res.data); });
  }, []);

  if (!users) return null;

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const columns = [
    {field: "id", headerName: "ID", width: 150},
    {field: "username", headerName: "Nombre", width: 200},
    {field: "email", headerName: "Email", width: 200},
    {field: "role", headerName: "Rol", width: 70},
    // {field: "description", headerName: "Descripción", width: 200},
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
        Usuarios
      </div>
      <DataGrid
        className="datagrid"
        rows={users}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;