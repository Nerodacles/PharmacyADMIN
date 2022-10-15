import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../store/axios";
import Switch from "react-switch";

const Datatable = () => {
  const [products, setProducts] = useState(null);

  const handleSwitch = useCallback( (id, chequed) => {
    axiosInstance.patch(`api/update/${id}`, { status: !chequed }).then((response) => {
      setProducts(products.map((order) => order.id === id ? { ...order, status: !chequed } : order));
    });
  }, [products]);

  useEffect(() => {
    axiosInstance.get("api/getAll").then((res) => { setProducts(res.data); });
  }, []);

  if (!products) return null;

  const handleModify = (id) => {
    window.location.href = `/products/modify/${id}`;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {field: "name", headerName: "Fármaco", width: 200},
    {field: "price", headerName: "Precio", width: 90},
    {field: "stock", headerName: "Cantidad", width: 90},
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
            <Link to={`${params.id}`} style={{ textDecoration: "none" }}><div className="viewButton"> Ver </div></Link>
            <button className="editButton" onClick={() => handleModify(params.id)}> Modificar </button>
          </div>
        );
      },
    },
  ];
  
  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          Fármacos
          <Link to="/products/new" className="link"> Crear </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={products}
          key={products.id}
          columns={columns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </>
  );
};

export default Datatable;