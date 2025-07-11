const logo = document.getElementById("nav-logo");
const logos = ["images/resume-logo1.svg", "images/resume-logo2.svg", "images/resume-logo3.svg", "images/resume-logo4.svg"]; // add more if needed
let i = 0;

setInterval(() => {
  i = (i + 1) % logos.length;
  logo.src = logos[i];
}, 700); // change every 1 second