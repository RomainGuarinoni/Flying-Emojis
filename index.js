let settingsOpen = false;

//variable for settings options
let translateX = false;
let rotate = false;
let scale = 1;
let duration = 1000;

const settingsButton = document.getElementById("settingWheel");
const settingsWindow = document.getElementById("settingsContainer");
const translateXButton = document.getElementById("input-translateX");
const rotateButton = document.getElementById("input-rotate");
const scaleButton = document.getElementById("input-scale");
const durationButton = document.getElementById("input-duration");
const options = [
  {
    button: translateXButton,
    function: () => (translateX = !translateX),
  },
  {
    button: rotateButton,
    function: () => (rotate = !rotate),
  },
  {
    button: scaleButton,
    function: (e) => {
      scale = e.target.value;
    },
  },
  {
    button: durationButton,
    function: (e) => {
      duration = e.target.value;
    },
  },
];

//open settings pannel
settingsButton.addEventListener("click", () => {
  settingsOpen = !settingsOpen;
  if (settingsOpen) {
    settingsWindow.style.display = "flex";
  } else {
    settingsWindow.style.display = "none";
  }
});

//listen if the user click outside of the settings pannel
window.addEventListener("click", (e) => {
  if (
    !settingsWindow.contains(e.target) &&
    !settingsButton.contains(e.target)
  ) {
    settingsOpen = false;
    settingsWindow.style.display = "none";
  }
});

//Add event listener for options
for (let i = 0; i < options.length; i++) {
  options[i].button.addEventListener("change", options[i].function);
}
const emojis = document.getElementsByClassName("emoji");

for (let index = 0; index < emojis.length; index++) {
  emojis[index].addEventListener("click", () => {
    createFlyingEmoji(emojis[index].textContent);
  });
}

/**
 * @description function triggered on each click of an emojy and that create a flying emojy on the window
 * @param {HTMLElement} icon
 * @return {void} add a flying emojy to the HTML body
 */
function createFlyingEmoji(icon) {
  const positionX = Math.random() * window.innerWidth;
  const bezier = `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`;
  //HTML property
  const flyingEmoji = document.createElement("div");
  flyingEmoji.innerHTML = `<p>${icon} </p>`;

  //CSS property
  flyingEmoji.style.position = "absolute";
  flyingEmoji.style.left = `${positionX}px`;
  flyingEmoji.style.bottom = `-5px`;
  const keyFramesName = createRandomAnimation(duration);
  flyingEmoji.style.animation = `${keyFramesName} ${duration}ms ${bezier}`;
  document.body.appendChild(flyingEmoji);

  //remove the node when animation is done
  setTimeout(() => {
    document.body.removeChild(flyingEmoji);
  }, duration);
}

/**
 *
 * @returns {string} create an UUID
 */
function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * @return {string} the uuid Name of the animation
 */
function createRandomAnimation() {
  const css = window.document.styleSheets[0];
  const keyFramesName = "keyframe-" + createUUID();
  const index = css.cssRules.length;
  css.insertRule(
    `
    @keyframes ${keyFramesName} {
        0% {
          transform: translate(0px,0px) scale(1) rotate(0deg)  ;
        }
        100% {
          transform: translate(${
            translateX
              ? Math.random() > 0.5
                ? Math.random() * document.body.clientWidth
                : -Math.random() * document.body.clientWidth
              : 0
          }px,-${document.body.clientHeight + 50}px) rotate(${
      rotate ? "180deg" : 0
    }) scale(${scale}) ;
          display:none;
        }
      }`,
    index
  );
  return keyFramesName;
}
