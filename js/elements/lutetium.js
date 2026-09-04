// Dedicated JavaScript — Lutetium (Lu)
const element={"name": "Lutetium", "symbol": "Lu", "atomicNumber": 71, "atomicMass": "174.97", "category": "Metal", "meltingPoint": "1663 °C", "boilingPoint": "3402 °C", "electronConfiguration": "[Xe] 4f¹⁴ 5d¹ 6s²", "about": "A dense lanthanide used in specialised scientific applications."};
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
