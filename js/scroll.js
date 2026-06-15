const progressBar = document.querySelector(".scroll-progress-x92");

window.addEventListener("scroll",()=>{

    const scrollTop =
    window.scrollY;

    const docHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

    const progress =
    (scrollTop / docHeight) * 100;

    progressBar.style.width =
    progress + "%";

});