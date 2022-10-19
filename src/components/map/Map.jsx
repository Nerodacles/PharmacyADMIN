/* eslint-disable react-hooks/exhaustive-deps */
import "./map.scss"
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import { useState, useEffect } from "react";
import { Home, DeliveryDiningOutlined } from "@mui/icons-material"
import axiosInstance from "../../store/axios"

function MyMap({orders}) {
    const [position, setPosition] = useState([18.947729907033047, -70.4059648798399])
    const [deliveriesLocation, setDeliveriesLocation] = useState([])

    const defaultProps = {
        center: [18.947729907033047, -70.4059648798399],
        zoom: 16,
    };

    const ordersFilter = orders.filter(order => order.delivered === "on the way")

    function clickClient(marker) {
        setPosition(marker)
    }

    function clickDriver(marker) {
        setPosition(marker)
    }

    const getDriversLocation = async () => {
        console.log('test')
        axiosInstance.get("users/All").then((res) => {
            const drivers = res.data.filter((user) => user.role === "delivery")
            const driversLocation = drivers.map((driver) => driver.location)

            setDeliveriesLocation(driversLocation)
        })
    }

    useEffect(() => {
        getDriversLocation()
        const interval = setInterval(() => { getDriversLocation() }, 5000)
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="cualquiera">
            <div className="map">
                <div className="mapContainer">
                    <Map defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} center={position} >
                        <ZoomControl />
                        {deliveriesLocation.map((deliveryLocation) => (
                            <Overlay key={deliveryLocation.longitude} anchor={[deliveryLocation.latitude, deliveryLocation.longitude]} offset={[15, 0]}>
                                <DeliveryDiningOutlined className="iconMap" onClick={() => clickDriver([deliveryLocation.latitude, deliveryLocation.longitude])}/>
                            </Overlay>
                        ))}
                        <Overlay anchor={defaultProps.center} offset={[15, 0]}>
                            <Home className="iconMap" onClick={() => clickDriver(defaultProps.center)}/>
                        </Overlay>
                        
                        {ordersFilter.map((order) => (
                            <Marker key={order.id} width={50} anchor={[order.location.latitude, order.location.longitude]} color={"red"} onClick={() => clickClient([order.location.latitude, order.location.longitude])} />
                        ))}
                    </Map>
                </div>
            </div>
            <div className="clients">
                <div className="clientsContainer">
                    <div className="title">
                        <h1>Pedidos Activos</h1>
                    </div>
                    <div className="list">
                        {ordersFilter.map((order) => (
                            <div className="client" key={order.id} onClick={() => clickClient([order.location.latitude, order.location.longitude])}>
                                <div className="clientContainer">
                                    <div className="clientName">
                                        <h1>{order.user}</h1>
                                    </div>
                                    <div className="clientUbication">
                                        {order.moreDetails.direction}
                                        <div>

                                        {order.moreDetails.houseNumber}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyMap