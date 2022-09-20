import React, { useState, useEffect } from "react";
import FireStoreService from "../utils/services/camps/FireStoreService";
import { useAuth } from "../contexts/AuthContext";

export default function EditCamp() {
  const { currentUser } = useAuth();
  const [userID, setUserID] = useState(null);
  const [campDescription, setCampDescription] = useState("");
  const [campName, setCampName] = useState("");
  const [campNotes, setCampNotes] = useState("");
  const [campType, setCampType] = useState("Any Camp Type");
  const [city, setCity] = useState("");
  const [costPerNight, setCostPerNight] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [horseSite, setHorseSite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [reservation, setReservation] = useState("Yes");
  const [keywords, setKeywords] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [paperworkRequired, setPaperworkRequired] = useState("Yes");
  const [parkName, setParkName] = useState("");
  const [petPolicy, setPetPolicy] = useState("");
  const [phone, setPhone] = useState("");
  const [reservationCall, setReservationCall] = useState("");
  const [reservationDescription, setReservationDescription] = useState("");
  const [reservationEmail, setReservationEmail] = useState("");
  const [reservationLink, setReservationLink] = useState("");
  const [resOrPricing, setResOrPricing] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [roadToCamp, setRoadToCamp] = useState("Paved Road to Camp");
  const [state, setState] = useState("Alabama");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [errorCampDetails, setErrorCampDetails] = useState("");
  const [campID, setCampID] = useState("");
  const [stateChange, setStateChange] = useState(false);
  const [campUpdated, setCampUpdated] = useState("");
  const [campBannerUpdated, setCampBannerUpdated] = useState("");
  const [campParkingUpdated, setCampParkingUpdated] = useState("");
  const [campGal1Updated, setCampGal1Updated] = useState("");
  const [campGal2Updated, setCampGal2Updated] = useState("");
  const [campGal3Updated, setCampGal3Updated] = useState("");

  const [campDetails, setCampDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setUserID(currentUser.uid);
    } else {
      setUserID(null);
    }
    var url = document.location.href;
    var campId = url.toString().split("/")[4];
    setCampID(campId);
    FireStoreService.getCamp(campId)
      .then((response) => {
        setCampDetails(response.data());
        setStateChange(true);
        setCampDescription(response.data().campDescription);
        setCampName(response.data().campName);
        setCampNotes(response.data().campNotes);
        setBestSeasons(response.data().bestSeasonsCheck);
        setCostPerNight(response.data().costPerNight);
        setCity(response.data().city);
        setEmail(response.data().email);
        setWebsite(response.data().website);
        setInstagram(response.data().instagram);
        setFacebook(response.data().facebook);
        setHorseSite(response.data().horseSite);
        setImageGal1(response.data().imageGal1Name);
        setImageGal2(response.data().imageGal2Name);
        setImageGal3(response.data().imageGal3Name);
        setKeywords(response.data().keywords);
        setLongitude(response.data().longitude);
        setLatitude(response.data().latitude);
        setReservation(response.data().reservation);
        setReservationCall(response.data().reservationCall);
        setReservationDescription(response.data().reservationDescription);
        setReservationEmail(response.data().reservationEmail);
        setReservationLink(response.data().reservationLink);
        setRoadToCamp(response.data().roadToCamp);
        setResOrPricing(response.data().resOrPricing);
        setCampSiteTypes(response.data().campSiteTypesCheck);
        setParkName(response.data().parkName);
        setParkingImage(response.data().parkingImageName);
        setTwitter(response.data().twitter);
        setAmenities(response.data().amenitiesCheck);
        setPetPolicy(response.data().petPolicy);
        setPhone(response.data().phone);
        setRestrictions(response.data().restrictions);
        setState(response.data().state);
        setReservation(response.data().reservation);
        setPaperworkRequired(response.data().paperworkRequired);
        setCampType(response.data().campType);
        setSelects();
        setCheckBoxes();
        const pathBanner = response.data().campName;
        FireStoreService.getCampImages(
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

        FireStoreService.getCampImages(
          "gallery/" + response.data().campName,
          response.data().imageGal1Name
        )
          .then((gal1) => {
            const imageGal1 = document.getElementById("imageGal1");
            imageGal1.setAttribute("href", gal1);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + response.data().campName,
          response.data().imageGal2Name
        )
          .then((gal2) => {
            const imageGal2 = document.getElementById("imageGal2");
            imageGal2.setAttribute("href", gal2);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "gallery/" + response.data().campName,
          response.data().imageGal3Name
        )
          .then((gal3) => {
            const imageGal3 = document.getElementById("imageGal3");
            imageGal3.setAttribute("href", gal3);
          })
          .catch((e) => {
            console.log(e);
          });

        FireStoreService.getCampImages(
          "parking/" + response.data().campName,
          response.data().parkingImageName
        )
          .then((parkingImg) => {
            const parkingImage = document.getElementById("parkingImage");
            parkingImage.setAttribute("href", parkingImg);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [stateChange]);

  const [campSiteTypesCheck, setCampSiteTypes] = useState({
    campSiteTypes: [],
  });
  const [amenitiesCheckTemp, setAmenities] = useState({
    amenities: [],
  });
  const [bestSeasonsCheck, setBestSeasons] = useState({
    bestSeasons: [],
  });

  const [imageGal1, setImageGal1] = useState("");
  const [imageGal2, setImageGal2] = useState("");
  const [imageGal3, setImageGal3] = useState("");
  const [banner, setBanner] = useState("");
  const [parkingImage, setParkingImage] = useState("");

  const handleCheckChangeOne = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { campSiteTypes } = campSiteTypesCheck;

    // Case 1 : The user checks the box
    if (checked) {
      setCampSiteTypes({
        campSiteTypes: [...campSiteTypes, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setCampSiteTypes({
        campSiteTypes: campSiteTypes.filter((e) => e !== value),
      });
    }
  };

  const handleCheckChangeTwo = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { amenities } = amenitiesCheckTemp;

    // Case 1 : The user checks the box
    if (checked) {
      setAmenities({
        amenities: [...amenities, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setAmenities({
        amenities: amenities.filter((e) => e !== value),
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

  function validateLatLng(lat, lng) {
    return (
      isFinite(lat) &&
      Math.abs(lat) <= 90 &&
      isFinite(lng) &&
      Math.abs(lng) <= 180
    );
  }

  function setSelects() {
    const anyCamp = document.getElementById("anyCamp");
    const publicCamp = document.getElementById("publicCamp");
    const privateCamp = document.getElementById("privateCamp");
    const reservationYes = document.getElementById("reservationYes");
    const reservationNo = document.getElementById("reservationNo");
    const paperworkRequiredYes = document.getElementById(
      "paperworkRequiredYes"
    );
    const paperworkRequiredNo = document.getElementById("paperworkRequiredNo");
    const pavedRoad = document.getElementById("pavedRoad");
    const pavedDirtyRoad = document.getElementById("pavedDirtyRoad");
    const bumpyRoad = document.getElementById("bumpyRoad");
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

    if (campDetails.campType === "Any Camp type") {
      anyCamp.setAttribute("selected", true);
    } else if (campDetails.campType === "Public Campground") {
      publicCamp.setAttribute("selected", true);
    } else if (campDetails.campType === "Private Campground") {
      privateCamp.setAttribute("selected", true);
    }

    if (campDetails.reservation === "Yes") {
      reservationYes.setAttribute("selected", true);
    } else if (campDetails.reservation === "No") {
      reservationNo.setAttribute("selected", true);
    }

    if (campDetails.roadToCamp === "Paved Road to Camp") {
      pavedRoad.setAttribute("selected", true);
    } else if (campDetails.paperworkRequired === "Paved+ some dirt road") {
      pavedDirtyRoad.setAttribute("selected", true);
    } else if (campDetails.paperworkRequired === "Lots of bumpy roads") {
      bumpyRoad.setAttribute("selected", true);
    }

    if (campDetails.paperworkRequired === "Yes") {
      paperworkRequiredYes.setAttribute("selected", true);
    } else if (campDetails.paperworkRequired === "No") {
      paperworkRequiredNo.setAttribute("selected", true);
    }

    if (campDetails.atvOrOffroad === "Yes") {
      atvYes.setAttribute("selected", true);
    } else if (campDetails.atvOrOffroad === "No") {
      atvNo.setAttribute("selected", true);
    }

    if (campDetails.state === "Alabama") {
      Alabama.setAttribute("selected", true);
    } else if (campDetails.state === "Alaska") {
      Alaska.setAttribute("selected", true);
    } else if (campDetails.state === "Arizona") {
      Arizona.setAttribute("selected", true);
    } else if (campDetails.state === "Arkansas") {
      Arkansas.setAttribute("selected", true);
    } else if (campDetails.state === "California") {
      California.setAttribute("selected", true);
    } else if (campDetails.state === "Colorado") {
      Colorado.setAttribute("selected", true);
    } else if (campDetails.state === "Connecticut") {
      Connecticut.setAttribute("selected", true);
    } else if (campDetails.state === "Delaware") {
      Delaware.setAttribute("selected", true);
    } else if (campDetails.state === "District of Columbia") {
      DistrictofColumbia.setAttribute("selected", true);
    } else if (campDetails.state === "Florida") {
      Florida.setAttribute("selected", true);
    } else if (campDetails.state === "Geogia") {
      Geogia.setAttribute("selected", true);
    } else if (campDetails.state === "Hawaii") {
      Hawaii.setAttribute("selected", true);
    } else if (campDetails.state === "Idaho") {
      Idaho.setAttribute("selected", true);
    } else if (campDetails.state === "Illinois") {
      Illinois.setAttribute("selected", true);
    } else if (campDetails.state === "Indiana") {
      Indiana.setAttribute("selected", true);
    } else if (campDetails.state === "Iowa") {
      Iowa.setAttribute("selected", true);
    } else if (campDetails.state === "Kansas") {
      Kansas.setAttribute("selected", true);
    } else if (campDetails.state === "Kentucky") {
      Kentucky.setAttribute("selected", true);
    } else if (campDetails.state === "Lousiana") {
      Lousiana.setAttribute("selected", true);
    } else if (campDetails.state === "Geogia") {
      Geogia.setAttribute("selected", true);
    } else if (campDetails.state === "Maine") {
      Maine.setAttribute("selected", true);
    } else if (campDetails.state === "Maryland") {
      Maryland.setAttribute("selected", true);
    } else if (campDetails.state === "Massachusetts") {
      Massachusetts.setAttribute("selected", true);
    } else if (campDetails.state === "Michigan") {
      Michigan.setAttribute("selected", true);
    } else if (campDetails.state === "Minnesota") {
      Minnesota.setAttribute("selected", true);
    } else if (campDetails.state === "Mississippi") {
      Mississippi.setAttribute("selected", true);
    } else if (campDetails.state === "Missouri") {
      Missouri.setAttribute("selected", true);
    } else if (campDetails.state === "Montana") {
      Montana.setAttribute("selected", true);
    } else if (campDetails.state === "Nebraska") {
      Nebraska.setAttribute("selected", true);
    } else if (campDetails.state === "Nevada") {
      Nevada.setAttribute("selected", true);
    } else if (campDetails.state === "New Hampshire") {
      NewHampshire.setAttribute("selected", true);
    } else if (campDetails.state === "New Jersey") {
      NewJersey.setAttribute("selected", true);
    } else if (campDetails.state === "New Mexico") {
      NewMexico.setAttribute("selected", true);
    } else if (campDetails.state === "New York") {
      NewYork.setAttribute("selected", true);
    } else if (campDetails.state === "North Carolina") {
      NorthCarolina.setAttribute("selected", true);
    } else if (campDetails.state === "North Dakota") {
      NorthDakota.setAttribute("selected", true);
    } else if (campDetails.state === "Ohio") {
      Ohio.setAttribute("selected", true);
    } else if (campDetails.state === "Oklahoma") {
      Oklahoma.setAttribute("selected", true);
    } else if (campDetails.state === "Oregon") {
      Oregon.setAttribute("selected", true);
    } else if (campDetails.state === "Pennsylvania") {
      Pennsylvania.setAttribute("selected", true);
    } else if (campDetails.state === "Rhode Island") {
      RhodeIsland.setAttribute("selected", true);
    } else if (campDetails.state === "South Carolina") {
      SouthCarolina.setAttribute("selected", true);
    } else if (campDetails.state === "South Dakota") {
      SouthDakota.setAttribute("selected", true);
    } else if (campDetails.state === "Tennessee") {
      Tennessee.setAttribute("selected", true);
    } else if (campDetails.state === "Texas") {
      Texas.setAttribute("selected", true);
    } else if (campDetails.state === "Utah") {
      Utah.setAttribute("selected", true);
    } else if (campDetails.state === "Vermont") {
      Vermont.setAttribute("selected", true);
    } else if (campDetails.state === "Virginia") {
      Virginia.setAttribute("selected", true);
    } else if (campDetails.state === "Washington") {
      Washington.setAttribute("selected", true);
    } else if (campDetails.state === "West Virginia") {
      WestVirginia.setAttribute("selected", true);
    } else if (campDetails.state === "Wesconsin") {
      Wesconsin.setAttribute("selected", true);
    } else if (campDetails.state === "Wyoming") {
      Wyoming.setAttribute("selected", true);
    }
  }

  function setCheckBoxes() {
    const dispersed = document.getElementById("Dispersed");
    const tentSite = document.getElementById("Tent Site");
    const rvSite = document.getElementById("Rv Site");
    const cabins = document.getElementById("Cabins");
    const corrals = document.getElementById("Corrals");
    const water = document.getElementById("Water");
    const restrooms = document.getElementById("Restrooms");
    const hookup = document.getElementById("Hookup");
    const restaurants = document.getElementById("Restaurants");
    const none = document.getElementById("None");
    const spring = document.getElementById("Spring");
    const summer = document.getElementById("Summer");
    const fall = document.getElementById("Fall");
    const winter = document.getElementById("Winter");
    for (
      var i = 0;
      i < campDetails.campSiteTypesCheck.campSiteTypes.length;
      i++
    ) {
      if (campDetails.campSiteTypesCheck.campSiteTypes[i] === "Dispersed") {
        dispersed.setAttribute("checked", true);
      } else if (
        campDetails.campSiteTypesCheck.campSiteTypes[i] === "Tent Site"
      ) {
        tentSite.setAttribute("checked", true);
      } else if (
        campDetails.campSiteTypesCheck.campSiteTypes[i] === "Rv Site"
      ) {
        rvSite.setAttribute("checked", true);
      } else if (campDetails.campSiteTypesCheck.campSiteTypes[i] === "Cabins") {
        cabins.setAttribute("checked", true);
      }
    }

    if (campDetails.amenitiesCheck.amenities.Restrooms === true) {
      restrooms.setAttribute("checked", true);
    }
    if (campDetails.amenitiesCheck.amenities.Water === true) {
      water.setAttribute("checked", true);
    }
    if (campDetails.amenitiesCheck.amenities.Corrals === true) {
      corrals.setAttribute("checked", true);
    }
    if (campDetails.amenitiesCheck.amenities.Restaurants === true) {
      restaurants.setAttribute("checked", true);
    }
    if (campDetails.amenitiesCheck.amenities.Hookup === true) {
      hookup.setAttribute("checked", true);
    }
    if (campDetails.amenitiesCheck.amenities.None === true) {
      none.setAttribute("checked", true);
    }

    for (var i = 0; i < campDetails.bestSeasonsCheck.bestSeasons.length; i++) {
      if (campDetails.bestSeasonsCheck.bestSeasons[i] === "Spring") {
        spring.setAttribute("checked", true);
      } else if (campDetails.bestSeasonsCheck.bestSeasons[i] === "Summer") {
        summer.setAttribute("checked", true);
      } else if (campDetails.bestSeasonsCheck.bestSeasons[i] === "Fall") {
        fall.setAttribute("checked", true);
      } else if (campDetails.bestSeasonsCheck.bestSeasons[i] === "Winter") {
        winter.setAttribute("checked", true);
      }
    }
  }

  function onSubmitCampDetails(e) {
    e.preventDefault();
    setLoading(true);

    const tempObj = {};
    let tempArr = amenitiesCheckTemp.amenities;
    tempObj.Corrals = false;
    tempObj.Water = false;
    tempObj.Restrooms = false;
    tempObj.Restaurants = false;
    tempObj.Hookup = false;
    tempObj.None = false;

    for (var i = 0; i < tempArr.length; i++) {
      if (amenitiesCheckTemp.amenities[i] === "Corrals") {
        tempObj.Corrals = true;
      } else if (amenitiesCheckTemp.amenities[i] === "Water") {
        tempObj.Water = true;
      } else if (amenitiesCheckTemp.amenities[i] === "Restrooms") {
        tempObj.Restrooms = true;
      } else if (amenitiesCheckTemp.amenities[i] === "Restaurants") {
        tempObj.Restaurants = true;
      } else if (amenitiesCheckTemp.amenities[i] === "Hookup") {
        tempObj.Hookup = true;
      } else if (amenitiesCheckTemp.amenities[i] === "None") {
        tempObj.None = true;
      }
    }
    const amenitiesCheck = {};
    amenitiesCheck.amenities = tempObj;

    var rePhone = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    /* Allowed phn number formats
    (123) 456-7890. (123)456-7890, 123-456-7890, 1234567890 */
    if (rePhone.test(phone) && rePhone.test(reservationCall)) {
      var reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (reEmail.test(email) && reEmail.test(reservationEmail)) {
        if (validateLatLng(latitude, longitude)) {
          FireStoreService.updateCampDetails(
            campID,
            amenitiesCheck,
            bestSeasonsCheck,
            campDescription,
            campName,
            campNotes,
            campSiteTypesCheck,
            campType,
            city,
            costPerNight,
            email,
            facebook,
            horseSite,
            instagram,
            keywords,
            longitude,
            latitude,
            paperworkRequired,
            parkName,
            petPolicy,
            phone,
            reservation,
            reservationCall,
            reservationDescription,
            reservationEmail,
            reservationLink,
            resOrPricing,
            restrictions,
            roadToCamp,
            state,
            twitter,
            userID,
            website
          )
            .then(() => {
              stateChange ? setStateChange(false) : setStateChange(true);
              setCampUpdated("Camp updated successfully!");
              setCampDescription("");
              setCampName("");
              setCampNotes("");
              setBestSeasons({});
              setCostPerNight("");
              setCity("");
              setEmail("");
              setWebsite("");
              setInstagram("");
              setFacebook("");
              setHorseSite("");
              setImageGal1("");
              setImageGal2("");
              setImageGal3("");
              setKeywords("");
              setLongitude("");
              setLatitude("");
              setReservation("Yes");
              setReservationCall("");
              setReservationDescription("");
              setReservationEmail("");
              setReservationLink("");
              setRoadToCamp("");
              setResOrPricing("");
              setCampSiteTypes("");
              setParkName("");
              setParkingImage("");
              setTwitter("");
              setAmenities("");
              setPetPolicy("");
              setPhone("");
              setRestrictions("");
              setState("");
              setReservation("");
              setPaperworkRequired("Yes");
              setCampType();
            })
            .catch((e) => {
              setErrorCampDetails("Error Occured!");
              console.log(e);
            });
        } else {
          setErrorCampDetails(
            "Error! Entered longitude or latitude values are invalid"
          );
        }
      } else {
        setErrorCampDetails("Error! Entered email address format is invalid");
      }
    } else {
      setErrorCampDetails(
        "Error! Entered phone number or reservation call format is invalid"
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
      FireStoreService.updateCampImages(
        campID,
        "banner",
        banner.name,
        campName,
        banner
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setBanner("");
          setCampBannerUpdated("Banner image updated successfully");
        })
        .catch((e) => {
          setErrorCampDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorCampDetails("Uploaded banner image format is invalid!");
    }
  }

  function onSubmitParkingImage(e) {
    e.preventDefault();
    if (
      parkingImage.type === "image/png" ||
      parkingImage.type === "image/jpg" ||
      parkingImage.type === "image/jpeg"
    ) {
      FireStoreService.updateCampImages(
        campID,
        "parking",
        parkingImage.name,
        campName,
        parkingImage
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setParkingImage("");
          setCampParkingUpdated("Parking image updated successfully");
        })
        .catch((e) => {
          setErrorCampDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorCampDetails("Uploaded parking image format is invalid!");
    }
  }
  function onSubmitGallery1Image(e) {
    e.preventDefault();
    if (
      imageGal1.type === "image/png" ||
      imageGal1.type === "image/jpg" ||
      imageGal1.type === "image/jpeg"
    ) {
      FireStoreService.updateCampImages(
        campID,
        "gal01",
        imageGal1.name,
        campName,
        imageGal1
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setImageGal1("");
          setCampGal1Updated("Gallery image updated successfully");
        })
        .catch((e) => {
          setErrorCampDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorCampDetails("Uploaded gallery image format is invalid!");
    }
  }
  function onSubmitGallery2Image(e) {
    e.preventDefault();
    if (
      imageGal2.type === "image/png" ||
      imageGal2.type === "image/jpg" ||
      imageGal2.type === "image/jpeg"
    ) {
      FireStoreService.updateCampImages(
        campID,
        "gal02",
        imageGal2.name,
        campName,
        imageGal2
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setImageGal2("");
          setCampGal2Updated("Gallery image updated successfully");
        })
        .catch((e) => {
          setErrorCampDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorCampDetails("Uploaded gallery image format is invalid!");
    }
  }
  function onSubmitGallery3Image(e) {
    e.preventDefault();
    if (
      imageGal3.type === "image/png" ||
      imageGal3.type === "image/jpg" ||
      imageGal3.type === "image/jpeg"
    ) {
      FireStoreService.updateCampImages(
        campID,
        "gal03",
        imageGal3.name,
        campName,
        imageGal3
      )
        .then(() => {
          stateChange ? setStateChange(false) : setStateChange(true);
          setImageGal3("");
          setCampGal3Updated("Gallery image updated successfully");
        })
        .catch((e) => {
          setErrorCampDetails("Error Occurred!");
          console.log(e);
        });
    } else {
      setErrorCampDetails("Uploaded gallery image format is invalid!");
    }
  }
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(5,5,6,0.5760679271708684) 0%, rgba(12,12,43,0.2511379551820728) 35%, rgba(20,53,60,0.19791666666666663) 100%)",
      }}
    >
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
                Update Camp Details
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div className="accordion-body">
                <form
                  className="needs-validation"
                  encType="multipart/form-data"
                >
                  <div className="row">
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>Camp Type</label>
                        <select
                          className="form-control"
                          name="campType"
                          onChange={(e) => {
                            setCampType(e.target.value);
                          }}
                        >
                          <option value="Any Camp Type" id="anyCamp">
                            Any Camp Type
                          </option>
                          <option value="Public Campground" id="publicCamp">
                            Public Campground
                          </option>
                          <option value="Private Campground" id="privateCamp">
                            Private Campground
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
                          Road to Camp
                        </label>
                        <select
                          className="form-control"
                          name="roadToCamp"
                          onChange={(e) => {
                            setRoadToCamp(e.target.value);
                          }}
                          value={roadToCamp}
                        >
                          <option value="Paved Road to Camp" id="pavedRoad">
                            Paved Road to Camp
                          </option>
                          <option
                            value="Paved+ some dirt road"
                            id="pavedDirtyRoad"
                          >
                            Paved+ some dirt road
                          </option>
                          <option value="Lots of bumpy roads" id="bumpyRoad">
                            Lots of bumpy roads
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
                        <label style={{ marginBottom: "5px" }}>Camp Name</label>
                        <input
                          disabled={true}
                          required={true}
                          type="text"
                          className="form-control"
                          name="campName"
                          placeholder="Enter the Camp name"
                          onChange={(e) => {
                            setCampName(e.target.value);
                          }}
                          value={campName}
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
                  </div>
                  <div className="row">
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>Phone</label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Enter the Phone Number"
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                          value={phone}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Paperwork Required
                        </label>
                        <select
                          className="form-control"
                          name="paperworkRequired"
                          onChange={(e) => {
                            setPaperworkRequired(e.target.value);
                          }}
                        >
                          <option value="Yes" id="paperworkRequiredYes">
                            Yes
                          </option>
                          <option value="No" id="paperworkRequiredNo">
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
                        <label style={{ marginBottom: "5px" }}>Email</label>
                        <input
                          required={true}
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Enter the Email Address"
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Pet Policy
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="petPolicy"
                          placeholder="Enter the Pet Policy"
                          onChange={(e) => {
                            setPetPolicy(e.target.value);
                          }}
                          value={petPolicy}
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
                        <label style={{ marginBottom: "5px" }}>Website</label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="website"
                          placeholder="Enter the Website"
                          onChange={(e) => {
                            setWebsite(e.target.value);
                          }}
                          value={website}
                        ></input>
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
                        <label style={{ marginBottom: "5px" }}>Facebook</label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="facebook"
                          placeholder="Enter the Facebook Link"
                          onChange={(e) => {
                            setFacebook(e.target.value);
                          }}
                          value={facebook}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Reservation
                        </label>
                        <select
                          className="form-control"
                          name="reservation"
                          onChange={(e) => {
                            setReservation(e.target.value);
                          }}
                        >
                          <option value="Yes" id="reservationYes">
                            Yes
                          </option>
                          <option value="No" id="reservationNo">
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
                        <label style={{ marginBottom: "5px" }}>Twitter</label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="twitter"
                          placeholder="Enter the Twitter Link"
                          onChange={(e) => {
                            setTwitter(e.target.value);
                          }}
                          value={twitter}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Reservation Link
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="reservationLink"
                          placeholder="Enter the Reservation Link"
                          onChange={(e) => {
                            setReservationLink(e.target.value);
                          }}
                          value={reservationLink}
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
                        <label style={{ marginBottom: "5px" }}>Instagram</label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="instagram"
                          placeholder="Enter the Instagram Link"
                          onChange={(e) => {
                            setInstagram(e.target.value);
                          }}
                          value={instagram}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Reservation Call
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="reservationCall"
                          placeholder="Enter the Reservation Call"
                          onChange={(e) => {
                            setReservationCall(e.target.value);
                          }}
                          value={reservationCall}
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
                        <label style={{ marginBottom: "5px" }}>
                          Reservation Description
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="reservationDescription"
                          placeholder="Enter the Total Site"
                          onChange={(e) => {
                            setReservationDescription(e.target.value);
                          }}
                          value={reservationDescription}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Reservation Email
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="reservationEmail"
                          placeholder="Enter the Reservation Email"
                          onChange={(e) => {
                            setReservationEmail(e.target.value);
                          }}
                          value={reservationEmail}
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
                        <label style={{ marginBottom: "5px" }}>
                          Horse Site
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="horseSite"
                          placeholder="Enter the Horse Site"
                          onChange={(e) => {
                            setHorseSite(e.target.value);
                          }}
                          value={horseSite}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-6">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Cost per Night
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="costPerNight"
                          placeholder="Enter the Cost Per Night"
                          onChange={(e) => {
                            setCostPerNight(e.target.value);
                          }}
                          value={costPerNight}
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
                          placeholder="Enter the Latitude"
                          onChange={(e) => {
                            setLatitude(e.target.value);
                          }}
                          value={latitude}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="form-check" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>
                      Camp Site Types
                    </label>
                    <div className="row">
                      <div className="col md-3">
                        <label>
                          <input
                            id="Dispersed"
                            type="checkbox"
                            className="form-check-input"
                            name="campSiteTypes"
                            value="Dispersed"
                            onChange={handleCheckChangeOne}
                          />
                          &nbsp;Dispersed
                        </label>
                      </div>
                      <div className="col md-3">
                        <label>
                          <input
                            id="Tent Site"
                            type="checkbox"
                            className="form-check-input"
                            name="campSiteTypes"
                            value="Tent Site"
                            onChange={handleCheckChangeOne}
                          />
                          &nbsp;Tent Site
                        </label>
                      </div>
                      <div className="col md-3">
                        <label>
                          <input
                            id="Rv Site"
                            type="checkbox"
                            className="form-check-input"
                            name="campSiteTypes"
                            value="Rv Site"
                            onChange={handleCheckChangeOne}
                          />
                          &nbsp;Rv Site
                        </label>
                      </div>
                      <div className="col md-3">
                        <label>
                          <input
                            id="Cabins"
                            type="checkbox"
                            className="form-check-input"
                            name="campSiteTypes"
                            value="Cabins"
                            onChange={handleCheckChangeOne}
                          />
                          &nbsp;Cabins
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-check" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Amenities</label>
                    <div className="row">
                      <div className="col md-2">
                        <label>
                          <input
                            id="Corrals"
                            type="checkbox"
                            className="form-check-input"
                            name="amenities"
                            value="Corrals"
                            onChange={handleCheckChangeTwo}
                          />
                          &nbsp;Corrals
                        </label>
                      </div>
                      <div className="col md-2">
                        <label>
                          <input
                            id="Water"
                            type="checkbox"
                            className="form-check-input"
                            name="amenities"
                            value="Water"
                            onChange={handleCheckChangeTwo}
                          />
                          &nbsp;Water
                        </label>
                      </div>
                      <div className="col md-2">
                        <label>
                          <input
                            id="Restrooms"
                            type="checkbox"
                            className="form-check-input"
                            name="amenities"
                            value="Restrooms"
                            onChange={handleCheckChangeTwo}
                          />
                          &nbsp;Restrooms
                        </label>
                      </div>
                      <div className="col md-2">
                        <label>
                          <input
                            id="Restaurants"
                            type="checkbox"
                            className="form-check-input"
                            name="amenities"
                            value="Restaurants"
                            onChange={handleCheckChangeTwo}
                          />
                          &nbsp;Restaurants
                        </label>
                      </div>
                      <div className="col md-2">
                        <label>
                          <input
                            id="Hookup"
                            type="checkbox"
                            className="form-check-input"
                            name="amenities"
                            value="Hookup"
                            onChange={handleCheckChangeTwo}
                          />
                          &nbsp;Hookup
                        </label>
                      </div>
                      <div className="col md-2">
                        <label>
                          <input
                            id="None"
                            type="checkbox"
                            className="form-check-input"
                            name="amenities"
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
                            id="Spring"
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
                            id="Summer"
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
                            id="Fall"
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
                            id="Winter"
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
                    <div className="col md-3">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Camp Notes
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="campNotes"
                          placeholder="Enter the Camp Notes"
                          onChange={(e) => {
                            setCampNotes(e.target.value);
                          }}
                          value={campNotes}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-3">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Reservation and Pricing
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="resOrPricing"
                          placeholder="Reservation or Pricing"
                          onChange={(e) => {
                            setResOrPricing(e.target.value);
                          }}
                          value={resOrPricing}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-3">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
                        <label style={{ marginBottom: "5px" }}>
                          Camp Description
                        </label>
                        <input
                          required={true}
                          type="text"
                          className="form-control"
                          name="campDescription"
                          placeholder="Camp Description"
                          onChange={(e) => {
                            setCampDescription(e.target.value);
                          }}
                          value={campDescription}
                        ></input>
                      </div>
                    </div>
                    <div className="col md-3">
                      <div
                        className="form-group"
                        style={{ marginBottom: "15px" }}
                      >
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
                    </div>
                  </div>
                  {errorCampDetails ? (
                    <div className="alert alert-danger" role="alert">
                      {errorCampDetails}
                    </div>
                  ) : null}
                  <div className="d-grid">
                    {loading &&
                    errorCampDetails.length == 0 &&
                    campUpdated.length == 0 ? (
                      <div className="mt-3 mx-auto text-center">
                        <div className="spinner-border" role="status"></div>
                      </div>
                    ) : null}
                    <button
                      className="btn btn-block"
                      type="submit"
                      style={{
                        marginTop: "15px",
                        backgroundColor: "#071c2f",
                        color: "white",
                      }}
                      onClick={onSubmitCampDetails}
                    >
                      Update Camp Details
                    </button>
                    <br></br>
                    {campUpdated ? (
                      <div class="alert alert-success" role="alert">
                        {campUpdated}
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
                <form
                  className="needs-validation"
                  encType="multipart/form-data"
                >
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
                      required={true}
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
                  {errorCampDetails ? (
                    <div class="alert alert-danger" role="alert">
                      {errorCampDetails}
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
                      Update Banner Photo
                    </button>
                    <br></br>
                    {campBannerUpdated ? (
                      <div class="alert alert-success" role="alert">
                        {campBannerUpdated}
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
                <form
                  className="needs-validation"
                  encType="multipart/form-data"
                >
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
                      required={true}
                      type="file"
                      className="form-control"
                      name="parkingImage"
                      onChange={(e) => {
                        setParkingImage(e.target.files[0]);
                      }}
                    ></input>
                    <span style={{ fontSize: "12px" }}>
                      Only jpeg, jpg and png files are allowed
                    </span>
                  </div>
                  <br></br>
                  {errorCampDetails ? (
                    <div class="alert alert-danger" role="alert">
                      {errorCampDetails}
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
                      Update Parking Photo
                    </button>
                    {campParkingUpdated ? (
                      <div class="alert alert-success" role="alert">
                        {campParkingUpdated}
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
                Update Gallery Image 01
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingFour"
            >
              <div className="accordion-body">
                <form>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
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
                      required={true}
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
                  {errorCampDetails ? (
                    <div class="alert alert-danger" role="alert">
                      {errorCampDetails}
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
                      Update Gallery Image
                    </button>
                    <br></br>
                    {campGal1Updated ? (
                      <div class="alert alert-success" role="alert">
                        {campGal1Updated}
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
                Update Gallery Image 02
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingFive"
            >
              <div className="accordion-body">
                <form>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
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
                      required={true}
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
                  {errorCampDetails ? (
                    <div class="alert alert-danger" role="alert">
                      {errorCampDetails}
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
                      Update Gallery Image
                    </button>
                    <br></br>
                    {campGal2Updated ? (
                      <div class="alert alert-success" role="alert">
                        {campGal2Updated}
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
                Update Gallery Image 03
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingSix"
            >
              <div className="accordion-body">
                <form>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
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
                      required={true}
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
                  {errorCampDetails ? (
                    <div class="alert alert-danger" role="alert">
                      {errorCampDetails}
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
                      Update Gallery Image
                    </button>
                    <br></br>
                    {campGal3Updated ? (
                      <div class="alert alert-success" role="alert">
                        {campGal3Updated}
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
