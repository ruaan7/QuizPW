//oioi adailto, aqui vou explicar um pouco do que fizemos até agora
const $startGameButton = document.querySelector(".start-quiz");
const $proxPerguntaButton = document.querySelector(".prox-pergunta");
const $temasContainer = document.querySelector(".temas-container");
const $perguntasContainer = document.querySelector(".perguntas-container");
const $perguntaText = document.querySelector(".perguntas-container .pergunta");
const $respostasContainer = document.querySelector(".respostas-container");
const $temas = document.querySelectorAll(".tema");

//essas variáveis vão ajudar mais tarde na pontução
let currentPerguntaIndex = 0;
let totalCorrect = 0;
let totalIncorrect = 0;
let selectedTema = "";
let filteredPerguntas = [];


$startGameButton.addEventListener("click", startGame);
$proxPerguntaButton.addEventListener("click", displayProxPergunta);
// aqui declaramos o inicio do quiz e o botão de próxima pergunta

$temas.forEach(tema => {
    tema.addEventListener("click", () => {
        selectedTema = tema.dataset.tema;
        filteredPerguntas = perguntas.filter(q => q.tema === selectedTema);
        $temasContainer.classList.add("hide");
        $perguntasContainer.classList.remove("hide");
        displayProxPergunta();
        // filtrando as perguntas
    });
});


function startGame() {
    $startGameButton.classList.add("hide");
    $temasContainer.classList.remove("hide");
}
function displayProxPergunta() {
    resetState(); 
    //funções de ínicio do jogo e proxima pergunta
  

    if (filteredPerguntas.length === currentPerguntaIndex) {
        return finishGame(); //finalizamos o quiz
    }
    
    
        $perguntaText.textContent = filteredPerguntas[currentPerguntaIndex].pergunta;
        filteredPerguntas[currentPerguntaIndex].respostas.forEach(resposta => {
        const newResposta = document.createElement("button"); 
        newResposta.classList.add("button", "resposta");
        newResposta.textContent = resposta.text;
        if (resposta.correct) {
            newResposta.dataset.correct = resposta.correct; //aqui vão os textos e algumas coisinhas das respostas
        }
        $respostasContainer.appendChild(newResposta); 
        newResposta.addEventListener("click", selectResposta);
    });
}


function resetState() //reseta as respostas 
{
    while ($respostasContainer.firstChild) {
        $respostasContainer.removeChild($respostasContainer.firstChild); //remove as respostas 
    }

    document.body.removeAttribute("class");
    $proxPerguntaButton.classList.add("hide");
}//aqui verificamos se a resposta está correta ou não

function selectResposta(event) {
    const respostaClicked = event.target;

    if (respostaClicked.dataset.correct) {
        document.body.classList.add("correct");
        totalCorrect++; 
    } else {
        document.body.classList.add("incorrect"); 
        totalIncorrect++;

    } 
    //aqui ajustamos o número de respostas corretas
    document.querySelectorAll(".resposta").forEach(button => {
        button.disabled = true;

        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });
  
    $proxPerguntaButton.classList.remove("hide"); 
    currentPerguntaIndex++;
}

function finishGame() //fim do jogo
 {
    const performance = ((totalCorrect * 10) - (totalIncorrect * 5));
  
    let message = ""; 
    switch (true) {
        case (performance == 50):
            message = "Excelente :)";
            break;
        case ((performance >= 30) && (performance <= 40)):
            message = "Bom!";
            break;
        case ((performance >= 5)) && ((performance < 30)):
            message = "Você pode fazer melhor!";
            break;
        default:
            message = "Pode melhorar :(";
    }

    $perguntasContainer.innerHTML = 
    `
        <p class="final-message">
            Você fez ${performance} pontos!
            <span>Resultado: ${message}</span>
        </p>
        <button 
            onclick=window.location.reload() 
            class="button"
        >
            Refazer teste
        </button>
    `;
}

const perguntas = [
    {
      //história aq
      tema: "h",
      pergunta: "Quem foi o primeiro presidente do Brasil?",
      respostas: [
        { text: "Getúlio Vargas", correct: false },
        { text: "Juscelino Kubitschek", correct: false },
        { text: " Marechal Deodoro da Fonseca", correct: true },
        { text: "Princesa Isabel", correct: false }
      ]
    },
    {
      tema: "h",
      pergunta: "A Primeira e Segunda Guerra Mundial, começaram em que ano, respectivamente?",
      respostas: [
       
        { text: "1929 e 1945", correct: false },      
        { text: "1920 e 1945", correct: false },
        { text: "1914 e 1939", correct: true },
        { text: "1894 e 1939", correct: false }
      ]
    },
    {
      tema: "h",
      pergunta: "Em que ano Cristóvão Colombo chegou a América?",
      respostas: [
        { text: "1492", correct: true },
        { text: "1500", correct: false },
        { text: "1776", correct: false },
        { text: "1822", correct: false }
      ]
    },
    {
      tema: "h",
      pergunta: "Quem foi o primeiro rei de Portugal?",
      respostas: [
       
        { text: "Pedro Álvares Cabral", correct: false },
        { text: "Júlio César", correct: false},
        {text: "Alexandre Magno", correct: false},
       {text: "D. Afonso Henriques", correct: true}
      ]
    },
    {
      tema: "h",
      pergunta: "Em que ano começou a Revolução Industrial?",
      respostas: [
        { text: "1770", correct: false },
        { text: "1760", correct: true },
        { text: "1612", correct: false },
        { text: "1777", correct: false }
      ]
    },
  
  
  //bandeiras aqui
    
    {
      tema: "b",
      pergunta: "Qual país tem uma folha de bordo no centro de sua bandeira?",
      respostas: [
        { text: "Austrália", correct: false },
        { text: "Nova Zelândia", correct: false },
        { text: "Canadá", correct: true },
        { text: "Estados Unidos", correct: false }
      ]
    },
    {
      tema: "b",
      pergunta: 'Qual bandeira é conhecida como "Union Jack"?',
      respostas: [
       
        { text: "Austrália", correct: false },      
        { text: "Estados Unidos", correct: false },
        { text: "Reino Unido", correct: true },
        { text: "França", correct: false }
      ]
    },
    {
      tema: "b",
      pergunta: "De qual país é a bandeira tricolor consistindo de três bandas verticais verdes, amarelas e vermelhas com uma estrela verde de cinco pontas no centro",
      respostas: [
        { text: "Senegal", correct: true },
        { text: "Chile", correct: false },
        { text: "Suíça", correct: false },
        { text: "Angola", correct: false }
      ]
    },
    {
      tema: "b",
      pergunta: "Qual país tem uma bandeira com um círculo vermelho no centro sobre um fundo branco?",
      respostas: [
       
        { text: "Afeganistão", correct: false },
        { text: "Coreia do Sul", correct: false},
        {text: "Índia", correct: false},
       {text: "Japão", correct: true}
      ]
    },
    {
      tema: "b",
      pergunta: "De qual país é a bandeira composta por uma Estrela de Davi na cor azul no centro em um fundo branco?",
      respostas: [
        { text: "Afeganistão", correct: false },
        { text: "Israel", correct: true },
        { text: "Egito", correct: false },
        { text: "Paquistão", correct: false }
      ]
    },
  
  //dança aq
    {
      tema: "d",
      pergunta: "Quem foi o inventor da dança?",
      respostas: [
        { text: "Fred Astaire", correct: false },
        { text: "Ivaldo Bertazzo", correct: false },
        { text: "Rudolf Laban", correct: true },
        { text: "Charles Weidman", correct: false }
      ]
    },

    {
      tema: "d",
      pergunta: "Qual estilo de dança é considerado dança de rua?",
      respostas: [
       
        { text: "Funk", correct: false },      
        { text: "Streetdance", correct: true },
        { text: "Hip hop", correct: false },
        { text: "Breaking", correct: false }
      ]
    },
    { 

      tema: "d",
      pergunta: "Qual país deu origem ao samba?",
      respostas: [
        { text: "Brasil", correct: true },
        { text: "Portugal", correct: false },
        { text: "Espanha", correct: false },
        { text: "Cuba", correct: false }
      ]
    },
    {
      tema: "d",
      pergunta: "Qual o tipo de dança mais popular? ",
      respostas: [
        { text: "Tango", correct: false },
        { text: "Hip Hop", correct: false},
        {text: "Funk", correct: false},
        {text: "Salsa", correct: true}
      ]
    },
    {
      tema: "d",
      pergunta: "Em que estado do Brasil a lambada se originou?",
      respostas: [
        { text: "Bahia", correct: false },
        { text: "Pará", correct: true },
        { text: "Minas Gerais", correct: false },
        { text: "Amazonas", correct: false }
      ]
    },
    
  //jiu de ian aqui
  
    {
      tema: "a",
      pergunta: "Qual das seguintes artes marciais é originária do Brasil?",
      respostas: [
        { text: "Karatê", correct: false },
        { text: "Taekwondo", correct: false },
        { text: "Capoeira", correct: true },
        { text: "Kung Fu", correct: false }
      ]
    },
    {
      tema: "a",
      pergunta: "Quem é amplamente reconhecido como o fundador do Judo?",
      respostas: [
       
        { text: "Bruce Lee", correct: false },      
        { text: "Ip Man", correct: false },
        { text: "Jigoro Kano", correct: true },
        { text: "Masahiko Kimura", correct: false }
      ]
    },
    {
      tema: "a",
      pergunta: 'Em qual arte marcial a "faixa preta" é considerada o mais alto nível de habilidade?',
      respostas: [
        { text: "Karatê", correct: true },
        { text: "Wrestling", correct: false },
        { text: "Boxe", correct: false },
        { text: "Muay Thai", correct: false }
      ]
    },
    {
      tema: "a",
      pergunta: "Qual das seguintes artes marciais é conhecida por seu foco em golpes de cotovelo e joelho?",
      respostas: [
       
        { text: "Aikido", correct: false },
        { text: "Kendo", correct: false},
        {text: "Jiu-Jitsu", correct: false},
       {text: "Muay Thai", correct: true}
      ]
    },
    {
      tema: "a",
      pergunta: "Qual arte marcial é conhecida por usar principalmente técnicas de imobilização e alavancas?",
      respostas: [
        { text: "Taekwondo", correct: false },
        { text: "Jiu-Jitsu", correct: true },
        { text: "Kung Fu", correct: false },
        { text: "Karatê", correct: false }
      ]
    },
  
  //futebol aqui
  
    {
      tema: "f",
      pergunta: "Quem é o maior artilheiro da história da Copa do Mundo da FIFA?",
      respostas: [ 
        { text: "Lionel Messi", correct: false },
        { text: "Cristiano Ronaldo", correct: false },
        { text: "Miroslav Klose", correct: true },
        { text: "Pelé", correct: false }
      ]
    },
    {
      tema: "f",
      pergunta: 'Qual clube de futebol tem o apelido de "Red Devils"?',
      respostas: [
       
        { text: "Liverpool FC", correct: false },      
        { text: "Arsenal FC", correct: false },
        { text: "Manchester United FC", correct: true },
        { text: "Chelsea FC", correct: false }
      ]
    },
   
    {
      tema: "f",
      pergunta: "Quem venceu a Copa do Mundo da FIFA de 2018?",
      respostas: [
        { text: "França", correct: true },
        { text: "Brasil", correct: false },
        { text: "Alemanha", correct: false },
        { text: "Argentina", correct: false }
      ]
    },
    { 
      tema: "f",
      pergunta: "Qual jogador de futebol ganhou cinco vezes a Bola de Ouro da FIFA?",
      respostas: [
       
        { text: "Lionel Messi", correct: false },
        { text: "Neymar", correct: false},
        {text: "Ronaldinho Gaúcho", correct: false},
       {text: "Cristiano Ronaldo", correct: true}
      ]
    },
    {
      tema: "f",
      pergunta: 'Qual time brasileiro é conhecido como "Mengão"?',
      respostas: [
        { text: "Palmeiras", correct: false },
        { text: "Flamengo", correct: true },
        { text: "São Paulo FC", correct: false },
        { text: "Santos FC", correct: false }
      ]
    }
   ]