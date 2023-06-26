import HelpScout from "@helpscout/javascript-sdk";

HelpScout.setAppHeight(300);

HelpScout.getApplicationContext().then((data) => {
  const canvasName = "canvas-123";
  const localStorageKey = `${canvasName}/${data.conversation.id}`;
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#1292EE";
  ctx.lineWidth = 8;
  let isDrawing = false;

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);

  const loadFromLocalStorage = () => {
    var img = new Image();
    img.onload = function () {
      ctx.drawImage(img, 0, 0); // Or at whatever offset you like
    };
    img.src = localStorage.getItem(localStorageKey);
  };

  loadFromLocalStorage();

  document.querySelector("#color-form").addEventListener("change", (event) => {
    const color = event.target.value;
    document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      if (checkbox.value !== color) {
        checkbox.checked = false;
      }
    });
    ctx.strokeStyle = color;
  });

  function startDrawing(event) {
    isDrawing = true;

    draw(event);
  }

  function draw(event) {
    if (!isDrawing) return;

    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
  }

  document.querySelector("#save").addEventListener("click", () => {
    localStorage.setItem(localStorageKey, canvas.toDataURL());
  });

  document
    .querySelector("#load")
    .addEventListener("click", loadFromLocalStorage);

  document.querySelector("#clear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.querySelector("#size").addEventListener("input", (e) => {
    ctx.lineWidth = e.target.value;
  });
});
