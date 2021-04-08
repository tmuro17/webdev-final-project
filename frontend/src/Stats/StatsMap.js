import { useState } from 'react';
import React from 'react'
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '40vw'
};

const USACenter = {lat: 39.7538157, lng: -98.5823615}

function StatsMap({airports}) {

  const [map, setMap] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAEnUt8hw2DAlx3HdoHQ0ryizeFhhTo6ZA"
  })

  const options = {
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_CENTER
    },
    // disableDefaultUI: true,
    draggable: true,
    mapTypeId: 'satellite'
  }  

  const onLoad = React.useCallback(function callback(map) {
    // let bounds = new window.google.maps.LatLngBounds();
    // airports.forEach(info => {
    //   console.log('new bound: ', {lat: info.lat, lng: info.lng})
    //   bounds.extend({lat: info.lat, lng: info.lng});
    // })
    // console.log('haha')
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const statMarkers = airports.map((info, index) => (
    <Marker
      key={index}
      title={info.airport_name}
      position={{lat: info.lat, lng: info.lng}}
      onClick={e => setSelectedIndex(index)}
    >
      {(selectedIndex == index)
      &&
      <InfoWindow
      onCloseClick={e => setSelectedIndex(-1)}
      position={{lat: info.lat, lng: info.lng}}>
        <div>
          <div><span className="font-bold">{info.icao}</span>: {info.airport_name}</div>
          <div>W/L Ratio: {info.wl_ratio}</div>
        </div>
      </InfoWindow>
      }
      
    </Marker>
  ))

  return isLoaded ? (
    <GoogleMap
      options={options}
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      onUnmount={onUnmount}
      zoom={4}
      center={USACenter}
    >
      {statMarkers}
      
    </GoogleMap>
  ) : <div>Map is loading...</div>
}

export default StatsMap;