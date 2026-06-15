const cursor = document.querySelector(".custom-cursor-ax91");

window.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

document.querySelectorAll("a, button, .video-card").forEach(el=>{

    el.addEventListener("mouseenter",()=>{

        cursor.classList.add("hover");

    });

    el.addEventListener("mouseleave",()=>{

        cursor.classList.remove("hover");

    });

});