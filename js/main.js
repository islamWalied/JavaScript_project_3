// change background image randomly

let landing = document.querySelector(".landing-page");
let arrayImg = [
  "amazing.jpg",
  "galaxy.jpg",
  "lake.jpg",
  "landing.jpg",
  "planet.jpg",
  "powerfull.jpg",
  "wonedrfull.jpg",
];

//random background image or not

let backgroundLocal = localStorage.getItem("background_option");
let backgroundOption = true;
let backgroundInterval;

//check

if (backgroundLocal !== null) {
  document.querySelectorAll(".random-background span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocal === "true") {
    backgroundOption = true;
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-background .no").classList.add("active");
  }
}
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * arrayImg.length);

      // Change Background Image Url
      landing.style.backgroundImage =
        'url("imgs/' + arrayImg[randomNumber] + '")';
    }, 1000);
  }
}

randomizeImgs();

//show setting box

let setting = document.querySelector(".toggle-setting .fa-cog");
let box = document.querySelector(".setting-box");

setting.onclick = function () {
  this.classList.toggle("fa-spin");
  box.classList.toggle("open");
};

//save color in localstorage
let colorStorage = localStorage.getItem("color-option");
// console.log(colorStorage);

if (colorStorage !== null) {
  document.documentElement.style.setProperty("--mainColor", colorStorage);

  document.querySelectorAll("color-list li").forEach((element) => {
    element.classList.remove("active");

    if (element.dataSet.color === colorStorage) {
      element.classList.add("active");
    }
  });
}

// switch color

let colors = document.querySelectorAll(".color-list li");

colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--mainColor",
      e.target.dataset.color
    );

    //save color into localstorage
    localStorage.setItem("color-option", e.target.dataset.color);

    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});

// switch random background image

let backgroundImage = document.querySelectorAll(".random-background span");

backgroundImage.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    //random background
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// animate width of progress

let skills = document.querySelector(".our-skills");

window.onscroll = function () {
  let skillsOffsetTop = skills.offsetTop;
  let skillsOuterHeight = skills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//on click to the images

let images = document.querySelectorAll(".gallery img");

images.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    let popupImage = document.createElement("img");

    popupImage.src = img.src;

    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      let heading = document.createElement("h3");

      let textImg = document.createTextNode(img.alt);

      heading.appendChild(textImg);

      popupBox.prepend(heading);
    }

    let closeButton = document.createElement("span");

    closeButton.className = "close-btn";

    let closeBtn = document.createTextNode("X");
    closeButton.appendChild(closeBtn);
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();

    document.querySelector(".popup-overlay").remove();
  }
});

//reset all what you have done

document.querySelector(".setting-box .reset-option").onclick = function () {
  localStorage.clear();

  window.location.reload();
};
