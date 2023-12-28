import { homeExploreBtnListen } from "./homePage.js";
import {
  destinationMoonsNavChoiceListen,
  destinationMoonsNavMarkerPositionSwitchListen,
  destinationMoonsNavHoverMarkerListen,
} from "./destinationPage.js";
import { crewDotBtnsListen, crewPageOnResize } from "./crewPage.js";
import { technologyDotBtnsListen } from "./technologyPage.js";

const initApp = () => {
  console.log("DOM Content Loaded!");
  startApp();
};

document.addEventListener("DOMContentLoaded", initApp);

const startApp = async () => {
  const dataJSON = await getJSONData();

  navMenuMarkerPositionSwitchListen();
  hamburgerBtnListen();

  homeExploreBtnListen();

  destinationMoonsNavHoverMarkerListen();
  destinationMoonsNavChoiceListen(dataJSON);
  destinationMoonsNavMarkerPositionSwitchListen();

  crewDotBtnsListen(dataJSON);

  technologyDotBtnsListen(dataJSON);

  windowResize(dataJSON);
};

const getJSONData = async () => {
  const data = await fetch("data.json");
  const dataJSON = await data.json();
  return dataJSON;
};

let inProgress = false;
let choice = 0;
let choicePhone = 0;
const navMenuMarkerPositionSwitchListen = () => {
  const listItem = document.querySelectorAll(".header .nav .ul .li");
  const listItemPhone = document.querySelectorAll("main .nav-phone .ul .li");

  for (let i = 0; i < listItem.length; i++) {
    listItem[i].addEventListener("click", (event) => {
      choice = i;
      if (!inProgress) {
        inProgress = true;

        // SELEKTOVANA STRANICA OSTAJE PODVUCENA DOK MARKER NE STIGNE
        listItem[i].classList.add("hover-stick");
        setTimeout(() => {
          listItem[i].classList.remove("hover-stick");
        }, 1005);

        markerPositionSwitch(listItem[i], 0);
        pageSwitch(i);
        setTimeout(() => {
          inProgress = false;
        }, 1801);
      }
    });
  }

  for (let i = 0; i < listItemPhone.length; i++) {
    listItemPhone[i].addEventListener("click", (event) => {
      choicePhone = i;
      setTimeout(() => {
        const phoneSidebarMenu = document.getElementById("phone-sidebar-menu");
        phoneSidebarMenu.classList.remove("phoneMenuShow");
        phoneSidebarMenu.classList.add("phoneMenuHide");
      }, 275);

      if (!inProgress) {
        inProgress = true;

        pageSwitch(i);
        setTimeout(() => {
          inProgress = false;
        }, 1651);
      }
    });
  }
};

const hamburgerBtnListen = () => {
  const hamburgerBtnOpenMenu = document.getElementById("hamburger-btn-open");
  const hamburgerBtnCloseMenu = document.getElementById("hamburger-btn-close");
  const phoneSidebarMenu = document.getElementById("phone-sidebar-menu");

  hamburgerBtnOpenMenu.addEventListener("click", (event) => {
    phoneSidebarMenu.classList.remove("phoneMenuHide");
    phoneSidebarMenu.classList.add("phoneMenuShow");
  });

  hamburgerBtnCloseMenu.addEventListener("click", (event) => {
    phoneSidebarMenu.classList.remove("phoneMenuShow");
    phoneSidebarMenu.classList.add("phoneMenuHide");
  });
};

const markerPositionSwitch = (listItem, resizeOrNot) => {
  const marker = document.getElementById("menu-selected-marker");

  if (resizeOrNot === 1) {
    marker.style.transition = "0s";
  } else {
    marker.style.transition = "1s";
  }
  marker.style.left = listItem.offsetLeft + "px";
  marker.style.width = listItem.offsetWidth + "px";
};

let oldWidthPhone = window.matchMedia("(max-width: 767px)").matches;
let oldWidthTablet = window.matchMedia("(min-width: 768px)").matches;
let oldWidthDesktop = window.matchMedia("(min-width: 1440px)").matches;
const markerPositionSwitchOnWindowResize = () => {
  let newWidthPhone = window.matchMedia("(max-width: 767px)").matches;
  let newWidthTablet = window.matchMedia("(min-width: 768px)").matches;
  let newWidthDesktop = window.matchMedia("(min-width: 1440px)").matches;

  const listItem = document.querySelectorAll(".header .nav .ul .li");
  if (newWidthPhone && !newWidthTablet && !newWidthDesktop) {
    if (oldWidthPhone && !oldWidthTablet && !oldWidthDesktop) {
      markerPositionSwitch(listItem[choicePhone], 1);
      choice = choicePhone;
    } else if (!oldWidthPhone && oldWidthTablet && !oldWidthDesktop) {
      markerPositionSwitch(listItem[choice], 1);
      choicePhone = choice;
    } else if (!oldWidthPhone && oldWidthTablet && oldWidthDesktop) {
      markerPositionSwitch(listItem[choice], 1);
      choicePhone = choice;
    }
  } else if (!newWidthPhone && newWidthTablet && !newWidthDesktop) {
    if (oldWidthPhone && !oldWidthTablet && !oldWidthDesktop) {
      markerPositionSwitch(listItem[choicePhone], 1);
      choice = choicePhone;
    } else if (!oldWidthPhone && oldWidthTablet && !oldWidthDesktop) {
      markerPositionSwitch(listItem[choice], 1);
      choicePhone = choice;
    } else if (!oldWidthPhone && oldWidthTablet && oldWidthDesktop) {
      markerPositionSwitch(listItem[choice], 1);
      choicePhone = choice;
    }
  } else if (!newWidthPhone && newWidthTablet && newWidthDesktop) {
    if (oldWidthPhone && !oldWidthTablet && !oldWidthDesktop) {
      markerPositionSwitch(listItem[choicePhone], 1);
      choice = choicePhone;
    } else if (!oldWidthPhone && oldWidthTablet && !oldWidthDesktop) {
      markerPositionSwitch(listItem[choice], 1);
      choicePhone = choice;
    } else if (!oldWidthPhone && oldWidthTablet && oldWidthDesktop) {
      markerPositionSwitch(listItem[choice], 1);
      choicePhone = choice;
    }
  }

  setTimeout(() => {
    oldWidthPhone = newWidthPhone;
    oldWidthTablet = newWidthTablet;
    oldWidthDesktop = newWidthDesktop;
  }, 100);
};

let counter = 0;
const pageSwitch = (index) => {
  const deviceScreenWidth768px = window.matchMedia("(min-width: 768px)");
  counter += 1;

  if (deviceScreenWidth768px.matches) {
    if (counter % 2 !== 0) {
      document.getElementById("home-page").style.transform = "translateX(102%)";
    } else {
      document.getElementById("home-page").style.transform =
        "translateX(-102%)";
    }
  } else {
    document.getElementById("home-page").style.transform = "translateX(-102%)";
  }
  document.getElementById("home-page").style.transition = "all 1s ease-in";
  setTimeout(() => {
    if (deviceScreenWidth768px.matches) {
      if (counter % 2 !== 0) {
        document.getElementById("home-page").style.transform =
          "translateY(102%)";
      } else {
        document.getElementById("home-page").style.transform =
          "translateY(-102%)";
      }
    } else {
      document.getElementById("home-page").style.transform = "translateY(102%)";
    }
    document.getElementById("home-page").style.transition = "none";
    document.getElementById("home-page").style.display = "none";
  }, 1001);

  if (deviceScreenWidth768px.matches) {
    if (counter % 2 !== 0) {
      document.getElementById("destination-page").style.transform =
        "translateX(102%)";
    } else {
      document.getElementById("destination-page").style.transform =
        "translateX(-102%)";
    }
  } else {
    document.getElementById("destination-page").style.transform =
      "translateX(-102%)";
  }
  document.getElementById("destination-page").style.transition =
    "all 1s ease-in";
  setTimeout(() => {
    if (deviceScreenWidth768px.matches) {
      if (counter % 2 !== 0) {
        document.getElementById("destination-page").style.transform =
          "translateY(102%)";
      } else {
        document.getElementById("destination-page").style.transform =
          "translateY(-102%)";
      }
    } else {
      document.getElementById("destination-page").style.transform =
        "translateY(102%)";
    }
    document.getElementById("destination-page").style.transition = "none";
    document.getElementById("destination-page").style.display = "none";
  }, 1001);

  if (deviceScreenWidth768px.matches) {
    if (counter % 2 !== 0) {
      document.getElementById("crew-page").style.transform = "translateX(102%)";
    } else {
      document.getElementById("crew-page").style.transform =
        "translateX(-102%)";
    }
  } else {
    document.getElementById("crew-page").style.transform = "translateX(-102%)";
  }
  document.getElementById("crew-page").style.transition = "all 1s ease-in";
  setTimeout(() => {
    if (deviceScreenWidth768px.matches) {
      if (counter % 2 !== 0) {
        document.getElementById("crew-page").style.transform =
          "translateY(102%)";
      } else {
        document.getElementById("crew-page").style.transform =
          "translateY(-102%)";
      }
    } else {
      document.getElementById("crew-page").style.transform = "translateY(102%)";
    }
    document.getElementById("crew-page").style.transition = "none";
    document.getElementById("crew-page").style.display = "none";
  }, 1001);

  if (deviceScreenWidth768px.matches) {
    if (counter % 2 !== 0) {
      document.getElementById("technology-page").style.transform =
        "translateX(102%)";
    } else {
      document.getElementById("technology-page").style.transform =
        "translateX(-102%)";
    }
  } else {
    document.getElementById("technology-page").style.transform =
      "translateX(-102%)";
  }
  document.getElementById("technology-page").style.transition =
    "all 1s ease-in";
  setTimeout(() => {
    if (deviceScreenWidth768px.matches) {
      if (counter % 2 !== 0) {
        document.getElementById("technology-page").style.transform =
          "translateY(102%)";
      } else {
        document.getElementById("technology-page").style.transform =
          "translateY(-102%)";
      }
    } else {
      document.getElementById("technology-page").style.transform =
        "translateY(102%)";
    }
    document.getElementById("technology-page").style.transition = "none";
    document.getElementById("technology-page").style.display = "none";
  }, 1001);

  if (index === 0) {
    setTimeout(() => {
      document.getElementById("home-page").style.display = "flex";
      setTimeout(() => {
        document.getElementById("home-page").style.transform = "translateX(0%)";
        document.getElementById("home-page").style.transition =
          "all 0.6s ease-out";
      }, 48);
    }, 1002);
  } else if (index === 1) {
    setTimeout(() => {
      document.getElementById("destination-page").style.display = "flex";
      setTimeout(() => {
        document.getElementById("destination-page").style.transform =
          "translateX(0%)";
        document.getElementById("destination-page").style.transition =
          "all 0.6s ease-out";
      }, 48);
    }, 1002);
  } else if (index === 2) {
    setTimeout(() => {
      document.getElementById("crew-page").style.display = "flex";
      setTimeout(() => {
        document.getElementById("crew-page").style.transform = "translateX(0%)";
        document.getElementById("crew-page").style.transition =
          "all 0.6s ease-out";
      }, 48);
    }, 1002);
  } else if (index === 3) {
    setTimeout(() => {
      document.getElementById("technology-page").style.display = "flex";
      setTimeout(() => {
        document.getElementById("technology-page").style.transform =
          "translateX(0%)";
        document.getElementById("technology-page").style.transition =
          "all 0.6s ease-out";
      }, 48);
    }, 1002);
  }
};

const windowResize = (dataJSON) => {
  window.addEventListener("resize", (event) => {
    markerPositionSwitchOnWindowResize();
    crewPageOnResize(dataJSON);
  });
};
