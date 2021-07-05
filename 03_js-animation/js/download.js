// var box = document.querySelector(".hero__left").style.opacity = 0;
// show(".hero__left", 100);

// function show(id, speed) {
//   let vars;
//   var ID = setInterval(function () {
//     (vars = Number(document.querySelector(".hero__left").style.opacity));
//     if (vars > 1) {
//       clearInterval(ID);
//     }
//     vars += 0.1;
//     document.querySelector(".hero__left").style.opacity = vars;
//   }, speed);
// }
var tl = gsap.timeline();

tl.from(".hero__left", {
  duration: 1.5,
  y: 70,
})

gsap.from(".hero__descr", {
  duration: 1,
  opacity: 0,
  x: 20,
}, "+=0.7")
tl.from(".photo-1", {
  duration: .5,
  x: 0,
  scale: 0,
})
tl.from(".photo-2", {
  duration: .5,
  x: 0,
  scale: 0,
})
tl.from(".photo-3", {
  duration: .5,
  x: 0,
  scale: 0,
  easy: "power2"
})
tl.from(".photos__author", {
  duration: .5,
  x: 10,
  opacity: "0",
})
