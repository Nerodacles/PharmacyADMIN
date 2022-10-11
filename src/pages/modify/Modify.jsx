import "./modify.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axiosInstance from "../../store/axios";
import Creatable from 'react-select/creatable';

const New = ({inputs, title}) => {
  const [cover, setFile] = useState("");
  const [product, setProduct] = useState();
  let [newProduct, setNewProduct] = useState({tags: []});
  const [tags] = useState([]);
  const [error, setError] = useState(null)
  const id = window.location.pathname.split("/")[3];

  inputs = inputs.map((input) => {
    let value = product ? product[input.label] : "";
    return { ...input, value: value };
  });

  const handleChange = (e) => {
    if (e.target?.files) {const file = e.target.files[0]; setFile(file); }
    if (e.target?.files) { const value = e.target.files[0]; setNewProduct({ ...newProduct, [e.target.name]: value }); }
    else {const { name, value } = e.target; setNewProduct({ ...newProduct, [name]: value });}
  };

  const handleTags = (e) => {
    let tags = [];
    for (let tag of e) {
      tags.push(tag.label);
    }
    setNewProduct({ ...newProduct, tags: tags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    if (newProduct?.cover) { data.append('cover', newProduct.cover); }
    if (newProduct?.name) { data.append('name', newProduct.name); }
    if (newProduct?.description) { data.append('description', newProduct.description); }
    if (newProduct?.stock) { data.append('stock', newProduct.stock); }
    if (newProduct?.price) { data.append('price', newProduct.price); }
    if (newProduct?.tags) { data.append('tags', newProduct.tags); }
    data.append('status', true);

    axiosInstance.patch(`api/update/${id}`, data).then((res) => {
      window.location.href = `/products`;
    }).catch((err) => {
      setError(err.response.data.error)
    });
  };

  useEffect(() => {
    axiosInstance.get(`api/getOne/${id}`).then((res) => { setProduct(res.data.data); });
    axiosInstance.get(`tags`).then((res) => {
      for (let tag of res.data) { tags.push({value: tag.name, label: tag.name}) }
      if (tags.length > res.data.length) { tags.splice(0, res.data.length); }
    });
  }, [id, tags]);

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top"> <h1>{title}</h1> </div>
        <div>
          {error && <div className="error">{error}</div>}
        </div>
        <div className="bottom">
          <div className="left">
            <img src={cover ? URL.createObjectURL(cover) : `https://${product?.cover}`} crossOrigin="anonymous" alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">Image : <DriveFolderUploadOutlined className="icon"/> </label>
                <input type="file" name="cover" id="file" onChange={(input) => handleChange(input)} style={{ display: "none"}} />
              </div>
              <div className="formInput"><Creatable options={tags} placeholder="Selecciona las tags" isMulti onChange={(input) => handleTags(input)} /></div>
              { inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.name}</label>
                  <input name={input.label} type={input.type} placeholder={input.placeholder} defaultValue={input.value} onChange={(input) => handleChange(input)} />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New