import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../store/axios";
import Switch from "react-switch";

const Datatable = () => {
  const [products, setProducts] = useState(null);

  const handleSwitch = useCallback( (id, chequed) => {
    axiosInstance.patch("status/" + id, { status: !chequed }).then((response) => {
      setProducts(products.map((order) => order.id === id ? { ...order, status: !chequed } : order));
    });
  }, [products]);

  useEffect(() => {
    axiosInstance.get("api/getAll").then((res) => { setProducts(res.data); });
  }, []);

  if (!products) return null;

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {field: "name", headerName: "Fármaco", width: 200},
    {field: "price", headerName: "Precio", width: 90},
    {field: "tags", headerName: "Tags", width: 200},
    {field: "cover", headerName: "Cover", width: 100, renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" crossOrigin="anonymous" src={'https://'+params.value} alt=""/>
        </div>
      )
    }},
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
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}><div className="viewButton"> Ver </div></Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}> Eliminar </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Fármacos
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