const steps = Array.from(document.querySelectorAll(".form-step"));
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const progressItems = document.querySelectorAll(".step-item");
const progressBar = document.getElementById("progressBar");
const form = document.getElementById("multiStepForm");

// Avançar Etapa
nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (validateStep()) {
            changeStep(1);
        }
    });
});

// Voltar Etapa
prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        changeStep(-1);
    });
});

function changeStep(direction) {
    const activeStep = document.querySelector(".form-step.active");
    let index = steps.indexOf(activeStep);
    
    steps[index].classList.remove("active");
    progressItems[index].classList.remove("active");
    
    index += direction;
    
    steps[index].classList.add("active");
    progressItems[index].classList.add("active");
    
    // Atualiza Barra de Progresso Visual
    const progressPercent = (index / (steps.length - 1)) * 100;
    progressBar.style.width = progressPercent + "%";
}

function validateStep() {
    const activeStep = document.querySelector(".form-step.active");
    const inputs = activeStep.querySelectorAll("input[required]");
    let valid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            valid = false;
            input.style.borderColor = "#ff4d4d";
        } else {
            input.style.borderColor = "#ddd";
        }
    });
    
    if (!valid) alert("Por favor, preencha todos os campos obrigatórios marcados com *");
    return valid;
}

// ENVIO PARA WHATSAPP
form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    let message = "📋 *NOVO CADASTRO RECEBIDO*\n\n";
    let hasFiles = false;

    formData.forEach((value, key) => {
        // Verifica se é arquivo
        if (value instanceof File && value.name) {
            hasFiles = true;
            message += `✅ *${key}:* Foto anexada no formulário\n`;
        } else if (value && typeof value === 'string') {
            message += `*${key}:* ${value}\n`;
        }
    });

    if(hasFiles) {
        message += "\n⚠️ *Nota:* O usuário tirou fotos (RG/SUS). Solicite o envio das imagens caso elas não apareçam abaixo.";
    }

    const phoneNumber = "559291404115";
    const finalUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // Feedback no botão
    const submitBtn = document.querySelector(".btn-submit");
    submitBtn.innerHTML = "ABRINDO WHATSAPP...";
    submitBtn.style.background = "#128C7E";

    // Pequeno delay para efeito visual e garantir que o navegador processe
    setTimeout(() => {
        window.location.href = finalUrl;
    }, 800);
});
