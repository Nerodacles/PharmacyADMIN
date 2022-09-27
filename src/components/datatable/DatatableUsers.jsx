import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../store/axios";

const Datatable = () => {
  const [users, setUsers] = useState(null);

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
    {field: "role", headerName: "Rol", width: 200},
    // {field: "description", headerName: "Descripción", width: 200},
  ];

  const actionColumn = [
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
        Add New Users
        <Link to="/users/new" className="link">
          Add New
        </Link>
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