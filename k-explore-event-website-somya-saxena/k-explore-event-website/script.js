const events = [
  {id:1,title:"Sound & Soul",category:"Music",date:"22 NOV 2026",time:"6:30 PM – 10:00 PM",venue:"Ekamra Haat, Bhubaneswar",description:"An evening of live music, good energy and unforgettable performances. Bring your friends and let the rhythm take over.",image:"https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85"},
  {id:2,title:"Future Forward",category:"Technology",date:"28 NOV 2026",time:"10:00 AM – 4:00 PM",venue:"KIIT Convention Centre, Bhubaneswar",description:"Explore emerging ideas in technology, connect with curious minds and hear fresh perspectives from the people building tomorrow.",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=85"},
  {id:3,title:"Canvas & Coffee",category:"Art",date:"05 DEC 2026",time:"11:00 AM – 2:00 PM",venue:"Cafe 16, Bhubaneswar",description:"A relaxed creative afternoon with colour, conversation and coffee. No experience needed—just bring your imagination.",image:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85"},
  {id:4,title:"The Mindful Morning",category:"Wellness",date:"12 DEC 2026",time:"7:00 AM – 9:00 AM",venue:"Ekamra Kanan, Bhubaneswar",description:"Slow down and reset with guided movement, breathing and a little time outdoors. A fresh start to your weekend.",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=85"},
  {id:5,title:"Indie Nights",category:"Music",date:"19 DEC 2026",time:"5:30 PM – 9:30 PM",venue:"Railway Auditorium, Bhubaneswar",description:"Discover independent sounds and local talent in a lively night celebrating music beyond the mainstream.",image:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85"},
  {id:6,title:"Design Dialogues",category:"Art",date:"09 JAN 2027",time:"10:30 AM – 1:30 PM",venue:"IDCO Exhibition Ground, Bhubaneswar",description:"A gathering for design lovers to exchange ideas, explore visual culture and get inspired by creative work.",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85"}
];

const grid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let activeCategory = "All";
let selectedEvent = null;

function renderEvents(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => (activeCategory === "All" || event.category === activeCategory) &&
    [event.title,event.category,event.venue,event.description].some(value => value.toLowerCase().includes(query)));
  grid.innerHTML = filtered.map(event => `
    <article class="event-card" tabindex="0" role="button" aria-label="View ${event.title} details" data-id="${event.id}">
      <div class="event-image"><img src="${event.image}" alt="${event.title}" loading="lazy"><span class="event-category">${event.category}</span></div>
      <div class="event-card-body"><span class="event-date">${event.date}</span><h3>${event.title}</h3>
      <p>${event.description}</p><div class="event-card-foot"><span>⌖ &nbsp;${event.venue}</span><b class="card-arrow">↗</b></div></div>
    </article>`).join("");
  emptyState.hidden = filtered.length > 0;
}

document.getElementById("filters").addEventListener("click", e => {
  const button = e.target.closest(".filter");
  if(!button) return;
  document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
  button.classList.add("active");
  activeCategory = button.dataset.category;
  renderEvents();
});
searchInput.addEventListener("input", renderEvents);

const eventModal = document.getElementById("eventModal");
const registerModal = document.getElementById("registerModal");
function openModal(modal){ modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden"; }
function closeModal(modal){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); if(!document.querySelector(".modal-backdrop.open")) document.body.style.overflow=""; }

function showEvent(event){
  selectedEvent = event;
  document.getElementById("modalImage").src = event.image;
  document.getElementById("modalImage").alt = event.title;
  document.getElementById("modalCategory").textContent = event.category;
  document.getElementById("modalDate").textContent = event.date;
  document.getElementById("modalTitle").textContent = event.title;
  document.getElementById("modalDescription").textContent = event.description;
  document.getElementById("modalVenue").textContent = event.venue;
  document.getElementById("modalTime").textContent = event.time;
  openModal(eventModal);
}
grid.addEventListener("click", e => {
  const card = e.target.closest(".event-card");
  if(card) showEvent(events.find(event => event.id === Number(card.dataset.id)));
});
grid.addEventListener("keydown", e => {
  if((e.key === "Enter" || e.key === " ") && e.target.classList.contains("event-card")){
    e.preventDefault(); showEvent(events.find(event => event.id === Number(e.target.dataset.id)));
  }
});

document.getElementById("registerButton").addEventListener("click", () => {
  closeModal(eventModal);
  document.getElementById("selectedEventName").textContent = selectedEvent.title;
  document.getElementById("eventNameField").value = selectedEvent.title;
  document.getElementById("registrationForm").hidden = false;
  document.getElementById("successMessage").hidden = true;
  document.getElementById("formError").textContent = "";
  openModal(registerModal);
});
document.getElementById("modalClose").addEventListener("click", () => closeModal(eventModal));
document.getElementById("registerClose").addEventListener("click", () => closeModal(registerModal));
[eventModal,registerModal].forEach(modal => modal.addEventListener("click", e => {if(e.target === modal) closeModal(modal)}));
document.addEventListener("keydown", e => {if(e.key === "Escape"){closeModal(eventModal);closeModal(registerModal)}});

document.getElementById("registrationForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const error = document.getElementById("formError");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(name.length < 2){error.textContent = "Please enter a name with at least 2 characters.";return;}
  if(!emailPattern.test(email)){error.textContent = "Please enter a valid email address.";return;}
  if(!/^\d{10}$/.test(phone)){error.textContent = "Please enter a valid 10-digit phone number.";return;}
  const registration = {name,email,phone,event:selectedEvent.title,registeredAt:new Date().toISOString()};
  const saved = JSON.parse(localStorage.getItem("kExploreRegistrations") || "[]");
  saved.push(registration);
  localStorage.setItem("kExploreRegistrations",JSON.stringify(saved));
  document.getElementById("registrationForm").hidden = true;
  document.getElementById("successText").textContent = `Thanks, ${name}! Your registration for ${selectedEvent.title} has been saved on this device.`;
  document.getElementById("successMessage").hidden = false;
});
document.getElementById("doneButton").addEventListener("click", () => {closeModal(registerModal);document.getElementById("registrationForm").reset();});
document.getElementById("menuToggle").addEventListener("click", () => {
  const links = document.getElementById("navLinks");
  const expanded = links.classList.toggle("show");
  document.getElementById("menuToggle").setAttribute("aria-expanded",String(expanded));
});
document.querySelectorAll("#navLinks a").forEach(link => link.addEventListener("click",()=>document.getElementById("navLinks").classList.remove("show")));
document.getElementById("year").textContent = new Date().getFullYear();
renderEvents();
