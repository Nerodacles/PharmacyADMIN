import "./widget.scss"
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp"
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"
import MonetizationOnOutlined from "@mui/icons-material/MonetizationOnOutlined"

const Widget = ({ type, amount, diff }) => {
    let data

    switch (type) {
        case "user":
            data = {
                title: "Usuarios",
                isMoney: false,
                link: "Ver todos los usuarios",
                amount: amount,
                diff: diff,
                page: "/users",
                icon: (
                    <PersonOutlineOutlined 
                    className="icon" 
                    style={{
                        color: "crimson",
                        backgroundColor: " rgba(218,165,32,0.2)",
                    }}
                    />
                ),
            }
            break
        case "leastUsed":
            data = {
                title: "Fármacos menos usados",
                isMoney: false,
                link: "Ver todos los fármacos",
                amount: amount,
                page: "/products",
            }
            break
        case "order":
            data = {
                title: "Ordenes",
                isMoney: false,
                amount: amount,
                diff: diff,
                page: "/orders",
                link: "Ver todas las ordenes",
                icon: (
                    <ShoppingCartOutlinedIcon className="icon" 
                    style={{
                        color: "goldenrod",
                        backgroundColor: " rgba(218,165,32,0.2)",
                    }}
                        />
                ),
            }
            break
            case "orders":
            data = {
                title: "Pedidos entregados este mes",
                isMoney: false,
                amount: amount,
                diff: diff,
                page: "/orders",
                link: "Ver todos los pedidos",
                icon: (
                    <ShoppingCartOutlinedIcon className="icon" 
                    style={{
                        color: "goldenrod",
                        backgroundColor: " rgba(218,165,32,0.2)",
                    }}
                        />
                ),
            }
            break
            case "earning":
                data = {
                    title: "Ventas",
                    isMoney: true,
                    amount: amount,
                    diff: diff,
                    link: "Ver todas las ventas",
                    page: "/orders",
                    icon: (
                        <MonetizationOnOutlined className="icon" 
                        style={{
                            color: "green",
                            backgroundColor: " rgba(0,128,0,0.2)",
                        }}
                            />
                    ),
                }
                break
        default:
            break
    }
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                {Array.isArray(amount) ?
                    amount.map((item, index) => ( 
                        <div className="amount" key={index}>
                            <span className="number">{item.drug}</span>
                        </div>
                    ))
                :
                    <span className="counter">{data.isMoney && "RD$"} {data.isMoney && data.amount.toLocaleString("en-US")} {!data.isMoney && data.amount}</span>
                } 
                <a href={data.page} className="link">{data.link}</a>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUp />
                        {data.diff} %
                </div>
            {data.icon}
            </div>
        </div>
    )
}

export default Widget
