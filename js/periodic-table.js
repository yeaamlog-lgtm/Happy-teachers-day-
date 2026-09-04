fetch("elements/elements.json").then(r=>r.json()).then(({elements})=>{window.DEDICATED_ELEMENTS=elements;});
document.addEventListener("click",(ev)=>{
 const a=ev.target.closest(".periodic-table .element"); if(!a)return;
 a.classList.remove("pop-in"); void a.offsetWidth; a.classList.add("pop-in");
});
