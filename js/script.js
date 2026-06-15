gsap.registerPlugin(ScrollTrigger);

// RESPONSIVE SCALE

const isMobile =
window.innerWidth < 768;

const motionMultiplier =
isMobile ? 0.4 : 1;

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

// HERO KINETIC TYPOGRAPHY

gsap.to(".hero-description",{

    y:0,

    stagger:0.12,

    duration:1.4,

    ease:"power4.out",

    delay:0.5

});

gsap.from(".hero-description",{

    y:40,
    opacity:0,

    duration:1.5,

    delay:1.1

});

gsap.from(".hero-buttons",{

    y:40,
    opacity:0,

    duration:1.5,

    delay:1.3

});

gsap.from(".hero-mini-text",{

    opacity:0,

    y:20,

    duration:1,

    delay:0.8

});

// PARALLAX HERO

window.addEventListener('mousemove',(e)=>{

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    gsap.to('.hero-glow',{

        x:-x * motionMultiplier,
        y:-y * motionMultiplier,

        duration:2,

        ease:"power3.out"

    });

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

/* =========================================================
RESPONSIVE VALUES
========================================================= */

const screenWidth =
window.innerWidth;

const isSmallMobile =
screenWidth < 480;

const isMobileLandscape =
screenWidth >= 480 &&
screenWidth < 768;

const isTabletLandscape =
screenWidth >= 768 &&
screenWidth < 1200;

/* =========================================================
REVEAL SECTION
========================================================= */

gsap.utils.toArray('.reveal').forEach((text)=>{

    gsap.fromTo(

        text,

        {
            opacity:0,
            y:isMobile ? 60 : 120,
            scale:isMobile ? 0.96 : 0.92,
            filter:'blur(10px)'
        },

        {
            opacity:1,
            y:0,
            scale:1,
            filter:'blur(0px)',

            duration:isMobile ? 1 : 1.6,

            ease:'power3.out',

            scrollTrigger:{

                trigger:text,

                start:isMobile
                ? 'top 92%'
                : 'top 80%',

                end:'bottom 60%',

                toggleActions:
                'play none none reverse'

            }

        }

    );

});

/* =========================================================
HORIZONTAL SECTION RESPONSIVE
========================================================= */

const horizontalTrack =
document.querySelector('.horizontal-track');

const panels =
gsap.utils.toArray('.panel');

/* =========================================================
MOBILE MODE
VERTICAL STACK
========================================================= */

if(isMobile){

    /* RESET */

    gsap.set(horizontalTrack,{

        x:0

    });

    /* PANEL ANIMATION */

    panels.forEach((panel,index)=>{

        gsap.from(panel,{

            opacity:0,
            y:120,

            scale:0.92,

            duration:1.2,

            ease:'power4.out',

            scrollTrigger:{

                trigger:panel,

                start:'top 88%'

            }

        });

    });

}

/* =========================================================
DESKTOP/TABLET MODE
HORIZONTAL CINEMATIC
========================================================= */

else{

    const totalPanels =
    panels.length;

    const horizontalAmount =
    -100 * (totalPanels - 1);

    gsap.to(horizontalTrack,{

        xPercent:horizontalAmount,

        ease:'none',

        scrollTrigger:{

            trigger:'.horizontal-section',

            start:'top top',

            end:()=>`+=${window.innerWidth * (totalPanels - 1)}`,

            scrub:1,

            pin:true,

            anticipatePin:1,

            invalidateOnRefresh:true

        }

    });

    /* =====================================================
    PANEL PARALLAX
    ===================================================== */

    panels.forEach((panel,index)=>{

        const inner =
        panel.querySelector('h2') ||
        panel;

        gsap.fromTo(

            inner,

            {
                opacity:0.2,
                scale:0.8,
                y:100
            },

            {
                opacity:1,
                scale:1,
                y:0,

                ease:'power3.out',

                scrollTrigger:{

                    trigger:panel,

                    containerAnimation:
                    ScrollTrigger.getAll().find(
                        st=>st.trigger ===
                        document.querySelector('.horizontal-section')
                    ),

                    start:'left center',

                    end:'right center',

                    scrub:1

                }

            }

        );

    });

}

/* =========================================================
RESPONSIVE PANEL INTERACTION
========================================================= */

panels.forEach((panel)=>{

    if(!isMobile){

        panel.addEventListener('mousemove',(e)=>{

            const rect =
            panel.getBoundingClientRect();

            const x =
            (e.clientX - rect.left) /
            rect.width;

            const y =
            (e.clientY - rect.top) /
            rect.height;

            gsap.to(panel,{

                rotateY:
                (x - 0.5) * 6,

                rotateX:
                -(y - 0.5) * 6,

                transformPerspective:1200,

                duration:0.8,

                ease:'power3.out'

            });

        });

        panel.addEventListener('mouseleave',()=>{

            gsap.to(panel,{

                rotateX:0,
                rotateY:0,

                duration:1.2,

                ease:'elastic.out(1,0.4)'

            });

        });

    }

});

/* =========================================================
AUTO REFRESH
========================================================= */

window.addEventListener('resize',()=>{

    ScrollTrigger.refresh();

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
// NAVBAR ANIMATION


gsap.from(".nav-status",{

    opacity:0,
    x:40 * motionMultiplier,

    duration:1.2,

    delay:0.6

});

// MAGNETIC EFFECT

const magnetics = document.querySelectorAll('.magnetic');

magnetics.forEach(item=>{

    item.addEventListener('mousemove',(e)=>{

        const position = item.getBoundingClientRect();

        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;

        gsap.to(item,{
            x:x * 0.25 * motionMultiplier,
            y:y * 0.25 * motionMultiplier,
            duration:0.4
        });

    });

    item.addEventListener('mouseleave',()=>{

        gsap.to(item,{
            x:0,
            y:0,
            duration:0.6,
            ease:"elastic.out(1,0.3)"
        });

    });

});

// NAVBAR REACTIVE

window.addEventListener('scroll',()=>{

    if(window.scrollY > 50){

        gsap.to('.navbar',{

            width:'90%',
            height:'70px',

            background:'rgba(0,0,0,0.6)',

            duration:0.5

        });

    }

    else{

        gsap.to('.navbar',{

            width:'95%',
            height:'85px',

            background:'rgba(10,10,10,0.35)',

            duration:0.5

        });

    }

});

// HERO INTRO

gsap.from(".hero h1",{
    y:120,
    opacity:0,
    duration:1.5
});


// HERO INTRO CLEAN


gsap.from(".hero-content p",{

    y:25,
    opacity:0,

    duration:1.2,

    delay:0.9

});

gsap.from(".hero-buttons",{

    y:30,
    opacity:0,

    duration:1.2,

    delay:1.2

});

// DEPTH PARALLAX

window.addEventListener('mousemove',(e)=>{

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    gsap.to('.depth-1',{

        x:(x - 0.5) * 80 * motionMultiplier,
        y:(y - 0.5) * 80 * motionMultiplier,

        duration:2

    });

    gsap.to('.depth-2',{

        x:(x - 0.5) * -120 * motionMultiplier,
        y:(y - 0.5) * -120 * motionMultiplier,

        duration:3

    });

    gsap.to('.depth-3',{

        x:(x - 0.5) * 50 * motionMultiplier,
        y:(y - 0.5) * 50 * motionMultiplier,

        duration:2.5

    });

});

// SCROLL PROGRESS

window.addEventListener('scroll',()=>{

    const scrollTop = window.scrollY;

    const docHeight =
    document.body.scrollHeight - window.innerHeight;

    const progress =
    (scrollTop / docHeight) * 100;

    gsap.to('.scroll-progress',{

        width:progress + '%',

        duration:0.2

    });

});

// GALLERY REVEAL

gsap.utils.toArray('.gallery-item').forEach((item)=>{

    gsap.from(item,{

        y:120,
        opacity:0,

        duration:1.4,

        ease:"power4.out",

        scrollTrigger:{

            trigger:item,

            start:"top 85%"

        }

    });

});

// VIDEO HOVER SYSTEM

const cards = document.querySelectorAll('.video-card');

cards.forEach(card=>{

    const video = card.querySelector('video');

    card.addEventListener('mouseenter',()=>{

        video.play();

    });

    card.addEventListener('mouseleave',()=>{

        video.pause();

        video.currentTime = 0;

    });

});

// FULLSCREEN MODAL

const modal = document.querySelector('.video-modal');

const fullscreenVideo =
document.querySelector('.fullscreen-video');

const closeModal =
document.querySelector('.close-modal');

cards.forEach(card=>{

    card.addEventListener('click',()=>{

        const source =
        card.querySelector('source').src;

        fullscreenVideo.src = source;

        fullscreenVideo.muted = false;

        fullscreenVideo.play();

        modal.classList.add('active');

        document.body.style.overflow='hidden';

    });

});

closeModal.addEventListener('click',()=>{

    modal.classList.remove('active');

    fullscreenVideo.pause();

    fullscreenVideo.src='';

    document.body.style.overflow='auto';

});


// REVEAL GALLERY ITEMS

gsap.utils.toArray(".reveal-gallery").forEach((item) => {

    gsap.fromTo(

        item,

        {
            opacity:0,
            y:80,
            scale:0.96,
            filter:"blur(12px)"
        },

        {
            opacity:1,
            y:0,
            scale:1,
            filter:"blur(0px)",

            duration:1.4,

            ease:"power4.out",

            scrollTrigger:{
                trigger:item,
                start:"top 85%",
                toggleActions:"play none none reverse"
            }
        }

    );

});


