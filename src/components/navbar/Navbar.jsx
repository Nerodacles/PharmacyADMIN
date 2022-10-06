import "./navbar.scss"
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlined from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useContext} from "react";
import { DarkModeContext} from "../../context/darkModeContext";

const Navbar = () => {

  const {dispatch} = useContext(DarkModeContext)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search...." />
          <SearchOutlinedIcon /> */}
        </div>
        <div className="items">
          <div className="item">
            <DarkModeOutlined className="icon" onClick={() => dispatch({type:"TOGGLE"})}/>
          </div>
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
