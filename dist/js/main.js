import { exploreBtnListen, homeHamburgerBtnListen } from "./homePage.js";
import {
  crewHamburgerBtnListen,
  crewDotBtnsListen,
  crewWindowResizeListen,
} from "./crewPage.js";

const initApp = () => {
  console.log("DOM Content Loaded!");
  startApp();
};

document.addEventListener("DOMContentLoaded", initApp);

const startApp = async () => {
  const dataJSON = await getJSONData();
  exploreBtnListen();
  homeHamburgerBtnListen(dataJSON);

  crewHamburgerBtnListen(dataJSON);
  crewDotBtnsListen(dataJSON);
  crewWindowResizeListen(dataJSON);
};

const getJSONData = async () => {
  const data = await fetch("data.json");
  const dataJSON = await data.json();
  return dataJSON;
};
