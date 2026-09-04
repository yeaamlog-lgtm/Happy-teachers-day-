// Dedicated JavaScript — Krypton (Kr)
const element={"name": "Krypton", "symbol": "Kr", "atomicNumber": 36, "atomicMass": "83.798", "category": "Non-metal", "meltingPoint": "−157.4 °C", "boilingPoint": "−153.4 °C", "electronConfiguration": "[Ar] 3d¹⁰ 4s² 4p⁶", "about": "A noble gas used in specialised lighting and scientific applications."};
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
