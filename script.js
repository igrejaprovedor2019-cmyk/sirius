const steps = Array.from(document.querySelectorAll(".form-step"));
const nextBtns = document.querySelectorAll(".btn-next");
const prevBtns = document.querySelectorAll(".btn-prev");
const progressSteps = document.querySelectorAll(".step");
const form = document.getElementById("multiStepForm");

nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        const currentStep = document.querySelector(".form-step.active");
        const inputs = currentStep.querySelectorAll("input[required]");
        
        // Validação simples de campos obrigatórios
        let allValid = true;
        inputs.forEach(input => {
            if(!input.value) {
                allValid = false;
                input.style.borderColor = "red";
            } else {
                input.style.borderColor = "#ddd";
            }
        });

        if (allValid) {
            changeStep(1);
        } else {
            alert("Por favor, preencha os campos obrigatórios.");
        }
    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        changeStep(-1);
    });
});

function changeStep(cursor) {
    let index = 0;
    const activeStep = document.querySelector(".form-step.active");
    index = steps.indexOf(activeStep);
    steps[index].classList.remove("active");
    progressSteps[index].classList.remove("active");
    
    index += cursor;
    
    steps[index].classList.add("active");
    progressSteps[index].classList.add("active");
}

// Envio para WhatsApp
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    let message = "📋 *NOVA FICHA DE CADASTRO*\n\n";

    for (let [key, value] of formData.entries()) {
        if(value) message += `*${key.toUpperCase()}:* ${value}\n`;
    }

    const phone = "559291404115";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
});
