document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("copy", function (e) {
  e.preventDefault();
  alert("Copying is disabled on this quiz page.");
});

document.addEventListener("cut", function (e) {
  e.preventDefault();
});

document.addEventListener("paste", function (e) {
  e.preventDefault();
});

document.addEventListener("selectstart", function (e) {
  e.preventDefault();
});

document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  const key = e.key.toLowerCase();

  if (
    e.key === "F12" ||
    (e.ctrlKey && key === "c") ||
    (e.ctrlKey && key === "x") ||
    (e.ctrlKey && key === "u") ||
    (e.ctrlKey && key === "s") ||
    (e.ctrlKey && key === "a") ||
    (e.ctrlKey && key === "p") ||
    (e.ctrlKey && e.shiftKey && key === "i") ||
    (e.ctrlKey && e.shiftKey && key === "j") ||
    (e.ctrlKey && e.shiftKey && key === "c")
  ) {
    e.preventDefault();
    return false;
  }
});