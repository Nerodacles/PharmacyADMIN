import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "https://pharmacy.jmcv.codes/api/";

const Datatable = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => { axios.get(baseURL+"getAll").then((response) => { setProducts(response.data); }) }, []);

  if (!products) return null;

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {field: "name", headerName: "Fármaco", width: 200},
    {field: "price", headerName: "Precio", width: 90},
    {field: "tags", headerName: "Tags", width: 200},
    {field: "cover", headerName: "Cover", width: 200, renderCell: (params) => {
      return (
        <img src={'https://'+params.value} alt="" style={{width: "100%", height: "100%"}}/>
      )
    }},
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}><div className="viewButton"> View </div></Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}> Delete </div>
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
        rows={products}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;