document.addEventListener("DOMContentLoaded", () => {
    // 1) inicia com sua PUBLIC KEY
    emailjs.init("cKrBvrRu3kuIgUsKG");

    const form = document.getElementById("form-contato");
    if (!form) {
      console.error("Form #form-contato não encontrado");
      return;
    }

    // 2) adiciona o submit
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      emailjs
        .sendForm("service_7ej8ece", "template_necn6ur", form)
        .then(() => {
          alert("Email enviado com sucesso!");
          form.reset();
        })
        .catch((err) => {
          console.error("Erro EmailJS:", err);
          alert("Deu erro ao enviar. Veja o console (F12).");
        });
    });
  });