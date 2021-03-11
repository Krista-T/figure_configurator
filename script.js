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
    // console.log(newfeatureElement);

    // li item data-feature added

    //FLIP
    const start = target.getBoundingClientRect();
    const end = newfeatureElement.getBoundingClientRect();

    const diffX = start.x - end.x;
    const diffY = start.y - end.y;

    newfeatureElement.style.setProperty("--diffX", diffX + "px");
    newfeatureElement.style.setProperty("--diffY", diffY + "px");
    // We animate here, after setting the coordinates
    //newfeatureElement.offsetHeight;

    newfeatureElement.classList.add("animate-feature-in");
    // newfeatureElement.classList = 'animate-feature-in';
  } else {
    features[featureImg] = false;
    target.parentElement.classList.remove("chosen");
    document
      .querySelector(`[data-feature="${featureImg}"`)
      .classList.add("hide");

    const newfeatureElement = document.querySelector(
      `#selected ul [data-feature="${featureImg}"]`
    );

    //FLIP
    const start = target.getBoundingClientRect();
    const end = newfeatureElement.getBoundingClientRect();

    const diffX = start.x - end.x;
    const diffY = start.y - end.y;
    console.log(diffX, diffY);

    newfeatureElement.style.setProperty("--diffX", diffX + "px");
    newfeatureElement.style.setProperty("--diffY", diffY + "px");
    newfeatureElement.offsetHeight;

    //Animation feature out
    newfeatureElement.classList.add("animate-feature-out");
    //when animation is complete, remove featureElement from the DOM
    newfeatureElement.addEventListener("animationend", function () {
      newfeatureElement.remove();
      //Chose the feature element and hide it
      document
        .querySelector(`[data-feature=${featureImg}`)
        .classList.add("hide");
    });
  }
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
