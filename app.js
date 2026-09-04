
function openDedicatedElementPage(elementName){
  const match = window.DEDICATED_ELEMENTS?.find(e => e.name === elementName);
  if(match) window.location.href = `elements/${match.slug}.html`;
}
document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Entrance
  const enter = $("#enterClass");
  if (enter) {
    enter.addEventListener("click", () => {
      $("#transition")?.classList.add("on");
      setTimeout(() => location.href = "classroom.html", 450);
    });
  }

  // Classroom
  const modal = $("#modal"), modalCard = $("#modalCard");
  if (!modal) return;

  function openModal(html) {
    modalCard.innerHTML = html;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
    const close = $(".modal-close", modalCard);
    close?.addEventListener("click", closeModal);
  }
  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden","true");
  }
  $(".modal-backdrop")?.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

  $("#homeTop")?.addEventListener("click", () => scrollTo({top:0,behavior:"smooth"}));
  $("#periodicTop")?.addEventListener("click", () => openPeriodicTable());

  // Our Bond
  $("#bondTop")?.addEventListener("click", () => {
    openModal(`<button class="modal-close">×</button>
      <h2>The Bond We Share 🔗</h2>
      <p class="sub">Not ionic. Not covalent. Just unforgettable.</p>
      <div class="bond-card">
        <div class="bond-equation"><span>Renu Ma'am</span><b>+</b><span>Class 10-D</span><b>→</b><strong>One special bond ❤️</strong></div>
        <p>Some bonds are written in formulas. Ours is written in the little things — every lesson, every laugh, every question, and every moment that made our classroom feel like home.</p>
        <div class="bond-footer">THE CHEMISTRY OF US • 2026</div>
      </div>`);
  });

  // Blackboard — Ma'am taps the board, then a pen physically writes the message.
  const board = $("#blackboard");
  const reveal = $("#boardReveal");
  const pen = $("#boardPen");
  const hint = $("#boardTapText");

  function prepareBoardWriting(){
    if(!reveal || reveal.dataset.prepared) return;
    reveal.querySelectorAll("[data-write]").forEach(el => {
      const lines = el.dataset.write.split("|");
      el.innerHTML = lines.map(line => `<span class="write-line">${[...line].map(ch => `<span class="write-char">${ch === " " ? "&nbsp;" : ch}</span>`).join("")}</span>`).join("");
    });
    reveal.dataset.prepared = "1";
  }

  async function writeBoard(){
    if(!board || !reveal || board.classList.contains("revealed")) return;
    prepareBoardWriting();
    board.classList.add("revealed", "writing");
    if (hint) hint.textContent = "Writing a little message, just for you… ✨";
    reveal.setAttribute("aria-hidden", "false");
    const chars = [...reveal.querySelectorAll(".write-char")];
    const boardRect = board.getBoundingClientRect();
    if(pen){ pen.style.opacity = "1"; pen.style.left = "50%"; pen.style.top = "45%"; }

    for(const ch of chars){
      ch.classList.add("written");
      if(pen && ch.textContent.trim()){
        const r = ch.getBoundingClientRect();
        pen.style.left = `${r.left - boardRect.left + r.width/2 - 5}px`;
        pen.style.top = `${r.top - boardRect.top - 5}px`;
      }
      await new Promise(res => setTimeout(res, ch.textContent.trim() ? 24 : 7));
    }
    board.classList.remove("writing");
    if(pen) pen.classList.add("finished");
    if(hint) hint.textContent = "Written with love by Class 10-D ❤️";
  }

  board?.addEventListener("click", writeBoard);

  // Teacher desk
  $("#teacherDesk")?.addEventListener("click", () => {
    openModal(`<button class="modal-close">×</button>
      <h2>Teacher's Desk</h2><p class="sub">A little note from your class.</p>
      <div class="desk-open">
        <div class="desk-letter">Dear Renu Ma'am,<br><br>
          Thank you for all the patience, laughs, explanations and little moments that made our classroom feel like our own.<br><br>
          <b>Happy Teacher's Day! ❤️</b><br><br>— Your Class</div>
        <div class="desk-doodle">🧪<br>＋<br>❤️</div>
      </div>`);
  });

  // Attendance register
  $("#register")?.addEventListener("click", () => {
    const students = [
      "AALIMA MALIK","AARAV NIGAM","AARIZ","AARYAN","ABHINAV","ABHIYUDAY","AHMED AYYAN","AKRITYA",
      "ANANT SRIVASTAV","ANANYA JAISWAL","ANUSHKA","ANVI","ANVI MAURYA","ATMIKA","DEVANSH","HARSH","HARSHITA",
      "KAUSHIKI","KULSOOM","MADHAVAN","MADHVENDRA","MANU RAGHUVANSHI","MOHAMMAD AYAN SIDDIQUI","MOHI",
      "PRAKHAR","PRATYUSH","RAGHAV","RIDHIMA","RISHIT","SACHI","SAMRAT","SATWIK","SHREYANSH","SHIVI",
      "SIMRAH","SRISHTHI","TANISHA","TEJAS PATHAK","TEJAS TIWARI","UTKARSH","VARUN","VIVAAN"
    ];
    const rows = students.map((name,i) => `<div class="student-row" data-no="${i+1}"><span>${name}</span><span class="tick">✓</span></div>`).join("");
    openModal(`<button class="modal-close">×</button><div class="register-heading"><h2>CLASS 10-D — 2026 REPORTING</h2><p class="sub">Attendance Register • 42 Students</p></div><div class="register-list">${rows}</div>`);
  });

  // Sticky notes
  $("#notesBoard")?.addEventListener("click", () => {
    const cards = window.NOTES.map(([name,text],i) => `
      <article class="sticky" style="--r:${[-2,1,2,-1,3,-2,1,-1,2,-2,1,0][i]||0}deg">
        <small>${name}</small><div class="note-full">${text}</div>
      </article>`).join("");
    openModal(`<button class="modal-close">×</button><h2>Our Notes</h2><p class="sub">A few words from the class.</p><div class="notes-grid">${cards}</div>`);
    $$(".sticky", modalCard).forEach(card => card.addEventListener("click", () => {
      card.classList.toggle("sticky-expand");
    }));
  });

  // Periodic table — dedicated header icon/button
  function openPeriodicTable() {
    const cells = window.ELEMENTS.map((e,i) => {
      const [name,sym,num,mass,cat,mp,bp,config,about] = e;
      let row, col;
      const positions = {
        1:[1,1],2:[1,18],3:[2,1],4:[2,2],5:[2,13],6:[2,14],7:[2,15],8:[2,16],9:[2,17],10:[2,18],
        11:[3,1],12:[3,2],13:[3,13],14:[3,14],15:[3,15],16:[3,16],17:[3,17],18:[3,18],
        19:[4,1],20:[4,2],21:[4,3],22:[4,4],23:[4,5],24:[4,6],25:[4,7],26:[4,8],27:[4,9],28:[4,10],29:[4,11],30:[4,12],31:[4,13],32:[4,14],33:[4,15],34:[4,16],35:[4,17],36:[4,18],
        37:[5,1],38:[5,2],39:[5,3],40:[5,4],41:[5,5],42:[5,6],43:[5,7],44:[5,8],45:[5,9],46:[5,10],47:[5,11],48:[5,12],49:[5,13],50:[5,14],51:[5,15],52:[5,16],53:[5,17],54:[5,18],
        55:[6,1],56:[6,2],57:[6,3],72:[6,4],73:[6,5],74:[6,6],75:[6,7],76:[6,8],77:[6,9],78:[6,10],79:[6,11],80:[6,12],81:[6,13],82:[6,14],83:[6,15],84:[6,16],85:[6,17],86:[6,18],
        87:[7,1],88:[7,2],89:[7,3],104:[7,4],105:[7,5],106:[7,6],107:[7,7],108:[7,8],109:[7,9],110:[7,10],111:[7,11],112:[7,12],113:[7,13],114:[7,14],115:[7,15],116:[7,16],117:[7,17],118:[7,18]
      };
      if(!positions[num]){
        if(num>=58 && num<=71){row=8;col=num-57}
        else if(num>=90 && num<=103){row=9;col=num-89}
      } else [row,col]=positions[num];
      const cl=cat.toLowerCase(); const cls=cl.includes("noble")?"noble-gas":cl.includes("non-metal")||cl.includes("nonmetal")?"nonmetal":cl.includes("metalloid")?"metalloid":cl.includes("halogen")?"halogen":cl.includes("alkali")?"alkali-metal":cl.includes("alkaline")?"alkaline-earth":cl.includes("lanthanide")?"lanthanide":cl.includes("actinide")?"actinide":cl.includes("transition")?"transition-metal":"metal";
      return `<button class="element ${cls}" style="grid-column:${col};grid-row:${row}" data-i="${i}" data-slug="${name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}"><span class="num">${num}</span><span class="sym">${sym}</span><span class="name">${name}</span></button>`;
    }).join("");
    openModal(`<button class="modal-close">×</button><h2>Periodic Table</h2><p class="sub">Tap an element to explore its details.</p><div class="periodic-layout"><div class="periodic-wrap"><div class="periodic-table">${cells}</div></div><aside id="elementDetail" class="element-detail-panel"><div class="detail-placeholder">🧪<br><b>Select an element</b><span>Its chemistry will appear here.</span></div></aside></div>`);
    $$(".element", modalCard).forEach(btn => btn.addEventListener("click", () => {
      const [name,sym,num,mass,cat,mp,bp,config,about] = window.ELEMENTS[+btn.dataset.i];
      $("#elementDetail").innerHTML = `<div class="property-head"><div class="big-symbol">${sym}</div><div><h2 style="margin:0">${name}</h2><p class="sub" style="margin:4px 0">${cat} • Atomic number ${num}</p></div></div>
        <div class="props">
          <div class="prop"><span>ATOMIC MASS</span><b>${mass} u</b></div>
          <div class="prop"><span>MELTING POINT</span><b>${mp}</b></div>
          <div class="prop"><span>BOILING POINT</span><b>${bp}</b></div>
          <div class="prop"><span>ELECTRON CONFIGURATION</span><b>${config}</b></div>
        </div>
        <div class="about-element"><b>About this element</b><br>${about}</div>`;
    }));
  }
});