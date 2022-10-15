/* eslint-disable react-hooks/exhaustive-deps */
import "./map.scss"
import { Map, Marker, Overlay, ZoomControl } from "pigeon-maps"
import { useState, useEffect } from "react";
import { Home, GpsFixed, DeliveryDiningOutlined } from "@mui/icons-material"

function MyMap({orders}) {
    const [position, setPosition] = useState([18.947729907033047, -70.4059648798399])
    const [location, setLocation] = useState([])

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const defaultProps = {
        center: [18.947729907033047, -70.4059648798399],
        zoom: 16,
    };

    const ubicationStyle = {
        position: "absolute",
        top: 10,
        right: 10,
        background: "white",
        padding: 10,
        borderRadius: 10,
        border: "1px solid #ccc",
        zIndex: 100
    };

    const buttonUbiStyle = {
        background: "white",
        color: "grey"
    };

    async function obtainPosition() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude)
            setLocation([position.coords.latitude, position.coords.longitude])
        })
        sleep(20000).then(() => {
            obtainPosition()
        })
    }

    function clickClient(marker) {
        setPosition(marker)
    }

    function clickUbication() {
        setPosition([0,0])
        setPosition(location)
    }

    function UbicationCenter() {
        return (
            <div className="ubicationController">
                <GpsFixed className="buttonUbication" small="true" onClick={() => clickUbication()}/>
            </div>
        )
    }

    useEffect(() => {
        obtainPosition()
    }, [])

    return (
        <div className="cualquiera">
            <div className="map">
                <div className="mapContainer">
                    <Map defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} center={position} >
                        <ZoomControl />
                        <UbicationCenter style={ubicationStyle} buttonStyle={buttonUbiStyle}/>
                        {/* <Marker width={50} anchor={defaultProps.center} /> */}
                        {/* <Marker width={60} anchor={location} color={"black"} /> */}
                        <Overlay anchor={location} offset={[15, 0]}>
                            <DeliveryDiningOutlined className="iconMap" />
                        </Overlay>
                        <Overlay anchor={defaultProps.center} offset={[15, 0]}>
                            <Home className="iconMap"/>
                        </Overlay>
                        
                        {orders.map((order) => (
                            <Marker key={order.id} width={50} anchor={order.location} color={"red"} onClick={() => clickClient(order.location)} />
                        ))}
                    </Map>
                </div>
            </div>
            <div className="clients">
                <div className="clientsContainer">
                    <div className="title">
                        <h1>Pedidos</h1>
                    </div>
                    <div className="list">
                        {orders.map((order) => (
                            <div className="client" key={order.id} onClick={() => clickClient(order.location)}>
                                <div className="clientContainer">
                                    <div className="clientName">
                                        <h1>{order.user}</h1>
                                    </div>
                                    <div className="clientUbication">
                                        <h1>{order.drugs[0].name}</h1>
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