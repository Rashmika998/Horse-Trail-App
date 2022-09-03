import firebase from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  documentId,
} from "firebase/firebase-storage";
import { db } from "../../firestore";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

// Create a root reference
const storage = firebase.storage();
const trailsRef = db.collection("trails");

function addGpxFiles(name, file) {
  return new Promise((resolve, reject) => {
    storage
      .ref(`trails/gpx/${name}/${file.name}`)
      .put(file)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addTrailImages(name, file) {
  return new Promise((resolve, reject) => {
    storage
      .ref(`trails/images/${name}/${file.name}`)
      .put(file)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addTrail(
  atvOrOffroad,
  bannerName,
  bestSeasonsCheck,
  bikers,
  city,
  country,
  description,
  dogs,
  elevationGain,
  gpxName,
  hikers,
  imageGal1Name,
  imageGal2Name,
  imageGal3Name,
  keywords,
  longitude,
  latitude,
  miles,
  obstaclesCheck,
  parkName,
  parkingImageName,
  parkingNotes,
  parkingSpots,
  restrictions,
  state,
  trailHeadCheck,
  trailMap,
  trailMapName,
  trailName,
  trailNotes,
  trailType,
  userId
) {
  return new Promise((resolve, reject) => {
    const data = {
      atvOrOffroad: atvOrOffroad,
      bannerName: bannerName,
      bestSeasonsCheck: bestSeasonsCheck,
      bikers: bikers,
      city: city,
      country: country,
      description: description,
      dogs: dogs,
      elevationGain: elevationGain,
      gpxName: gpxName,
      hikers: hikers,
      imageGal1Name: imageGal1Name,
      imageGal2Name: imageGal2Name,
      imageGal3Name: imageGal3Name,
      keywords: keywords,
      longitude: longitude,
      latitude: latitude,
      miles: parseFloat(miles),
      obstaclesCheck: obstaclesCheck,
      parkName: parkName,
      parkingImageName: parkingImageName,
      parkingNotes: parkingNotes,
      parkingSpots: parkingSpots,
      restrictions: restrictions,
      state: state,
      trailHeadCheck: trailHeadCheck,
      trailMap: trailMap,
      trailMapName: trailMapName,
      trailName: trailName,
      trailNotes: trailNotes,
      trailType: trailType,
      userId: userId,
    };
    db.collection("trails")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getAllTrails() {
  return new Promise((resolve, reject) => {
    db.collection("trails")
      .get()
      .then((allTrails) => {
        resolve(allTrails);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//get gpx file as a url to download
function getGpxFiles(name, fileName) {
  return new Promise((resolve, reject) => {
    storage
      .ref(`trails/gpx/${name}/${fileName}`)
      .getDownloadURL()
      .then((url) => {
        resolve(url);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//get image file as a url to download
function getTrailImageURL(name, imageName) {
  return new Promise((resolve, reject) => {
    const imageRef = firebase
      .storage()
      .ref(`trails/images/banners/${name}/${imageName}`);
    imageRef
      .getDownloadURL()
      .then((url) => {
        resolve(url);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getTrail(id) {
  return new Promise((resolve, reject) => {
    db.collection("trails")
      .doc(id)
      .get()
      .then((trail) => {
        resolve(trail);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getTrailsList(idArr) {
  return new Promise((resolve, reject) => {
    console.log(idArr);
    db.collection("trails")
      .where(documentId(), "in", idArr)
      .get()
      .then((trailList) => {
        resolve(trailList);
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
    db.collection("trailsRatings")
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
    var query = db.collection("trailsRatings");
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

function searchTrails(
  trailType,
  season,
  trail_park_name,
  tag,
  bikesAllowed,
  state,
  range,
  inputParkOrTrail
) {
  return new Promise((resolve, reject) => {
    var query = db.collection("trails");
    query = query.where("miles", ">=", range[0]);

    if (trailType != "Any") {
      query = query.where("trailType", "==", trailType);
    }
    if (state != "Any") {
      query = query.where("state", "==", state);
    }
    if (bikesAllowed != "Any") {
      query = query.where("bikers", "==", bikesAllowed);
    }
    if (season != "Any") {
      query = query.where(
        "bestSeasonsCheck.bestSeasons",
        "array-contains",
        season
      );
    }

    if (trail_park_name != "") {
      if (inputParkOrTrail == "trail") {
        query = query.where("trailName", "==", trail_park_name);
      } else if (inputParkOrTrail == "park") {
        query = query.where("parkName", "==", trail_park_name);
      }
    }
    if (tag != "") {
      query = query.where("keywords", "==", tag);
    }
    query
      .get()
      .then((allTrails) => {
        resolve(allTrails);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//get image file as a url to download
function getTrailImages(name, imageName) {
  return new Promise((resolve, reject) => {
    storage
      .ref(`trails/images/${name}/${imageName}`)
      .getDownloadURL()
      .then((url) => {
        resolve(url);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addCheckins(uid, trailID) {
  return new Promise((resolve, reject) => {
    const data = {
      uID: uid,
      trailID: trailID,
      status: "Checked-In",
      favourite: false,
    };
    db.collection("trailCheckIns")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getTrailIDsList(type, userId) {
  return new Promise((resolve, reject) => {
    var query = db.collection("trailCheckIns");
    query = query.where("uID", "==", userId);

    if (type == "favourites") {
      query = query
        .where("status", "==", "Completed")
        .where("favourite", "==", true);
    } else if (type == "completed") {
      query = query.where("status", "==", "Completed");
    } else if (type == "checkedIn") {
      query = query.where("status", "==", "Checked-In");
    }
    query
      .get()
      .then((trailsList) => {
        resolve(trailsList);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function updateTrailCheckinState(trailID, newState) {
  return new Promise((resolve, reject) => {
    db.collection("trailCheckIns")
      .where("trailID", "==", trailID)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((trail) => {
            db.collection("trailCheckIns")
              .doc(trail.id)
              .update({ status: newState })
              .then((trailState) => {
                resolve(trailState);
                console.log(trailState);
              })
              .catch((e) => {
                reject(e);
              });
          });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function setTrailFavourite(trailID) {
  return new Promise((resolve, reject) => {
    db.collection("trailCheckIns")
      .where("trailID", "==", trailID)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((trail) => {
            db.collection("trailCheckIns")
              .doc(trail.id)
              .update({ favourite: true })
              .then((trailState) => {
                resolve(trailState);
              })
              .catch((e) => {
                reject(e);
              });
          });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getMyTrails(userId) {
  return new Promise((resolve, reject) => {
    var query = db.collection("trails");
    query = query.where("userId", "==", userId);
    query
      .get()
      .then((trailsList) => {
        resolve(trailsList);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addReview(userId, trailId, review) {
  return new Promise((resolve, reject) => {
    const data = {
      userId: userId,
      trailId: trailId,
      review: review,
    };
    db.collection("trailsReviews")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default {
  addRatings,
  addTrail,
  addTrailImages,
  addGpxFiles,
  getAllTrails,
  getGpxFiles,
  getRating,
  addReview,
  getTrailImages,
  getTrailImageURL,
  getTrail,
  searchTrails,
  addCheckins,
  getTrailsList,
  getTrailIDsList,
  updateTrailCheckinState,
  setTrailFavourite,
  getMyTrails,
};
