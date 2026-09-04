// Dedicated JavaScript — Lead (Pb)
const element={"name": "Lead", "symbol": "Pb", "atomicNumber": 82, "atomicMass": "207.2", "category": "Metal", "meltingPoint": "327.5 °C", "boilingPoint": "1749 °C", "electronConfiguration": "[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²", "about": "A dense post-transition metal used in specialised industrial applications."};
document.getElementById("atomic-number").textContent=element.atomicNumber;
document.getElementById("atomic-mass").textContent=element.atomicMass;
document.getElementById("melting-point").textContent=element.meltingPoint;
document.getElementById("boiling-point").textContent=element.boilingPoint;
document.getElementById("electron-config").textContent=element.electronConfiguration;
document.getElementById("about").textContent=element.about;

document.body.classList.add("fade-in");
document.querySelector(".element-card")?.addEventListener("click", function(){
  for(let i=0;i<7;i++){
    const s=document.createElement("span"); s.className="sparkle";
    const r=this.getBoundingClientRect();
    s.style.left=(r.left+r.width/2)+"px"; s.style.top=(r.top+70)+"px";
    s.style.setProperty("--dx",(Math.random()*100-50)+"px");
    s.style.setProperty("--dy",(Math.random()*90-45)+"px");
    document.body.appendChild(s); setTimeout(()=>s.remove(),850);
  }
});
