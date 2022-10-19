import "./navbar.scss"
import {NotificationsNoneOutlined, DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useState, useEffect, useContext } from "react";
import { DarkModeContext, DarkModeState } from "../../context/darkModeContext";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [counterNotifications, setCounterNotifications] = useState(null);
  const [counterMessages, setCounterMessages] = useState(null);

  const handleDarkMode = () => {
    dispatch({type:"TOGGLE"})
    DarkModeState.darkMode = !DarkModeState.darkMode;
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search...." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          <div className="item">
            { DarkModeState.darkMode ? <LightModeOutlined className="icon" onClick={() => handleDarkMode()}/> : <DarkModeOutlined className="icon" onClick={() => handleDarkMode()}/>}
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            {counterNotifications && <span className="counter">{counterNotifications}</span>}
          </div>
          <div className="item">
            <ChatBubbleOutlinedIcon className="icon" />
            {counterMessages && <span className="counter">{counterMessages}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
