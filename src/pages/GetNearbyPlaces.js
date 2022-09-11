import { React, useEffect, useState } from "react";
import FireStoreServiceTrails from "../utils/services/trails/FireStoreService";
import FireStoreServiceCamps from "../utils/services/trails/FireStoreService";

function GetNearbyPlaces(props) {
  function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }

  const [id, setId] = useState([]);
  const [type, setType] = useState([]);
  const [items, setItems] = useState([]);
  const [poslng, setLong] = useState();
  const [poslat, setLat] = useState();

  const setPosition = async () => {
    if (type == "trail") {
      FireStoreServiceTrails.getTrail(id).then((response) => {
        setLong(response.data().longitude);
        setLat(response.data().latitude);
      });
    } else if (type == "camp") {
      FireStoreServiceCamps.getCamp(id).then((response) => {
        setLong(response.data().longitude);
        setLat(response.data().latitude);
      });
    }
  };
  const getList = async () => {
    if (type == "trail") {
      const data = await FireStoreServiceCamps.getAllCamps();
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else if ((type = "camp")) {
      const data = await FireStoreServiceTrails.getAllTrails();
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  useEffect(() => {
    setId(props.id);
    setType(props.type);
    setPosition();
    getList();
  }, [props]);

  return (
    <div>
      {items.length == 0 ? <p>No Nearby Places</p> : ""}
      {items.map((item) => {
        if (
          distance(poslat, poslng, item.latitude, item.longitude, "K") <= 10
        ) {
          if (type == "trail") {
            return (
              <a
                href={"/display-camp/" + item.id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6 className="text-center">{item.campName}</h6>
              </a>
            );
          } else if (type == "camp") {
            return (
              <a
                href={"/display-trail/" + item.id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6 className="text-center">{item.trailName}</h6>
              </a>
            );
          }
        }
      })}
    </div>
  );
}

export default GetNearbyPlaces;
