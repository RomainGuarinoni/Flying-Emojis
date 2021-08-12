let settingsOpen = false;
const settingsButton = document.getElementById("settingWheel");
const settingsWindow = document.getElementById("settingsContainer");
const translateY = document.getElementById("input-translateY");

//open the settings panel
settingsButton.addEventListener("click", () => {
  settingsOpen = !settingsOpen;
  if (settingsOpen) {
    settingsWindow.style.display = "block";
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

const emojis = document.getElementsByClassName("emoji");

for (let index = 0; index < emojis.length; index++) {
  emojis[index].addEventListener("click", () => {
    createFlyingEmoji(emojis[index].textContent);
  });
}

/**
 *@description function triggered on each click of an emojy 
                and that create a flying emojy on the window
 * @param {HTMLElement} icon
 * @return {void} add a flying emojy to the HTML body
 */
function createFlyingEmoji(icon) {
  const positionX = Math.random() * window.innerWidth;
  const timing = 1000;
  const bezier = `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`;
  //HTML property
  const flyingEmoji = document.createElement("div");
  flyingEmoji.innerHTML = `<p>${icon} </p>`;

  //CSS property
  flyingEmoji.style.position = "absolute";
  flyingEmoji.style.left = `${positionX}px`;
  flyingEmoji.style.bottom = `-5px`;
  const keyFramesName = createRandomAnimation(timing);
  flyingEmoji.style.animation = `${keyFramesName} ${timing}ms ${bezier}`;
  document.body.appendChild(flyingEmoji);

  //remove the node when animation is done
  setTimeout(() => {
    document.body.removeChild(flyingEmoji);
  }, timing);
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
          transform: translateY(0px);
        }
        100% {
          transform: translateY(-${document.body.clientHeight + 50}px);
          display:none;
        }
      }`,
    index
  );
  return keyFramesName;
}
