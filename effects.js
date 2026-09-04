
(function(){
  const reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce)return;
  document.addEventListener("click",e=>{
    const t=e.target.closest("button,.button,.cta,.back");
    if(!t)return;
    const r=t.getBoundingClientRect();
    for(let i=0;i<5;i++){
      const s=document.createElement("span");s.className="sparkle";
      s.style.left=(r.left+r.width/2)+"px";s.style.top=(r.top+r.height/2)+"px";
      s.style.setProperty("--dx",(Math.random()*80-40)+"px");
      s.style.setProperty("--dy",(Math.random()*70-35)+"px");
      document.body.appendChild(s);setTimeout(()=>s.remove(),850);
    }
  });
  document.querySelectorAll("main > *").forEach((el,i)=>{
    el.style.animationDelay=Math.min(i*70,420)+"ms";
    el.classList.add("float-in");
  });
})();
