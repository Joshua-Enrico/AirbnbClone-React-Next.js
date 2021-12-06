import React, { useState} from 'react'
import getCenter from 'geolib/es/getCenter';
import { GoogleMap, useJsApiLoader, OverlayView, InfoBox } from '@react-google-maps/api';



const containerStyle = {
    width: '100%',
    height: '100%'
};



function Gmap({ searchResults }) {

    const [selectLocation, setSelectLocation] = useState({});

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    const center = getCenter(coordinates);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAMYpxHKaLrikZTaCHXHUczlc0Vl2Azmlg"
    })
    const onLoad = infoBox => {
        console.log('infoBox: ', infoBox)
    };
    const options = { closeBoxURL: '', enableEventPropagation: true };

  

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            defaultCenter={{ lat: center.latitude, lng: center.longitude }}
            center={{ lat: center.latitude, lng: center.longitude }}
            zoom={11}

        >
            {searchResults.map((item) => (
                <div key={item.long} >
                    <OverlayView
                        position={{ lat: item.lat, lng: item.long }}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        <p
                            role="img"
                            onClick={() => setSelectLocation(item)}
                            aria-label="push-pin"
                            className="cursor-pointer bg-red-400 hover:bg-red-500 text-white font-semibold py-1 px-2 rounded-full">{item.price}</p>

                    </OverlayView>
                    {selectLocation.long && (
                        <InfoBox
                            onLoad={onLoad}
                            options={options}
                            position={{ lat: selectLocation.lat, lng: selectLocation.long }}
                        >
                            <div  className="relative m-4 flex flex-wrap mx-auto justify-center">
                                <div className="relative max-w-sm  bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                                    <div className="overflow-x-hidden rounded-2xl relative">
                                        <img className="h-40 rounded-2xl w-full object-cover" src={selectLocation.img} />
                                        <p onClick={() => setSelectLocation({})} className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                                            <img className="h-6 w-6 group-hover:opacity-70" src="/closeicon.png" fill="none"/>
                                        </p>
                                    </div>
                                    <div className="mt-4 pl-2 mb-2 flex justify-between ">
                                        <div>
                                            <p className="text-lg font-semibold text-gray-900 mb-0">{selectLocation.title}</p>
                                            <p className="text-md text-gray-800 mt-0">{selectLocation.price}</p>
                                        </div>
                                        <div className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </InfoBox>
                    )}
                </div>
            ))}

        </GoogleMap>
    ) : <></>
}

export default React.memo(Gmap)