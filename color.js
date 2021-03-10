"use strict";
document.addEventListener("DOMContentLoaded", init);
let elementToPaint;

async function init() {
  let response = await fetch("/img/figure-01.svg");
  let mySvgData = await response.text();
  //change HTML for this one
  document.querySelector("#configurator section").innerHTML = mySvgData;
  startManipulatingSvg();
}

function startManipulatingSvg() {
  document.querySelectorAll("g").forEach((g) => {
    // console.log(g);
    g.addEventListener("click", colorElement);
    g.addEventListener("mouseover", selectArea);
    g.addEventListener("mouseout", deselectArea);
  });
}

function colorElement() {
  //this is what will be handled
  elementToPaint = this;
  // console.log(elementToPaint);
  this.style.fill = "lightgrey";
}

function selectArea() {
  this.style.stroke = "white";
}

function deselectArea() {
  this.style.stroke = "none";
}

document.querySelectorAll(".color_btn").forEach((colorBtn) => {
  colorBtn.addEventListener("click", colorSelected);
});

function colorSelected() {
  //get this btns color to fill

  if (elementToPaint !== undefined) {
    elementToPaint.style.fill = this.getAttribute("fill");
  }
}
