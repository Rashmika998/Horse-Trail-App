import React, { useEffect, useState, useLayoutEffect, useMemo } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Card, Button } from "react-bootstrap";

function Map(props) {
  const [markers, setMarkers] = useState([]);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    setMarkers(props.markers);
    setCamps(props.camps);
  }, [props]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD4AcqWdeEZSHk-0EfLG_lSWln2Crg1NF8",
  });

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  

  if (!isLoaded) return <div>Loading...</div>;
  if (markers.length == 0 || camps.length == 0) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();
          camps.map(({ longitude, latitude }) => {
            var lng = parseFloat(longitude);
            var lat = parseFloat(latitude);
            bounds.extend({ lat: lat, lng: lng });
          });
          map.fitBounds(bounds);
          map.setZoom(10);
        }}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
      >
        {camps.map(
          ({
            id,
            longitude,
            latitude,
            campName,
            parkName,
            campType,
          }) => {
            const LatLng = { lat: Number(latitude), lng: Number(longitude) };

            return (
              <MarkerF
                key={id}
                label={campName[0]}
                position={LatLng}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)} >
                    <Card style={{ width: "18rem" }}>
                      <Card.Body>
                        <Card.Text>{parkName}</Card.Text>

                        <Card.Title>{campName}</Card.Title>
                       
                        <a href={"/camp-info/" + id}>
                          <Button variant="secondary">View Camp Info</Button>
                        </a>
                      </Card.Body>
                    </Card>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            );
          }
        )}
      </GoogleMap>
    </>
  );
}

export default Map;
