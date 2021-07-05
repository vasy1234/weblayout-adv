// window.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('.burger').addEventListener('click', function () {
//     document.querySelector('.menu').classList.toggle('menu--open')
//     document.querySelector('.burger').classList.toggle('menu--open')
//   })
// })
var tween = gsap.to(".menu", {
  duration: 1.5,
  y: 0,
  display: "block",
  opacity: "1",
  ease: "none",
  paused: true
});

document.querySelector("#burger").onclick = () => tween.play();
document.querySelector("#close").onclick = () => tween.reverse();
