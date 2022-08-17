import moment from "moment";

export function verifyLogin({ email, password }, users) {
  const userExist = users.filter((obj) => obj["email"] == email)[0];
  return userExist && userExist["password"] == password ? userExist : null;
}

export function setLocalData(key, value) {
  try {
    if (typeof(value) !== "string") {
      value = JSON.stringify(value);
      localStorage.setItem(key, value);
    }

  } catch (error) {
    console.log(error);
  }
}

export function getLocalData(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
}

export function deleteLocalItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}

/*------------------------------
  APP THEMES
-------------------------------*/

export function setAppTheme(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}

export function getAppTheme(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
}

export function currentDate(){
  const current = new Date();
  let date = moment().format('LLL');
  return date;
}