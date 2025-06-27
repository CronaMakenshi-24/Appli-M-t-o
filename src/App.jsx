import React from 'react'
import WeatherComponent from './Compoments/WeatherCompoment'
import CloudCompenent from "./Compoments/CloudCompement.jsx";
import SunCompenent from "./Compoments/SunCompement.jsx";
import Landscape from "./Compoments/LandscapeCompement.jsx";

function App() {
    return (
        <div className="App">
            <Landscape />
            <div className="content">
                    <div>
                        <SunCompenent />
                    </div>
                    <div className="background-App2">
                        <h1 className="h1">Application Météo</h1>
                        <WeatherComponent />
                    </div>
                    <div>
                        <CloudCompenent  />
                    </div>
            </div>
        </div>
    );
}


export default App
