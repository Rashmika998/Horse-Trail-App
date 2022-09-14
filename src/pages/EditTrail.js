import React, { useState, useEffect } from "react";
import FireStoreService from "../utils/services/trails/FireStoreService";
import { useAuth } from "../contexts/AuthContext";

export default function EditTrail() {
  const { currentUser } = useAuth();
  const [userID, setUserID] = useState();

  const [atvOrOffroad, setAtvOrOffroad] = useState("Yes");
  const [bikers, setBikers] = useState("Yes");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [dogs, setDogs] = useState("Yes");
  const [elevationGain, setElevationGain] = useState("");
  const [hikers, setHikers] = useState("Yes");
  const [keywords, setKeywords] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [miles, setMiles] = useState("");
  const [parkName, setParkName] = useState("");
  const [parkingNotes, setParkingNotes] = useState("");
  const [parkingSpots, setParkingSpots] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [state, setState] = useState("Alabama");
  const [trailMap, setTrailMap] = useState("");
  const [trailName, setTrailName] = useState("");
  const [trailNotes, setTrailNotes] = useState("");
  const [trailType, setTrailType] = useState("Loop");
  const [errorTrailDetails, setErrorTrailDetails] = useState("");
  const [trailUpdated, setTrailUpdated] = useState("");
  const [trailBannerUpdated, setTrailBannerUpdated] = useState("");
  const [trailParkingUpdated, setTrailParkingUpdated] = useState("");
  const [trailMapUpdated, setTrailMapUpdated] = useState("");
  const [trailGal1Updated, setTrailGal1Updated] = useState("");
  const [trailGal2Updated, setTrailGal2Updated] = useState("");
  const [trailGal3Updated, setTrailGal3Updated] = useState("");

  const [trailHeadCheck, setTrailHead] = useState({
    trailHead: [],
  });
  const [obstaclesCheck, setObstacles] = useState({
    obstacles: [],
  });
  const [bestSeasonsCheck, setBestSeasons] = useState({
    bestSeasons: [],
  });

  const [imageGal1, setImageGal1] = useState("");
  const [imageGal2, setImageGal2] = useState("");
  const [imageGal3, setImageGal3] = useState("");
  const [gpx, setGpx] = useState("");
  const [banner, setBanner] = useState("");
  const [parkingImage, setParkingImage] = useState("");
  const [trailMapImage, setTrailMapImage] = useState("");

  const [trailDetails, setTrailDetails] = useState({});
  const [trailID, setTrailID] = useState("");
  const [stateChange, setStateChange] = useState(false);

  useEffect(() => {
    var url = document.location.href;
    var trailID = url.toString().split("/")[4];
    if (currentUser) {
      setUserID(currentUser.uid);
    } else {
      setUserID(null);
    }
    setTrailID(trailID);
    FireStoreService.getTrail(trailID)
      .then((response) => {
        setTrailDetails(response.data());
        setStateChange(true);
        setAtvOrOffroad(response.data().atvOrOffroad);
        setBanner(response.data().bannerName);
        setBestSeasons(response.data().bestSeasonsCheck);
        setBikers(response.data().bikers);
        setCity(response.data().city);
        setCountry(response.data().country);
        setDescription(response.data().description);
        setDogs(response.data().dogs);
        setElevationGain(response.data().elevationGain);
        setGpx(response.data().gpx);
        setHikers(response.data().hikers);
        setImageGal1(response.data().imageGal1Name);
        setImageGal2(response.data().imageGal2Name);
        setImageGal3(response.data().imageGal3Name);
        setKeywords(response.data().keywords);
        setLongitude(response.data().longitude);
        setLatitude(response.data().latitude);
        setMiles(response.data().miles);
        setObstacles(response.data().obstaclesCheck);
        setParkName(response.data().parkName);
        setParkingImage(response.data().parkingImageName);
        setParkingNotes(response.data().parkingNotes);
        setParkingSpots(response.data().parkingSpots);
        setRestrictions(response.data().restrictions);
        setState(response.data().state);
        setTrailHead(response.data().trailHeadCheck);
        setTrailMap(response.data().trailMap);
        setTrailMapImage(response.data().trailMapName);
        setTrailName(response.data().trailName);
        setTrailNotes(response.data().trailNotes);
        setTrailType(response.data().trailType);
        setSelects();
        setCheckBoxes();
        const pathBanner = response.data().trailName;
        FireStoreService.getTrailImages(
          "banners/" + pathBanner,
          response.data().bannerName
        )
          .then((res) => {
            const bannerImg = document.getElementById("banner");
            bannerImg.setAttribute("href", res);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
          response.data().imageGal1Name
        )
          .then((gal1) => {
            const imageGal1 = document.getElementById("imageGal1");
            imageGal1.setAttribute("href", gal1);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
          response.data().imageGal2Name
        )
          .then((gal2) => {
            const imageGal2 = document.getElementById("imageGal2");
            imageGal2.setAttribute("href", gal2);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "gallery/" + response.data().trailName,
          response.data().imageGal3Name
        )
          .then((gal3) => {
            const imageGal3 = document.getElementById("imageGal3");
            imageGal3.setAttribute("href", gal3);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "parking/" + response.data().trailName,
          response.data().parkingImageName
        )
          .then((parkingImg) => {
            const parkingImage = document.getElementById("parkingImage");
            parkingImage.setAttribute("href", parkingImg);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getTrailImages(
          "trailMap/" + response.data().trailName,
          response.data().trailMapName
        )
          .then((trailMapImg) => {
            const trailMapImage = document.getElementById("trailMapImage");
            trailMapImage.setAttribute("href", trailMapImg);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {});
  }, [stateChange]);

  function validateLatLng(lat, lng) {
    let pattern = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}");

    return pattern.test(lat) && pattern.test(lng);
  }

  const handleCheckChangeOne = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { trailHead } = trailHeadCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setTrailHead({
        trailHead: [...trailHead, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setTrailHead({
        trailHead: trailHead.filter((e) => e !== value),
      });
    }
  };

  const handleCheckChangeTwo = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { obstacles } = obstaclesCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setObstacles({
        obstacles: [...obstacles, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setObstacles({
        obstacles: obstacles.filter((e) => e !== value),
      });
    }
  };

  const handleCheckChangeThree = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { bestSeasons } = bestSeasonsCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setBestSeasons({
        bestSeasons: [...bestSeasons, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setBestSeasons({
        bestSeasons: bestSeasons.filter((e) => e !== value),
      });
    }
  };

  function setSelects() {
    const loop = document.getElementById("loop");
    const outBack = document.getElementById("outBack");
    const lollipop = document.getElementById("lollipop");
    const oneWay = document.getElementById("oneWay");
    const hikersYes = document.getElementById("hikersYes");
    const hikersNo = document.getElementById("hikersNo");
    const bikersYes = document.getElementById("bikersYes");
    const bikersNo = document.getElementById("bikersNo");
    const dogsYes = document.getElementById("dogsYes");
    const dogsNo = document.getElementById("dogsNo");
    const atvYes = document.getElementById("atvYes");
    const atvNo = document.getElementById("atvNo");
    const Alabama = document.getElementById("Alabama");
    const Alaska = document.getElementById("Alaska");
    const Arizona = document.getElementById("Arizona");
    const Arkansas = document.getElementById("Arkansas");
    const California = document.getElementById("California");
    const Colorado = document.getElementById("Colorado");
    const Connecticut = document.getElementById("Connecticut");
    const Delaware = document.getElementById("Delaware");
    const DistrictofColumbia = document.getElementById("District of Columbia");
    const Florida = document.getElementById("Florida");
    const Geogia = document.getElementById("Geogia");
    const Hawaii = document.getElementById("Hawaii");
    const Idaho = document.getElementById("Idaho");
    const Illinois = document.getElementById("Illinois");
    const Indiana = document.getElementById("Indiana");
    const Iowa = document.getElementById("Iowa");
    const Kansas = document.getElementById("Kansas");
    const Kentucky = document.getElementById("Kentucky");
    const Lousiana = document.getElementById("Lousiana");
    const Maine = document.getElementById("Maine");
    const Maryland = document.getElementById("Maryland");
    const Massachusetts = document.getElementById("Massachusetts");
    const Michigan = document.getElementById("Michigan");
    const Minnesota = document.getElementById("Minnesota");
    const Mississippi = document.getElementById("Mississippi");
    const Missouri = document.getElementById("Missouri");
    const Montana = document.getElementById("Montana");
    const Nebraska = document.getElementById("Nebraska");
    const Nevada = document.getElementById("Nevada");
    const NewHampshire = document.getElementById("New Hampshire");
    const NewJersey = document.getElementById("New Jersey");
    const NewMexico = document.getElementById("Alabama");
    const NewYork = document.getElementById("New York");
    const NorthCarolina = document.getElementById("North Carolina");
    const NorthDakota = document.getElementById("North Dakota");
    const Ohio = document.getElementById("Ohio");
    const Oklahoma = document.getElementById("Oklahoma");
    const Oregon = document.getElementById("Oregon");
    const Pennsylvania = document.getElementById("Pennsylvania");
    const RhodeIsland = document.getElementById("Rhode Island");
    const SouthCarolina = document.getElementById("South Carolina");
    const SouthDakota = document.getElementById("South Dakota");
    const Tennessee = document.getElementById("Tennessee");
    const Texas = document.getElementById("Texas");
    const Utah = document.getElementById("Utah");
    const Vermont = document.getElementById("Vermont");
    const Virginia = document.getElementById("Virginia");
    const Washington = document.getElementById("Washington");
    const WestVirginia = document.getElementById("West Virginia");
    const Wesconsin = document.getElementById("Wesconsin");
    const Wyoming = document.getElementById("Wyoming");

    if (trailDetails.trailType === "Loop") {
      loop.setAttribute("selected", true);
    } else if (trailDetails.trailType === "Out & Back") {
      outBack.setAttribute("selected", true);
    } else if (trailDetails.trailType === "Lollipop") {
      lollipop.setAttribute("selected", true);
    } else if (trailDetails.trailType === "One Way") {
      oneWay.setAttribute("selected", true);
    }

    if (trailDetails.hikers === "Yes") {
      hikersYes.setAttribute("selected", true);
    } else if (trailDetails.hikers === "No") {
      hikersNo.setAttribute("selected", true);
    }

    if (trailDetails.bikers === "Yes") {
      bikersYes.setAttribute("selected", true);
    } else if (trailDetails.bikers === "No") {
      bikersNo.setAttribute("selected", true);
    }

    if (trailDetails.dogs === "Yes") {
      dogsYes.setAttribute("selected", true);
    } else if (trailDetails.dogs === "No") {
      dogsNo.setAttribute("selected", true);
    }

    if (trailDetails.atvOrOffroad === "Yes") {
      atvYes.setAttribute("selected", true);
    } else if (trailDetails.atvOrOffroad === "No") {
      atvNo.setAttribute("selected", true);
    }

    if (trailDetails.state === "Alabama") {
      Alabama.setAttribute("selected", true);
    } else if (trailDetails.state === "Alaska") {
      Alaska.setAttribute("selected", true);
    } else if (trailDetails.state === "Arizona") {
      Arizona.setAttribute("selected", true);
    } else if (trailDetails.state === "Arkansas") {
      Arkansas.setAttribute("selected", true);
    } else if (trailDetails.state === "California") {
      California.setAttribute("selected", true);
    } else if (trailDetails.state === "Colorado") {
      Colorado.setAttribute("selected", true);
    } else if (trailDetails.state === "Connecticut") {
      Connecticut.setAttribute("selected", true);
    } else if (trailDetails.state === "Delaware") {
      Delaware.setAttribute("selected", true);
    } else if (trailDetails.state === "District of Columbia") {
      DistrictofColumbia.setAttribute("selected", true);
    } else if (trailDetails.state === "Florida") {
      Florida.setAttribute("selected", true);
    } else if (trailDetails.state === "Geogia") {
      Geogia.setAttribute("selected", true);
    } else if (trailDetails.state === "Hawaii") {
      Hawaii.setAttribute("selected", true);
    } else if (trailDetails.state === "Idaho") {
      Idaho.setAttribute("selected", true);
    } else if (trailDetails.state === "Illinois") {
      Illinois.setAttribute("selected", true);
    } else if (trailDetails.state === "Indiana") {
      Indiana.setAttribute("selected", true);
    } else if (trailDetails.state === "Iowa") {
      Iowa.setAttribute("selected", true);
    } else if (trailDetails.state === "Kansas") {
      Kansas.setAttribute("selected", true);
    } else if (trailDetails.state === "Kentucky") {
      Kentucky.setAttribute("selected", true);
    } else if (trailDetails.state === "Lousiana") {
      Lousiana.setAttribute("selected", true);
    } else if (trailDetails.state === "Geogia") {
      Geogia.setAttribute("selected", true);
    } else if (trailDetails.state === "Maine") {
      Maine.setAttribute("selected", true);
    } else if (trailDetails.state === "Maryland") {
      Maryland.setAttribute("selected", true);
    } else if (trailDetails.state === "Massachusetts") {
      Massachusetts.setAttribute("selected", true);
    } else if (trailDetails.state === "Michigan") {
      Michigan.setAttribute("selected", true);
    } else if (trailDetails.state === "Minnesota") {
      Minnesota.setAttribute("selected", true);
    } else if (trailDetails.state === "Mississippi") {
      Mississippi.setAttribute("selected", true);
    } else if (trailDetails.state === "Missouri") {
      Missouri.setAttribute("selected", true);
    } else if (trailDetails.state === "Montana") {
      Montana.setAttribute("selected", true);
    } else if (trailDetails.state === "Nebraska") {
      Nebraska.setAttribute("selected", true);
    } else if (trailDetails.state === "Nevada") {
      Nevada.setAttribute("selected", true);
    } else if (trailDetails.state === "New Hampshire") {
      NewHampshire.setAttribute("selected", true);
    } else if (trailDetails.state === "New Jersey") {
      NewJersey.setAttribute("selected", true);
    } else if (trailDetails.state === "New Mexico") {
      NewMexico.setAttribute("selected", true);
    } else if (trailDetails.state === "New York") {
      NewYork.setAttribute("selected", true);
    } else if (trailDetails.state === "North Carolina") {
      NorthCarolina.setAttribute("selected", true);
    } else if (trailDetails.state === "North Dakota") {
      NorthDakota.setAttribute("selected", true);
    } else if (trailDetails.state === "Ohio") {
      Ohio.setAttribute("selected", true);
    } else if (trailDetails.state === "Oklahoma") {
      Oklahoma.setAttribute("selected", true);
    } else if (trailDetails.state === "Oregon") {
      Oregon.setAttribute("selected", true);
    } else if (trailDetails.state === "Pennsylvania") {
      Pennsylvania.setAttribute("selected", true);
    } else if (trailDetails.state === "Rhode Island") {
      RhodeIsland.setAttribute("selected", true);
    } else if (trailDetails.state === "South Carolina") {
      SouthCarolina.setAttribute("selected", true);
    } else if (trailDetails.state === "South Dakota") {
      SouthDakota.setAttribute("selected", true);
    } else if (trailDetails.state === "Tennessee") {
      Tennessee.setAttribute("selected", true);
    } else if (trailDetails.state === "Texas") {
      Texas.setAttribute("selected", true);
    } else if (trailDetails.state === "Utah") {
      Utah.setAttribute("selected", true);
    } else if (trailDetails.state === "Vermont") {
      Vermont.setAttribute("selected", true);
    } else if (trailDetails.state === "Virginia") {
      Virginia.setAttribute("selected", true);
    } else if (trailDetails.state === "Washington") {
      Washington.setAttribute("selected", true);
    } else if (trailDetails.state === "West Virginia") {
      WestVirginia.setAttribute("selected", true);
    } else if (trailDetails.state === "Wesconsin") {
      Wesconsin.setAttribute("selected", true);
    } else if (trailDetails.state === "Wyoming") {
      Wyoming.setAttribute("selected", true);
    }
  }

  function setCheckBoxes() {
    const restrooms = document.getElementById("restrooms");
    const water = document.getElementById("water");
    const corrals = document.getElementById("corrals");
    const noneTrail = document.getElementById("noneTrail");
    const bridges = document.getElementById("bridges");
    const waterCrossings = document.getElementById("waterCrossings");
    const rocks = document.getElementById("rocks");
    const noneObs = document.getElementById("noneObs");
    const spring = document.getElementById("spring");
    const summer = document.getElementById("summer");
    const fall = document.getElementById("fall");
    const winter = document.getElementById("winter");
    for (var i = 0; i < trailDetails.trailHeadCheck.trailHead.length; i++) {
      if (trailDetails.trailHeadCheck.trailHead[i] === "Restrooms") {
        restrooms.setAttribute("checked", true);
      } else if (trailDetails.trailHeadCheck.trailHead[i] === "Water") {
        water.setAttribute("checked", true);
      } else if (trailDetails.trailHeadCheck.trailHead[i] === "Corrals") {
        corrals.setAttribute("checked", true);
      } else if (trailDetails.trailHeadCheck.trailHead[i] === "None") {
        noneTrail.setAttribute("checked", true);
      }
    }

    for (var i = 0; i < trailDetails.obstaclesCheck.obstacles.length; i++) {
      if (trailDetails.obstaclesCheck.obstacles[i] === "Bridges") {
        bridges.setAttribute("checked", true);
      } else if (
        trailDetails.obstaclesCheck.obstacles[i] === "Water Crossings"
      ) {
        waterCrossings.setAttribute("checked", true);
      } else if (trailDetails.obstaclesCheck.obstacles[i] === "Rocks") {
        rocks.setAttribute("checked", true);
      } else if (trailDetails.obstaclesCheck.obstacles[i] === "None") {
        noneObs.setAttribute("checked", true);
      }
    }

    for (var i = 0; i < trailDetails.bestSeasonsCheck.bestSeasons.length; i++) {
      if (trailDetails.bestSeasonsCheck.bestSeasons[i] === "Spring") {
        spring.setAttribute("checked", true);
      } else if (trailDetails.bestSeasonsCheck.bestSeasons[i] === "Summer") {
        summer.setAttribute("checked", true);
      } else if (trailDetails.bestSeasonsCheck.bestSeasons[i] === "Fall") {
        fall.setAttribute("checked", true);
      } else if (trailDetails.bestSeasonsCheck.bestSeasons[i] === "Winter") {
        winter.setAttribute("checked", true);
      }
    }
  }

  function onSubmitTrailDetails(e) {
    e.preventDefault();
    if (validateLatLng(parseFloat(latitude), parseFloat(longitude))) {
      FireStoreService.updateTrailDetails(
        trailID,
        atvOrOffroad,
        bestSeasonsCheck,
        bikers,
        city,
        country,
        description,
        dogs,
        elevationGain,
        hikers,
        keywords,
        longitude,
        latitude,
        miles,
        obstaclesCheck,
        parkName,
        parkingNotes,
        parkingSpots,
        restrictions,
        state,
        trailHeadCheck,
        trailMap,
        trailName,
        trailNotes,
        trailType,
        userID
      )
        .then(() => {
          setTrailUpdated("Trail updated successfully!");
          setAtvOrOffroad("Yes");
          setBanner("");
          setBestSeasons({});
          setBikers("Yes");
          setCity("");
          setCountry("");
          setDescription("");
          setDogs("Yes");
          setElevationGain("");
          setHikers("Yes");
          setImageGal1("");
          setImageGal2("");
          setImageGal3("");
          setKeywords("");
          setLongitude("");
          setLatitude("");
          setMiles("");
          setObstacles({});
          setParkName("");
          setParkingImage("");
          setParkingNotes("");
          setParkingSpots("");
          setRestrictions("");
          setState("");
          setTrailHead({});
          setTrailMap("");
          setTrailMapImage("");
          setTrailName("");
          setTrailNotes("");
          setTrailType("");
          stateChange ? setStateChange(false) : setStateChange(true);
        })
        .catch((e) => {
          setErrorTrailDetails("Error occured");
          console.log(e.message);
        });
    } else {
      setErrorTrailDetails(
        "Error! Entered longitude and latitude values are invalid"
      );
    }
  }

  function onSubmitBannerImage(e) {
    e.preventDefault();
    if (
      banner.type === "image/jpeg" ||
      banner.type === "image/jpg" ||
      banner.type === "image/bmp" ||
      banner.type === "image/png" ||
      banner.type === "image/webp"
    ) {
      FireStoreService.updateTrailImages(
        trailID,
        "banner",
        banner.name,
        trailName,
        banner
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setBanner("");
          setTrailBannerUpdated("Banner image updated successfully");
        })
        .catch((e) => {
          setErrorTrailDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorTrailDetails("Uploaded banner image format is invalid!");
    }
  }

  function onSubmitParkingImage(e) {
    e.preventDefault();
    if (
      parkingImage.type === "image/png" ||
      parkingImage.type === "image/jpg" ||
      parkingImage.type === "image/jpeg"
    ) {
      FireStoreService.updateTrailImages(
        trailID,
        "parking",
        parkingImage.name,
        trailName,
        parkingImage
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setParkingImage("");
          setTrailParkingUpdated("Parking image updated successfully");
        })
        .catch((e) => {
          setErrorTrailDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorTrailDetails("Uploaded parking image format is invalid!");
    }
  }
  function onSubmitGallery1Image(e) {
    e.preventDefault();
    if (
      imageGal1.type === "image/png" ||
      imageGal1.type === "image/jpg" ||
      imageGal1.type === "image/jpeg"
    ) {
      FireStoreService.updateTrailImages(
        trailID,
        "gal01",
        imageGal1.name,
        trailName,
        imageGal1
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setImageGal1("");
          setTrailGal1Updated("Gallery image updated successfully");
        })
        .catch((e) => {
          setErrorTrailDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorTrailDetails("Uploaded gallery image format is invalid!");
    }
  }
  function onSubmitGallery2Image(e) {
    e.preventDefault();
    if (
      imageGal2.type === "image/png" ||
      imageGal2.type === "image/jpg" ||
      imageGal2.type === "image/jpeg"
    ) {
      FireStoreService.updateTrailImages(
        trailID,
        "gal02",
        imageGal2.name,
        trailName,
        imageGal2
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setImageGal2("");
          setTrailGal2Updated("Gallery image updated successfully");
        })
        .catch((e) => {
          setErrorTrailDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorTrailDetails("Uploaded gallery image format is invalid!");
    }
  }
  function onSubmitGallery3Image(e) {
    e.preventDefault();
    if (
      imageGal3.type === "image/png" ||
      imageGal3.type === "image/jpg" ||
      imageGal3.type === "image/jpeg"
    ) {
      FireStoreService.updateTrailImages(
        trailID,
        "gal03",
        imageGal3.name,
        trailName,
        imageGal3
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setImageGal3("");
          setTrailGal3Updated("Gallery image updated successfully");
        })
        .catch((e) => {
          setErrorTrailDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorTrailDetails("Uploaded gallery image format is invalid!");
    }
  }
  function onSubmitMapImage(e) {
    e.preventDefault();
    if (
      trailMapImage.type === "image/png" ||
      trailMapImage.type === "image/jpg" ||
      trailMapImage.type === "image/jpeg"
    ) {
      FireStoreService.updateTrailImages(
        trailID,
        "map",
        trailMapImage.name,
        trailName,
        trailMapImage
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setTrailMapImage("");
          setTrailMapUpdated("Trail map image updated successfully");
        })
        .catch((e) => {
          setErrorTrailDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorTrailDetails("Uploaded trail map image format is invalid!");
    }
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              Edit Trail Details
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Trial Type</label>
                      <select
                        className="form-control"
                        name="trialType"
                        onChange={(e) => {
                          setTrailType(e.target.value);
                        }}
                      >
                        <option id="loop" value="Loop">
                          Loop
                        </option>
                        <option id="outBack" value="Out & Back">
                          Out & Back
                        </option>
                        <option id="lollipop" value="Lollipop">
                          Lollipop
                        </option>
                        <option id="oneWay" value="One Way">
                          One Way
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Restrictions
                      </label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="restrictions"
                        placeholder="Enter the Restrictions"
                        onChange={(e) => {
                          setRestrictions(e.target.value);
                        }}
                        value={restrictions}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Park Name</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="parkName"
                        placeholder="Enter the Park name"
                        onChange={(e) => {
                          setParkName(e.target.value);
                        }}
                        value={parkName}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Hikers</label>
                      <select
                        className="form-control"
                        name="hikers"
                        onChange={(e) => {
                          setHikers(e.target.value);
                        }}
                      >
                        <option id="hikersYes" value="Yes">
                          Yes
                        </option>
                        <option id="hikersNo" value="No">
                          No
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Trail Name</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="trailName"
                        placeholder="Enter the Trail name"
                        onChange={(e) => {
                          setTrailName(e.target.value);
                        }}
                        value={trailName}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Bikers</label>
                      <select
                        className="form-control"
                        name="bikers"
                        onChange={(e) => {
                          setBikers(e.target.value);
                        }}
                      >
                        <option id="bikersYes" value="Yes">
                          Yes
                        </option>
                        <option id="bikersNo" value="No">
                          No
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>City</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Enter the City"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                        value={city}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Dogs</label>
                      <select
                        className="form-control"
                        name="dogs"
                        onChange={(e) => {
                          setDogs(e.target.value);
                        }}
                      >
                        <option id="dogsYes" value="Yes">
                          Yes
                        </option>
                        <option id="dogsNo" value="No">
                          No
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>State</label>
                      <select
                        className="form-control"
                        name="state"
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                      >
                        <option id="Alabama" value="Alabama">
                          Alabama
                        </option>
                        <option id="Alaska" value="Alaska">
                          Alaska
                        </option>
                        <option id="Arizona" value="Arizona">
                          Arizona
                        </option>
                        <option id="Arkansas" value="Arkansas">
                          Arkansas
                        </option>
                        <option id="California" value="California">
                          California
                        </option>
                        <option id="Colorado" value="Colorado">
                          Colorado
                        </option>
                        <option id="Connecticut" value="Connecticut">
                          Connecticut
                        </option>
                        <option id="Delaware" value="Delaware">
                          Delaware
                        </option>
                        <option
                          id="District of Columbia"
                          value="District of Columbia"
                        >
                          District of Columbia
                        </option>
                        <option id="Florida" value="Florida">
                          Florida
                        </option>
                        <option id="Geogia" value="Geogia">
                          Geogia
                        </option>
                        <option id="Hawaii" value="Hawaii">
                          Hawaii
                        </option>
                        <option id="Idaho" value="Idaho">
                          Idaho
                        </option>
                        <option id="Illinois" value="Illinois">
                          Illinois
                        </option>
                        <option id="Indiana" value="Indiana">
                          Indiana
                        </option>
                        <option id="Iowa" value="Iowa">
                          Iowa
                        </option>
                        <option id="Kansas" value="Kansas">
                          Kansas
                        </option>
                        <option id="Kentucky" value="Kentucky">
                          Kentucky
                        </option>
                        <option id="Lousiana" value="Lousiana">
                          Lousiana
                        </option>
                        <option id="Geogia" value="Geogia">
                          Geogia
                        </option>
                        <option id="Maine" value="Maine">
                          Maine
                        </option>
                        <option id="Maryland" value="Maryland">
                          Maryland
                        </option>
                        <option id="Massachusetts" value="Massachusetts">
                          Massachusetts
                        </option>
                        <option id="Michigan" value="Michigan">
                          Michigan
                        </option>
                        <option id="Minnesota" value="Minnesota">
                          Minnesota
                        </option>
                        <option id="Mississippi" value="Mississippi">
                          Mississippi
                        </option>
                        <option id="Missouri" value="Missouri">
                          Missouri
                        </option>
                        <option id="Montana" value="Montana">
                          Montana
                        </option>
                        <option id="Nebraska" value="Nebraska">
                          Nebraska
                        </option>
                        <option id="Nevada" value="Nevada">
                          Nevada
                        </option>
                        <option id="New Hampshire" value="New Hampshire">
                          New Hampshire
                        </option>
                        <option id="New Jersey" value="New Jersey">
                          New Jersey
                        </option>
                        <option id="New Mexico" value="New Mexico">
                          New Mexico
                        </option>
                        <option id="New York" value="New York">
                          New York
                        </option>
                        <option id="North Carolina" value="North Carolina">
                          North Carolina
                        </option>
                        <option id="North Dakota" value="North Dakota">
                          North Dakota
                        </option>
                        <option id="Ohio" value="Ohio">
                          Ohio
                        </option>
                        <option id="Oklahoma" value="Oklahoma">
                          Oklahoma
                        </option>
                        <option id="Oregon" value="Oregon">
                          Oregon
                        </option>
                        <option id="Pennsylvania" value="Pennsylvania">
                          Pennsylvania
                        </option>
                        <option id="Rhode Island" value="Rhode Island">
                          Rhode Island
                        </option>
                        <option id="South Carolina" value="South Carolina">
                          South Carolina
                        </option>
                        <option id="South Dakota" value="South Dakota">
                          South Dakota
                        </option>
                        <option id="Tennessee" value="Tennessee">
                          Tennessee
                        </option>
                        <option id="Texas" value="Texas">
                          Texas
                        </option>
                        <option id="Utah" value="Utah">
                          Utah
                        </option>
                        <option id="Vermont" value="Vermont">
                          Vermont
                        </option>
                        <option id="Virginia" value="Virginia">
                          Virginia
                        </option>
                        <option id="Washington" value="Washington">
                          Washington
                        </option>
                        <option id="West Virginia" value="West Virginia">
                          West Virginia
                        </option>
                        <option id="Wesconsin" value="Wesconsin">
                          Wesconsin
                        </option>
                        <option id="Wyoming" value="Wyoming">
                          Wyoming
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        ATV/Off-road
                      </label>
                      <select
                        className="form-control"
                        name="atv/off-road"
                        onChange={(e) => {
                          setAtvOrOffroad(e.target.value);
                        }}
                      >
                        <option id="atvYes" value="Yes">
                          Yes
                        </option>
                        <option id="atvNo" value="No">
                          No
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Country</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Enter the Country"
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                        value={country}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Miles</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="miles"
                        placeholder="Enter the Miles"
                        onChange={(e) => {
                          setMiles(e.target.value);
                        }}
                        value={miles}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-4">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Elevation Gain
                      </label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="elevationGain"
                        placeholder="Enter the Elevation Gain"
                        onChange={(e) => {
                          setElevationGain(e.target.value);
                        }}
                        value={elevationGain}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-4">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Trail Map Link
                      </label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="trailMap"
                        placeholder="Enter the Trail Map Link"
                        onChange={(e) => {
                          setTrailMap(e.target.value);
                        }}
                        value={trailMap}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Parking Spots
                      </label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="parkingSpots"
                        placeholder="Enter the Parking Spots"
                        onChange={(e) => {
                          setParkingSpots(e.target.value);
                        }}
                        value={parkingSpots}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Longitude</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="longitude"
                        placeholder="Enter the Longitude"
                        onChange={(e) => {
                          setLongitude(e.target.value);
                        }}
                        value={longitude}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Latitude</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="latitude"
                        placeholder="Enter the Trail Latitude"
                        onChange={(e) => {
                          setLatitude(e.target.value);
                        }}
                        value={latitude}
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="form-check" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trailhead</label>
                  <div className="row">
                    <div className="col md-3">
                      <label>
                        <input
                          id="restrooms"
                          type="checkbox"
                          className="form-check-input"
                          name="trailHead"
                          value="Restrooms"
                          onChange={handleCheckChangeOne}
                        />
                        &nbsp;Restrooms
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="water"
                          type="checkbox"
                          className="form-check-input"
                          name="trailHead"
                          value="Water"
                          onChange={handleCheckChangeOne}
                        />
                        &nbsp;Water
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="corrals"
                          type="checkbox"
                          className="form-check-input"
                          name="trailHead"
                          value="Corrals"
                          onChange={handleCheckChangeOne}
                        />
                        &nbsp;Corrals
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="noneTrail"
                          type="checkbox"
                          className="form-check-input"
                          name="trailHead"
                          value="None"
                          onChange={handleCheckChangeOne}
                        />
                        &nbsp;None
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-check" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Obstacles</label>
                  <div className="row">
                    <div className="col md-3">
                      <label>
                        <input
                          id="bridges"
                          type="checkbox"
                          className="form-check-input"
                          name="obstacles"
                          value="Bridges"
                          onChange={handleCheckChangeTwo}
                        />
                        &nbsp;Bridges
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="waterCrossings"
                          type="checkbox"
                          className="form-check-input"
                          name="obstacles"
                          value="Water Crossings"
                          onChange={handleCheckChangeTwo}
                        />
                        &nbsp;Water Crossings
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="rocks"
                          type="checkbox"
                          className="form-check-input"
                          name="obstacles"
                          value="Rocks"
                          onChange={handleCheckChangeTwo}
                        />
                        &nbsp;Rocks
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="noneObs"
                          type="checkbox"
                          className="form-check-input"
                          name="obstacles"
                          value="None"
                          onChange={handleCheckChangeTwo}
                        />
                        &nbsp;None
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-check" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Best Seasons</label>
                  <div className="row">
                    <div className="col md-3">
                      <label>
                        <input
                          id="spring"
                          type="checkbox"
                          className="form-check-input"
                          name="bestSeasons"
                          value="Spring"
                          onChange={handleCheckChangeThree}
                        />
                        &nbsp;Spring
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="summer"
                          type="checkbox"
                          className="form-check-input"
                          name="bestSeasons"
                          value="Summer"
                          onChange={handleCheckChangeThree}
                        />
                        &nbsp;Summer
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="fall"
                          type="checkbox"
                          className="form-check-input"
                          name="bestSeasons"
                          value="Fall"
                          onChange={handleCheckChangeThree}
                        />
                        &nbsp;Fall
                      </label>
                    </div>
                    <div className="col md-3">
                      <label>
                        <input
                          id="winter"
                          type="checkbox"
                          className="form-check-input"
                          name="bestSeasons"
                          value="Winter"
                          onChange={handleCheckChangeThree}
                        />
                        &nbsp;Winter
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Parking Notes
                      </label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="parkingNotes"
                        placeholder="Enter the Parking Notes"
                        onChange={(e) => {
                          setParkingNotes(e.target.value);
                        }}
                        value={parkingNotes}
                      ></input>
                    </div>
                  </div>
                  <div className="col md-6">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Trail Notes</label>
                      <input
                        required={true}
                        type="text"
                        className="form-control"
                        name="trailNotes"
                        placeholder="Enter the Trail Notes"
                        onChange={(e) => {
                          setTrailNotes(e.target.value);
                        }}
                        value={trailNotes}
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Keywords</label>
                  <input
                    required={true}
                    type="text"
                    className="form-control"
                    name="keywords"
                    placeholder="Keywords"
                    onChange={(e) => {
                      setKeywords(e.target.value);
                    }}
                    value={keywords}
                  ></input>
                </div>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Trail Description/Comments
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  ></textarea>
                  <br></br>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitTrailDetails}
                  >
                    Update Trail Details
                  </button>
                  <br></br>
                  {trailUpdated ? (
                    <div class="alert alert-success" role="alert">
                      {trailUpdated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseTwo"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseTwo"
            >
              Update Banner Image
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingTwo"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>
                    Main Banner Photo
                  </label>
                  <a
                    id="banner"
                    target="_blank"
                    style={{ textDecoration: "none", fontSize: "12px" }}
                  >
                    &nbsp;&nbsp;View uploaded image
                  </a>
                  <input
                    type="file"
                    className="form-control"
                    name="banner"
                    onChange={(e) => {
                      setBanner(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg, bmp, png and webp files are allowed
                  </span>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitBannerImage}
                  >
                    Update Banner Image
                  </button>
                  <br></br>
                  {trailBannerUpdated ? (
                    <div class="alert alert-success" role="alert">
                      {trailBannerUpdated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              Update Parking Image
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Parking Image</label>
                  <a
                    id="parkingImage"
                    target="_blank"
                    style={{ textDecoration: "none", fontSize: "12px" }}
                  >
                    &nbsp;&nbsp;View uploaded image
                  </a>
                  <input
                    type="file"
                    className="form-control"
                    name="parkingImage"
                    onChange={(e) => {
                      setParkingImage(
                        e.target.files[0],
                        console.log(e.target.files)
                      );
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitParkingImage}
                  >
                    Update Parking Image
                  </button>
                  <br></br>
                  {trailParkingUpdated ? (
                    <div class="alert alert-success" role="alert">
                      {trailParkingUpdated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFour"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFour"
            >
              Update Trail Map Image
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingFour"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Trail Map Image</label>
                  <a
                    id="trailMapImage"
                    target="_blank"
                    style={{ textDecoration: "none", fontSize: "12px" }}
                  >
                    &nbsp;&nbsp;View uploaded image
                  </a>
                  <input
                    type="file"
                    className="form-control"
                    name="trailMapImage"
                    onChange={(e) => {
                      setTrailMapImage(e.target.files[0]);
                    }}
                  ></input>
                  <span style={{ fontSize: "12px" }}>
                    Only jpeg, jpg and png files are allowed
                  </span>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitMapImage}
                  >
                    Update Trail Map Image
                  </button>
                  <br></br>
                  {trailMapUpdated ? (
                    <div class="alert alert-success" role="alert">
                      {trailMapUpdated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseFive"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseFive"
            >
              Update Gallery Image 01
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingFive"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="row">
                  <div className="col md-4">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Image 1 for Gallery
                      </label>
                      <a
                        id="imageGal1"
                        target="_blank"
                        style={{ textDecoration: "none", fontSize: "12px" }}
                      >
                        &nbsp;&nbsp;View uploaded image
                      </a>
                      <input
                        type="file"
                        className="form-control"
                        name="imageGal1"
                        onChange={(e) => {
                          setImageGal1(e.target.files[0]);
                        }}
                      ></input>
                      <span style={{ fontSize: "12px" }}>
                        Only jpeg, jpg and png files are allowed
                      </span>
                    </div>
                  </div>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitGallery1Image}
                  >
                    Update Gallery Image 01
                  </button>
                  <br></br>
                  {trailGal1Updated ? (
                    <div class="alert alert-success" role="alert">
                      {trailGal1Updated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseSix"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseSix"
            >
              Update Gallery Image 02
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingSix"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="row">
                  <div className="col md-4">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Image 2 for Gallery
                      </label>
                      <a
                        id="imageGal2"
                        target="_blank"
                        style={{ textDecoration: "none", fontSize: "12px" }}
                      >
                        &nbsp;&nbsp;View uploaded image
                      </a>
                      <input
                        type="file"
                        className="form-control"
                        name="imageGal2"
                        onChange={(e) => {
                          setImageGal2(e.target.files[0]);
                        }}
                      ></input>
                      <span style={{ fontSize: "12px" }}>
                        Only jpeg, jpg and png files are allowed
                      </span>
                    </div>
                  </div>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitGallery2Image}
                  >
                    Update Gallery Image 02
                  </button>
                  <br></br>
                  {trailGal2Updated ? (
                    <div class="alert alert-success" role="alert">
                      {trailGal2Updated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
        <br></br>
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingSeven">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseSeven"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseSeven"
            >
              Update Gallery Image 03
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingSeven"
          >
            <div className="accordion-body">
              <form className="needs-validation" encType="multipart/form-data">
                <div className="row">
                  <div className="col md-4">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Image 3 for Gallery
                      </label>
                      <a
                        id="imageGal3"
                        target="_blank"
                        style={{ textDecoration: "none", fontSize: "12px" }}
                      >
                        &nbsp;&nbsp;View uploaded image
                      </a>
                      <input
                        type="file"
                        className="form-control"
                        name="imageGal3"
                        onChange={(e) => {
                          setImageGal3(e.target.files[0]);
                        }}
                      ></input>
                      <span style={{ fontSize: "12px" }}>
                        Only jpeg, jpg and png files are allowed
                      </span>
                    </div>
                  </div>
                </div>
                {errorTrailDetails ? (
                  <div class="alert alert-danger" role="alert">
                    {errorTrailDetails}
                  </div>
                ) : null}
                <div className="d-grid">
                  <button
                    className="btn btn-block"
                    type="submit"
                    style={{
                      marginTop: "15px",
                      backgroundColor: "#071c2f",
                      color: "white",
                    }}
                    onClick={onSubmitGallery3Image}
                  >
                    Update Gallery Image 03
                  </button>
                  <br></br>
                  {trailGal3Updated ? (
                    <div class="alert alert-success" role="alert">
                      {trailGal3Updated}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
