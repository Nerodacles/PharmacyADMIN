import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axiosInstance from "../../store/axios";
import Creatable from 'react-select/creatable';

const New = ({inputs, title}) => {
  const [cover, setFile] = useState("");
  const [newProduct, setNewProduct] = useState();
  const [error, setError] = useState(null)
  const [tags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('cover', newProduct.cover);
    data.append('name', newProduct.name);
    data.append('description', newProduct.description);
    data.append('stock', newProduct.stock);
    data.append('price', newProduct.price);
    data.append('tags', newProduct.tags);

    axiosInstance.post(`api/post`, data).then((res) => {
      window.location.href = `/products`;
    }).catch((err) => {
      setError(err.response.data.error)
    });
  };

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

  useEffect(() => {
    axiosInstance.get(`tags`).then((res) => {
      for (let tag of res.data) { tags.push({value: tag.id, label: tag.name}) }
      if (tags.length > res.data.length) { tags.splice(0, res.data.length); }
    });
  }, [tags]);
  
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
            <img src={cover ? URL.createObjectURL(cover) : "https://www.icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                  <label htmlFor="file">Imagen : <DriveFolderUploadOutlined className="icon"/> </label>
                  <input type="file" name="cover" id="file" onChange={(input) => handleChange(input)} style={{ display: "none"}} required />
              </div>
              <div className="formInput"><Creatable options={tags} placeholder="Selecciona las tags" isMulti value={tags.name} onChange={(input) => handleTags(input)} required /></div>
              { inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.name}</label>
                  <input name={input.label} type={input.type} placeholder={input.placeholder} defaultValue={input.value} onChange={(input) => handleChange(input)} required />
                </div>
              ))}
              
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New