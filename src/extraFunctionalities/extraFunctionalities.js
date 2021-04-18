import firebase from "firebase";

export const getDateN = (N = 0) => {
  var dateN = new Date();
  dateN.setDate(dateN.getDate() + N);

  return dateToString(dateN);
};

const padZero = (e) => {
  const remainder = parseInt(parseInt(e) / 10);

  if (remainder !== 0) return e;
  else return "0" + e;
};

/**
 * Coverting firebaseTimeStamp Date to JavaScript Date
 * @param {*} timeStampData
 * @return Date String
 */

export const firebaseTimeStampToDate = (timeStampData) => {
  const date = timeStampData.toDate();
  return dateToString(date);
};

const dateToString = (date) => {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var fullDate = year + "-" + padZero(parseInt(month)) + "-" + padZero(day);

  return fullDate;
};

export const changedValues = (initialValue, endValue) => {
  let data = {};

  if (initialValue !== endValue) {
    var key;

    for (key in initialValue) {
      let value = compare(initialValue[key], endValue[key]);
      if (value !== null) data[key] = value;
    }
  } else {
    data = {};
  }

  return data;
};

const compare = (item1, item2) => {
  let change = null;

  if (typeof item1 === "object") {
    change = changedValues(item1, item2);
  } else if (item1 !== item2) {
    change = item2;
  }

  return change;
};

export const isObjectNotNull = (object) => {
  return object === null ? false : true;
};

export const dateToFirebaseTimeStamp = (fulldate, time = "00:00:00") => {
  let dateSplit = fulldate.split("-");
  let year = dateSplit[0];
  let month = parseInt(dateSplit[1]) - 1;
  let date = dateSplit[2];

  let timeSplit = time.split(":");
  let hour = timeSplit[0];
  let minute = timeSplit[1];

  return firebase.firestore.Timestamp.fromDate(
    new Date(year, month, date, hour, minute)
  );
};

export const authUserToCustomUserDetails = (user) => {
  console.log(user);
  return {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    isAnonymous: user.isAnonymous,
    refreshToken: user.refreshToken,
  };
};

export const isUserLoggedIn = (store) => {
  return (
    isObjectNotNull(store.auth.user) &&
    isObjectNotNull(store.userProfile.userProfile)
  );
};

export const redirectPage = (history, param = {}) => {
  let destination = param["?url"];
  let stringAppend = "?";
  let params = param;

  if (params["url"]) {
    stringAppend += "url=" + params["url"] + "&";
    delete params["url"];
  }

  let keyArray = Object.keys(params);

  if (keyArray.length !== 0) {
    for (let i = 1; i < keyArray.length; i++) {
      stringAppend += keyArray[i] + "=" + param[keyArray[i]] + "&";
    }

    destination += stringAppend.slice(0, -1);
  }

  history.push(destination);
};

export const getUserProfileState = (userProfile) => {
  const userDetails = {
    displayName: userProfile.displayName ? userProfile.displayName : "",
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber ? userProfile.phoneNumber : "",
    homeAddress: userProfile.homeAddress
      ? {
          address: userProfile.homeAddress.address
            ? userProfile.homeAddress.address
            : "",
          city: userProfile.homeAddress.city
            ? userProfile.homeAddress.city
            : "",
          postalCode: userProfile.homeAddress.postalCode
            ? userProfile.homeAddress.postalCode
            : "",
        }
      : { address: "", city: "", postalCode: "" },
    birthDate: userProfile.birthDate
      ? firebaseTimeStampToDate(userProfile.birthDate)
      : "2000-01-01",
    gender: userProfile.gender ? userProfile.gender : "Not want to disclose",
  };

  return userDetails;
};
