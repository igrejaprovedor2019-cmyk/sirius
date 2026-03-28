let current=0;
const steps=document.querySelectorAll(".step");

function show(i){
steps.forEach(s=>s.classList.remove("active"));
steps[i].classList.add("active");
}

function next(){ if(current<steps.length-1){current++; show(current);} }
function prev(){ if(current>0){current--; show(current);} }

document.getElementById("form").addEventListener("submit", function(e){
e.preventDefault();
document.getElementById("msg").innerText="Cadastro enviado!";
});
