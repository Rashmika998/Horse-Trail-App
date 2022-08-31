import firebase from "firebase/app";
import { getStorage, ref } from "firebase/firebase-storage";
import { db } from "../../firestore";

const storage = firebase.storage();

function addCampImages(name, file) {
  return new Promise((resolve, reject) => {
    storage
      .ref(`camps/images/${name}/${file.name}`)
      .put(file)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addCamp(
  amenitiesCheck,
  bannerName,
  bestSeasonsCheck,
  campName,
  campNotes,
  campSiteTypesCheck,
  campType,
  city,
  costPerNight,
  description,
  email,
  facebook,
  horseSite,
  imageGal1Name,
  imageGal2Name,
  imageGal3Name,
  instagram,
  keywords,
  longitude,
  latitude,
  nearByPlaces,
  paperworkRequired,
  parkName,
  petPolicy,
  phone,
  reservation,
  reservationCall,
  reservationDescription,
  reservationEmail,
  reservationLink,
  restrictions,
  roadToCamp,
  state,
  twitter,
  website
) {
  return new Promise((resolve, reject) => {
    const data = {
      amenitiesCheck: amenitiesCheck,
      bannerName: bannerName,
      bestSeasonsCheck: bestSeasonsCheck,
      campName: campName,
      campNotes: campNotes,
      campSiteTypesCheck: campSiteTypesCheck,
      campType: campType,
      city: city,
      costPerNight: costPerNight,
      description: description,
      email: email,
      facebook: facebook,
      horseSite: horseSite,
      imageGal1Name: imageGal1Name,
      imageGal2Name: imageGal2Name,
      imageGal3Name: imageGal3Name,
      instagram: instagram,
      keywords: keywords,
      longitude: longitude,
      latitude: latitude,
      nearByPlaces: nearByPlaces,
      paperworkRequired: paperworkRequired,
      parkName: parkName,
      petPolicy: petPolicy,
      phone: phone,
      reservation: reservation,
      reservationCall: reservationCall,
      reservationDescription: reservationDescription,
      reservationEmail: reservationEmail,
      reservationLink: reservationLink,
      restrictions: restrictions,
      roadToCamp: roadToCamp,
      state: state,
      twitter: twitter,
      website: website,
    };
    db.collection("camps")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getAllCamps() {
  return new Promise((resolve, reject) => {
    db.collection("camps")
      .get()
      .then((allCamps) => {
        resolve(allCamps);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function searchCamps(
  campType,
  season,
  camp_park_name,
  state,
  inputParkOrCamp,
  inputRVHookUps,
  inputCorrals
) {
  return new Promise((resolve, reject) => {
    var query = db.collection("camps");
    //  query = query.where("miles", ">=", range[0]).where("miles", "<=", range[1]);

    if (campType != "Any") {
      query = query.where("campType", "==", campType);
    }
    if (state != "Any") {
      query = query.where("state", "==", state);
    }
    if (inputRVHookUps != "Any") {
      if (inputRVHookUps == "Required") {
        query = query.where("amenitiesCheck.amenities.Hookup", "==", true);
      } else if (inputRVHookUps == "Not Required") {
        query = query.where("amenitiesCheck.amenities.Hookup", "==", false);
      }
    }

    if (inputCorrals != "Any") {
      if (inputCorrals == "Required") {
        query = query.where("amenitiesCheck.amenties.Corrals", "==", true);
      } else if (inputCorrals == "Not Required") {
        query = query.where("amenitiesCheck.amenties.Corrals", "==", false);
      }
    }

   
    if (season != "Any") {
      query = query.where(
        "bestSeasonsCheck.bestSeasons",
        "array-contains",
        season
      );
    }

    if (camp_park_name != "") {
      if (inputParkOrCamp == "park") {
        query = query.where("parkName", "==", camp_park_name);
      } else if (inputParkOrCamp == "camp") {
        query = query.where("campName", "==", camp_park_name);
      }
    }

    query
      .get()
      .then((allCamps) => {
        resolve(allCamps);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//get image file as a url to download
function getCampImages(name, imageName) {
  return new Promise((resolve, reject) => {
    storage
      .ref(`camps/images/${name}/${imageName}`)
      .getDownloadURL()
      .then((url) => {
        resolve(url);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getCamp(id) {
  return new Promise((resolve, reject) => {
    db.collection("camps")
      .doc(id)
      .get()
      .then((camp) => {
        resolve(camp);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addRatings(id, rate) {
  return new Promise((resolve, reject) => {
    const data = {
      id: id,
      rate: parseInt(rate),
    };
    db.collection("campsRatings")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getRating(id) {
  return new Promise((resolve, reject) => {
    var query = db.collection("campsRatings");
    query = query.where("id", "==", id);
    query
      .get()
      .then((ratings) => {
        resolve(ratings);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default {
  addCamp,
  addCampImages,
  addRatings,
  getAllCamps,
  getCamp,
  getCampImages,
  getRating,

};
