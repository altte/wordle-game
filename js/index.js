const answer = "SHORT";

let index = 0;
let attempts = 0;
let timerId;

function appStart() {
  const handleBackspace = () => {
    if (index > 0) {
      index -= 1;
      const targetBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index}']`
      );
      targetBlock.innerText = "";
    } else return;
  };

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display: flex; justify-content: center; align-items: center; color: black; position: absolute; top: 40vh; left: 34vw; background-color: white; width: 250px; height:100px; border-radius: 20px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timerId);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  // 정답 확인
  const handleEnterkey = () => {
    let answerNumber = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const inputText = block.innerText;
      const answerAlphabet = answer[i];

      const keyBoard = document.querySelector(
        `.key-block[data-key='${inputText}']`
      );

      if (inputText === answerAlphabet) {
        answerNumber += 1;
        block.style.background = "#6AAA64";
        keyBoard.style.background = "#6AAA64";
      } else if (answer.includes(inputText)) {
        block.style.background = "#C9B458";
        keyBoard.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        keyBoard.style.background = "#787C7E";
      }
    }

    if (answerNumber === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (event) => {
    setValue(event);
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const currentTime = new Date();
      const passedTime = new Date(currentTime - startTime);
      const passedMin = passedTime.getMinutes().toString().padStart(2, "0");
      const passedSec = passedTime.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${passedMin}:${passedSec}`;
      timeH1.style.color = "white";
    }

    timerId = setInterval(setTime, 1000);
  };

  const handleClick = (event) => {
    setValue(event);
  };

  const setValue = (event) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    const type = event.type;
    const value =
      type === "keydown" ? event.key.toUpperCase() : event.target.dataset.key;

    if (value === "BACKSPACE") {
      handleBackspace();
      return;
    }

    if (index !== 5) {
      if (value === "ENTER") {
        return;
      }

      if (type === "keydown") {
        const keyCode = event.keyCode;
        if (65 <= keyCode && keyCode <= 90) {
          thisBlock.innerHTML = value;
          index += 1;
        }
      } else if (type === "click") {
        thisBlock.innerHTML = value;
        index += 1;
      }
    }

    // 한 줄의 모든 칸이 입력 되었을 때
    else {
      if (value === "ENTER") {
        handleEnterkey();
      } else return;
    }
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
  let key = document.querySelectorAll(".key-block");

  key.forEach((k) => {
    k.addEventListener("click", handleClick);
  });
}

appStart();
