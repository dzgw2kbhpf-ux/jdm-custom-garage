const carSelect = document.getElementById("carSelect");
const gallery = document.getElementById("gallery");
const buildList = document.getElementById("buildList");

let cars = [];

/* ------------------------------
   車データ読み込み
--------------------------------*/
fetch("cars.json")
.then(res => res.json())
.then(data => {
cars = data;
loadCars();
loadGallery();
loadBuilds();
});

/* ------------------------------
   車選択
--------------------------------*/
function loadCars(){
cars.forEach(car=>{
const opt = document.createElement("option");
opt.value = car.name;
opt.textContent = car.name;
carSelect.appendChild(opt);
});
}

/* ------------------------------
   ギャラリー
--------------------------------*/
function loadGallery(){
cars.forEach(car=>{
const card = document.createElement("div");
card.className="carCard";

card.innerHTML=`
<img src="${car.image}">
<h3>${car.name}</h3>
<p>エンジン: ${car.engine}</p>
<p>馬力: ${car.hp}hp</p>
`;

gallery.appendChild(card);
});
}

/* ------------------------------
   ビルド保存
--------------------------------*/
function saveBuild(){

const build={
car: carSelect.value,
wheel: wheel.value,
height: height.value,
aero: aero.value
};

const builds = JSON.parse(localStorage.getItem("builds")||"[]");
builds.push(build);
localStorage.setItem("builds",JSON.stringify(builds));

loadBuilds();
}

/* ------------------------------
   ビルド表示
--------------------------------*/
function loadBuilds(){
buildList.innerHTML="";

const builds = JSON.parse(localStorage.getItem("builds")||"[]");

builds.forEach(b=>{
const div=document.createElement("div");
div.className="buildCard";

div.innerHTML=`
<b>${b.car}</b><br>
ホイール: ${b.wheel}<br>
車高: ${b.height}<br>
エアロ: ${b.aero}
`;

buildList.appendChild(div);
});
}
