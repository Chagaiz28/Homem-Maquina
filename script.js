// Dados dos eventos
const eventos = [
  {
    id: 1,
    title: "Semana do Software 2025",
    date: "12/05",
    time: "10:00",
    location: "Salão de Eventos",
    type: "tech",
    description:
      "Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 2,
    title: "Workshop de IoT",
    date: "12/01",
    time: "08:00",
    location: "Laboratório CS&I",
    type: "tech",
    description:
      "Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 3,
    title: "Festa dos Alunos 2025",
    date: "18/05",
    time: "19:00",
    location: "Área Esportiva do Inatel",
    type: "cultural",
    description:
      "Venha comemorar a melhor Festa dos Alunos de todos os tempos!",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 4,
    title: "Feira de Oportunidades",
    date: "04/05",
    time: "10:00",
    location: "Salão de Eventos",
    type: "academic",
    description:
      "Venha conhecer empresas e projetos com destaque na área da engenharia.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400",
  },
];

let currentIndex = 0;
let autoSlideInterval;
/* ===============================
     FUNÇÃO PARA CARREGAR OS EVENTOS
     =============================== */
function loadEvents() {
  const carousel = document.querySelector(".carousel");
  eventos.forEach((event) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="info">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p>
          <span class="material-icons-outlined icon">event</span> ${event.date} às ${event.time}
          <span class="material-icons-outlined icon">pin_drop</span> ${event.location}
        </p>
      </div>
    `;
    carousel.appendChild(card);
  });
}

/* ===============================
     FUNÇÃO PARA ATUALIZAR O CARROSSEL
     =============================== */
function updateCarousel() {
  const carousel = document.querySelector(".carousel");
  const container = document.querySelector(".carousel-container");
  const cardWidth = container.offsetWidth;
  carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

/* ===============================
     FUNÇÕES PARA TEMA
     =============================== */
function toggleThemeMenu() {
  const menu = document.getElementById("themeMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function changeTheme(theme) {
  const container = document.querySelector(".container");
  if (theme === "dark") {
    container.classList.add("theme-dark");
  } else {
    container.classList.remove("theme-dark");
  }
  // Salva o tema no localStorage
  localStorage.setItem("selectedTheme", theme);
  document.dispatchEvent(
    new CustomEvent("themeChanged", { detail: { theme } })
  );
}

/* ===============================
     EVENTOS DE DOM E BOTÕES
     =============================== */
document.addEventListener("DOMContentLoaded", () => {
  // Carrega os eventos e monta os cards
  loadEvents();
  // Ajusta a posição inicial do carrossel
  updateCarousel();

  // Restaura o tema salvo (se houver)
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    changeTheme(savedTheme);
  }

  // Botão Próximo
  document.getElementById("nextBtn").addEventListener("click", () => {
    const totalCards = document.querySelectorAll(".card").length;
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Botão Anterior
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Redimensionamento da janela -> recalcular largura
  window.addEventListener("resize", () => {
    updateCarousel();
  });
});
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    const totalCards = document.querySelectorAll(".card").length;
    if (currentIndex < totalCards - 1) {
      currentIndex++;
    } else {
      currentIndex = 0; // Volta ao primeiro card
    }
    updateCarousel();
  }, 5000); // Troca de card a cada 5 segundos
}

// Função para parar o auto-slide
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Adiciona eventos de hover para parar e reiniciar o auto-slide
document
  .querySelector(".carousel-container")
  .addEventListener("mouseenter", stopAutoSlide);
document
  .querySelector(".carousel-container")
  .addEventListener("mouseleave", startAutoSlide);

// Inicia o auto-slide quando a página é carregada
document.addEventListener("DOMContentLoaded", () => {
  startAutoSlide();
});
