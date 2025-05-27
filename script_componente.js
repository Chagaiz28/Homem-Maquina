class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.hoje = "ter";
  }

  connectedCallback() {
    this.loadData();
    document.addEventListener("themeChanged", (e) =>
      this.updateTheme(e.detail.theme)
    );
  }

  async loadData() {
    try {
      const response = await fetch("aulas.json");
      const aulas = await response.json();
      this.render(aulas);
    } catch (error) {
      console.error("Erro ao carregar os dados das aulas:", error);
    }
  }

  render(aulas) {
    this.shadowRoot.innerHTML = ""; // Limpa o conteúdo anterior
    const aulasDia = aulas.filter((a) => a.data === this.hoje);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "styles_componente.css";
    this.shadowRoot.appendChild(link);

    this.shadowRoot.innerHTML += `
        <div>
          ${aulasDia
            .map((a) => {
              let provaDisplay = a.prova_alert ? "" : "display: none;";
              let notaColor = this.getNotaColor(a.nota); // Define a cor da nota dinamicamente
              return `
              <div class="comp-aula">
                <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                <div class="titulo_aula">${a.disciplina}</div>
                <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                <div class="lables">
                  <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                  <div class="lable-nota p_lable" style="background-color: ${notaColor};">CR: <b>${a.nota}</b></div>
                </div>
              </div>
            `;
            })
            .join("")}
        </div>
      `;
  }

  // Função para determinar a cor da nota
  getNotaColor(nota) {
    if (nota < 6) {
      return "red"; // Vermelho para notas abaixo de 6
    } else if (nota >= 6 && nota < 8) {
      return "orange"; // Laranja para notas entre 6 e 8
    } else {
      return "green"; // Verde para notas 8 ou maiores
    }
  }

  updateTheme(theme) {
    if (theme === "dark") {
      this.classList.add("theme-dark");
    } else {
      this.classList.remove("theme-dark");
    }
  }
}

customElements.define("aulas-component", AulasComponent);
