// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 2, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 3, formato: "padrao", status: true, acessivel: false, dataReserva: null, dataEntrega: null },
  { id: 4, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 5, formato: "padrao", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 6, formato: "duplo", status: true, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 7, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
  { id: 8, formato: "duplo", status: false, acessivel: true, dataReserva: null, dataEntrega: null },
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção. 
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Obter a data e hora atual para a reserva.
  let dataReserva = new Date();
  armarioSorteado.dataReserva = dataReserva;
  
  // Calcular a data e hora de entrega (24 horas após a reserva).
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioSorteado.dataEntrega = dataEntrega;
  
  // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;
  
  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Impmimimos uma mensagem de reserva para o usuário.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! Data e hora de entrega: ${dataEntrega.toLocaleString()}`;

  console.log(usuario);
  console.log(armarios);

}