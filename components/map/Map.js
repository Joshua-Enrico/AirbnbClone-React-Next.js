import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import getCenter from 'geolib/es/getCenter';



function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
 console.log(selectedLocation);
// SearchResult obj to lat and lon objet
      const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
      }))
      
      const center = getCenter(coordinates);
      const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 10,
      });

    return (
        <ReactMapGL 
        mapStyle="mapbox://styles/yoyogold123321/ckwsasduk1qv714nywp064j5m"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange = {(nextViewport) => setViewport(nextViewport)}
        >
          {searchResults.map(result => (
            <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lat}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded-full">{result.price}</p>
            </Marker>
            </div>
          ))}
        </ReactMapGL>
    );
}

export default Map
