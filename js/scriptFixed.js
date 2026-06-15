gsap.registerPlugin(ScrollTrigger);

// LOADER

window.addEventListener("load",()=>{

    gsap.to(".loader",{
        opacity:0,
        duration:1.5,
        delay:1,
        pointerEvents:"none"
    });

});

// LENIS

const lenis = new Lenis();

function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// HERO ANIMATION

gsap.from(".hero h1",{
    y:120,
    opacity:0,
    duration:1.5
});

// REVEAL

gsap.to(".reveal",{

    opacity:1,
    y:0,

    duration:1.5,

    scrollTrigger:{
        trigger:".reveal",
        start:"top 80%"
    }

});

// HORIZONTAL SCROLL

gsap.to(".horizontal-track",{

    xPercent:-300,

    ease:"none",

    scrollTrigger:{
        trigger:".horizontal-section",
        start:"top top",
        end:"bottom bottom",
        scrub:1,
        pin:true
    }

});

// ADVANCED CURSOR

const cursor = document.querySelector('.cursor');

window.addEventListener('mousemove',(e)=>{

    gsap.to(cursor,{

        x:e.clientX,
        y:e.clientY,

        duration:0.12

    });

});

document.querySelectorAll('a').forEach(link=>{

    link.addEventListener('mouseenter',()=>{

        gsap.to(cursor,{

            scale:4,

            duration:0.3

        });

    });

    link.addEventListener('mouseleave',()=>{

        gsap.to(cursor,{

            scale:1,

            duration:0.3

        });

    });

});