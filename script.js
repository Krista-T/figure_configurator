"use strict";

// The model of all features
const features = {
  beanie: false,
  radio: false,
  metalHair: false,
  guitar: false,
  pirate: false,
  bird: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.target;
  const featureImg = target.dataset.name;
  // console.log(target);
  //Toggle features
  if (features[featureImg] === false) {
    features[featureImg] = true;
    target.parentElement.classList.add("chosen");
    document
      .querySelector(`[data-feature="${featureImg}"`)
      .classList.remove("hide");

    //Call new featureElement function to create element and add it to the list
    const newfeatureElement = createFeatureElement(featureImg);
    document.querySelector("#selected ul").appendChild(newfeatureElement);
    console.log(newfeatureElement);
    newfeatureElement.classList.add("animate-feature-in");
    // li item data-feature added

    //FLIP
    const start = target.getBoundingClientRect();
    const end = newfeatureElement.getBoundingClientRect();

    const diffX = start.X - end.X + "px";
    const diffY = start.Y - end.Y + "px";
    newfeatureElement.offsetHeight;
    newfeatureElement.style.setProperty("--diffX", diffX);
    newfeatureElement.style.setProperty("--diffY", diffY);
    newfeatureElement.offsetHeight;
  } else {
    features[featureImg] = false;
    target.parentElement.classList.remove("chosen");
    document
      .querySelector(`[data-feature="${featureImg}"`)
      .classList.add("hide");

    const theFeatureElement = document.querySelector(
      `#selected [data-feature="${featureImg}"]`
    );

    const end = theFeatureElement.getBoundingClientRect();
    const start = target.getBoundingClientRect();

    const diffX = start.X - end.X + "px";
    const diffY = start.Y - end.Y + "px";

    theFeatureElement.style.setProperty("--diffX", diffX);
    theFeatureElement.style.setProperty("--diffY", diffY);
    theFeatureElement.offsetHeight;

    //Animation feature out
    theFeatureElement.classList.add("animate-feature-out");
    //when animation is complete, remove featureElement from the DOM
    theFeatureElement.addEventListener("animationend", function () {
      theFeatureElement.remove();
      //Chose the feature element and hide it
      document
        .querySelector(`[data-feature=${featureImg}`)
        .classList.add("hide");
    });
  }

  // createFeatureElement(featureImg);
}
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;
  console.log(feature);
  const img = document.createElement("img");
  img.src = `./img/${feature}.png`;
  img.alt = capitalize(feature);
  li.append(img);
  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}
