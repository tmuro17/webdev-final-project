import { useEffect, useState } from 'react';
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


// probably need to change this
const containerStyle = {
  width: '100%',
  height: '40vw'
};

function MapImage({coordinates}) {

  const [map, setMap] = useState(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAEnUt8hw2DAlx3HdoHQ0ryizeFhhTo6ZA"
  })

  const options = {
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_CENTER
    },
    disableDefaultUI: true,
    draggable: false,
    mapTypeId: 'satellite'
  }  

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onResize = React.useCallback(function callback(map) {
    
  }, [])

  return isLoaded ? (
    <GoogleMap
      options={options}
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onResize={onResize}
      zoom={14}
      center={coordinates}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      
    </GoogleMap>
  ) : <div>Map is loading...</div>
}

export default React.memo(MapImage);