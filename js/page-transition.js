const links = document.querySelectorAll('a');

links.forEach(link=>{

  link.addEventListener('click',(e)=>{

    const target = link.href;

    e.preventDefault();

    gsap.to('body',{
      opacity:0,
      duration:0.5,
      onComplete:()=>{
        window.location = target;
      }
    });

  });

});