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
  imageGal1Name,
  imageGal2Name,
  imageGal3Name,
  instagram,
  keywords,
  longitude,
  latitude,
  paperworkRequired,
  parkingImageName,
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
) {
  return new Promise((resolve, reject) => {
    const data = {
      amenitiesCheck: amenitiesCheck,
      bannerName: bannerName,
      bestSeasonsCheck: bestSeasonsCheck,
      campDescription: campDescription,
      campName: campName,
      campNotes: campNotes,
      campSiteTypesCheck: campSiteTypesCheck,
      campType: campType,
      city: city,
      costPerNight: costPerNight,
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
      paperworkRequired: paperworkRequired,
      parkingImageName: parkingImageName,
      parkName: parkName,
      petPolicy: petPolicy,
      phone: phone,
      reservation: reservation,
      reservationCall: reservationCall,
      reservationDescription: reservationDescription,
      reservationEmail: reservationEmail,
      reservationLink: reservationLink,
      resOrPricing: resOrPricing,
      restrictions: restrictions,
      roadToCamp: roadToCamp,
      state: state,
      twitter: twitter,
      userID: userID,
      website: website,
    };
    console.log(data);
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
function getCampIDsList(type, userId) {
  return new Promise((resolve, reject) => {
    var query = db.collection("campCheckIns");
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
      .then((campsList) => {
        resolve(campsList);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function updateCampCheckinState(campID, newState) {
  return new Promise((resolve, reject) => {
    db.collection("campCheckIns")
      .where("campID", "==", campID)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((camp) => {
            db.collection("campCheckIns")
              .doc(camp.id)
              .update({ status: newState })
              .then((campState) => {
                resolve(campState);
                console.log(campState);
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

function setCampFavourite(campID) {
  return new Promise((resolve, reject) => {
    db.collection("campCheckIns")
      .where("campID", "==", campID)
      .get()
      .then((snapshots) => {
        if (snapshots.size > 0) {
          snapshots.forEach((camp) => {
            db.collection("campCheckIns")
              .doc(camp.id)
              .update({ favourite: true })
              .then((campState) => {
                resolve(campState);
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

function addCheckins(uid, campID) {
  return new Promise((resolve, reject) => {
    const data = {
      uID: uid,
      campID: campID,
      status: "Checked-In",
      favourite: false,
    };
    db.collection("campCheckIns")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getMyCamps(userId) {
  return new Promise((resolve, reject) => {
    var query = db.collection("camps");
    query = query.where("userId", "==", userId);
    query
      .get()
      .then((campsList) => {
        resolve(campsList);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function addReview(userId, campId, review) {
  return new Promise((resolve, reject) => {
    const data = {
      userId: userId,
      campId: campId,
      review: review,
    };
    db.collection("campsReviews")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function getReviews(id) {
  return new Promise((resolve, reject) => {
    var query = db.collection("campsReviews");
    query = query.where("campId", "==", id);
    query
      .get()
      .then((reviews) => {
        resolve(reviews);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function deleteCamp(id) {
  return new Promise((resolve, reject) => {
    var query = db.collection("camps");
    query
      .doc(id)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function updateCampDetails(
  id,
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
) {
  return new Promise((resolve, reject) => {
    const data = {
      amenitiesCheck: amenitiesCheck,
      bestSeasonsCheck: bestSeasonsCheck,
      campDescription: campDescription,
      campName: campName,
      campNotes: campNotes,
      campSiteTypesCheck: campSiteTypesCheck,
      campType: campType,
      city: city,
      costPerNight: costPerNight,
      email: email,
      facebook: facebook,
      horseSite: horseSite,
      instagram: instagram,
      keywords: keywords,
      longitude: longitude,
      latitude: latitude,
      paperworkRequired: paperworkRequired,
      parkName: parkName,
      petPolicy: petPolicy,
      phone: phone,
      reservation: reservation,
      reservationCall: reservationCall,
      reservationDescription: reservationDescription,
      reservationEmail: reservationEmail,
      reservationLink: reservationLink,
      resOrPricing: resOrPricing,
      restrictions: restrictions,
      roadToCamp: roadToCamp,
      state: state,
      twitter: twitter,
      userID: userID,
      website: website,
    };
    db.collection("camps")
      .doc(id)
      .update(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function updateCampImages(id, imageType, imageName, campName, file) {
  return new Promise((resolve, reject) => {
    var data = {};
    if (imageType === "banner") {
      data = {
        bannerName: imageName,
      };
      storage
        .ref(`camps/images/banners/${campName}/${file.name}`)
        .put(file)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((e) => {
          reject(e);
        });
    } else if (imageType === "parking") {
      data = {
        parkingImageName: imageName,
      };
      storage
        .ref(`camps/images/parking/${campName}/${file.name}`)
        .put(file)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((e) => {
          reject(e);
        });
    } else if (imageType === "gal01") {
      data = {
        imageGal1Name: imageName,
      };
      storage
        .ref(`camps/images/gallery/${campName}/${file.name}`)
        .put(file)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((e) => {
          reject(e);
        });
    } else if (imageType === "gal02") {
      data = {
        imageGal2Name: imageName,
      };
      storage
        .ref(`camps/images/gallery/${campName}/${file.name}`)
        .put(file)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((e) => {
          reject(e);
        });
    } else if (imageType === "gal03") {
      data = {
        imageGal3Name: imageName,
      };
      storage
        .ref(`camps/images/gallery/${campName}/${file.name}`)
        .put(file)
        .then((docRef) => {
          resolve(docRef);
        })
        .catch((e) => {
          reject(e);
        });
    }

    db.collection("camps")
      .doc(id)
      .update(data)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//get image file as a url to download
function getCampImageURL(name, imageName) {
  return new Promise((resolve, reject) => {
    const imageRef = firebase
      .storage()
      .ref(`camps/images/banners/${name}/${imageName}`);
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

export default {
  addCamp,
  addCampImages,
  addRatings,
  addReview,
  deleteCamp,
  getAllCamps,
  getCamp,
  getCampImages,
  getRating,
  getReviews,
  searchCamps,
  getCampIDsList,
  updateCampDetails,
  updateCampImages,
  updateCampCheckinState,
  setCampFavourite,
  addCheckins,
  getMyCamps,
  getCampImageURL,
};
