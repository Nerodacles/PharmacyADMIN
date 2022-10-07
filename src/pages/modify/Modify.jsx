import "./modify.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import axiosInstance from "../../store/axios";

const New = ({inputs, title}) => {
  const [product, setProduct] = useState();
  let [newProduct, setNewProduct] = useState();
  const id = window.location.pathname.split("/")[3];

  inputs = inputs.map((input) => {
    let value = product ? product[input.label] : "";
    return { ...input, value: value };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.patch(`api/update/${id}`, newProduct).then((res) => {
      window.location.href = `/products`;
    });
  };

  useEffect(() => {
    axiosInstance.get(`api/getOne/${id}`).then((res) => { setProduct(res.data.data); });
  }, [id]);

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top"> <h1>{title}</h1> </div>
        <div className="bottom">
          <div className="left">
            <img src={product ? `https://${product.cover}` : "https://www.icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } crossOrigin="anonymous" alt="" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
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