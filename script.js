let rooms=[];
const input=document.getElementById('roomInput'), result=document.getElementById('result'), list=document.getElementById('roomList');
fetch('rooms.json').then(r=>r.json()).then(data=>{
  rooms=data;
  rooms.forEach(x=>{let o=document.createElement('option');o.value=x.room;list.appendChild(o)});
});
function normalize(s){return s.toLowerCase().replace(/[^a-z0-9]/g,'')}
function findRoom(){
  const q=normalize(input.value);
  if(!q){show("Please enter a room number.");return}
  let room=rooms.find(x=>normalize(x.room)===q);
  if(!room) room=rooms.find(x=>normalize(x.room).includes(q));
  if(!room){show("Room not found. Try a value such as LH 17, LH 34A, Lab 08 or Seminar Hall-II.");return}
  const floor=room.floor===0?'Ground Floor':`${room.floor}${room.floor===1?'st':room.floor===2?'nd':'rd'} Floor`;
  const entrance = room.floor===0 ? 'Ground-floor entrance' : `Staircase / Lift → ${floor}`;
  result.classList.remove('hidden');
  result.innerHTML=`
    <span class="badge">ROOM FOUND</span>
    <h2>${room.room}</h2>
    <div class="meta"><b>${room.building}</b> • ${floor}<br>${room.location}</div>
    <h3>Suggested route</h3>
    <div class="route">
      <div class="step">📍 Main Entrance</div><div class="arrow">→</div>
      <div class="step">${entrance}</div><div class="arrow">→</div>
      <div class="step">🚪 ${room.room}</div>
    </div>
    <p style="margin-top:20px;color:#667085">Next upgrade: replace this text route with an interactive floor map and shortest-path navigation.</p>`;
  result.scrollIntoView({behavior:'smooth',block:'center'});
}
function show(msg){result.classList.remove('hidden');result.innerHTML=`<p>${msg}</p>`}
document.getElementById('findBtn').onclick=findRoom;
input.addEventListener('keydown',e=>{if(e.key==='Enter')findRoom()});
