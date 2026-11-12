// Menu Mobile Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Modal de Detalhes
function abrirModal(titulo, descricao, imgSrc) {
    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-descricao').innerText = descricao;
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-detalhe').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal-detalhe').classList.add('hidden');
}

// Curiosidades Aleatórias ("Me Surpreenda!")
const curiosidadesList = [
    "No Rio de Janeiro, o famoso calçadão de Copacabana com padrão de ondas foi inspirado na Praça de Rossio, em Lisboa.",
    "O bolo de rolo pernambucano é protegido por lei estadual como Patrimônio Cultural e Imaterial do Estado de Pernambuco.",
    "A Lapa, no Rio, abriga os Arcos da Lapa, um imponente aqueduto romano que hoje serve de viaduto para os bondinhos de Santa Teresa.",
    "O frevo pernambucano nasceu no final do século XIX da rivalidade entre bandas militares e blocos de capoeiristas.",
    "O Cristo Redentor no Rio de Janeiro foi eleito uma das Novas Sete Maravilhas do Mundo Moderno em 2007.",
    "Caruaru, em Pernambuco, realiza anualmente o que é considerado o Maior São João do Mundo, com semanas de festa e forró contínuo."
];

function mostrarCuriosidadeAleatoria() {
    const randomIndex = Math.floor(Math.random() * curiosidadesList.length);
    document.getElementById('surpresa-texto').innerText = curiosidadesList[randomIndex];
    document.getElementById('modal-detalhe').classList.add('hidden');
    document.getElementById('modal-surpresa').classList.remove('hidden');
}

function fecharSurpresa() {
    document.getElementById('modal-surpresa').classList.add('hidden');
}

// Quiz Interativo
const perguntasQuiz = [
    {
        pergunta: "Qual é a dupla mais tradicional de lanche saboreada nas praias do Rio de Janeiro?",
        opcoes: [
            "Coxinha com caldo de cana",
            "Biscoito Globo com mate gelado",
            "Tapioca com queijo coalho",
            "Pastel de feira com caldo"
        ],
        correta: 1
    },
    {
        pergunta: "Qual doce pernambucano é feito com finíssimas camadas de massa e doce de goiaba artesanal?",
        opcoes: [
            "Cartola",
            "Bolo de Rolo",
            "Bolo Souza Leão",
            "Cartola de Banana"
        ],
        correta: 1
    },
    {
        pergunta: "Qual ritmo e dança de Pernambuco é reconhecido mundialmente pelas sombrinhas coloridas e passos acrobáticos?",
        opcoes: [
            "Samba",
            "Forró",
            "Frevo",
            "Maracatu"
        ],
        correta: 2
    },
    {
        pergunta: "Qual prato boteco carioca é famoso por ser crocante por fora, macio por recheio de bacalhau e batata?",
        opcoes: [
            "Bolinho de Bacalhau",
            "Coxinha de Frango",
            "Empada de Palmito",
            "Pastel de Camarão"
        ],
        correta: 0
    },
    {
        pergunta: "Qual cidade pernambucana é famosa por realizar o que é considerado o Maior São João do Mundo?",
        opcoes: [
            "Olinda",
            "Recife",
            "Caruaru",
            "Garanhuns"
        ],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;

function carregarQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    if (perguntaAtual < perguntasQuiz.length) {
        const q = perguntasQuiz[perguntaAtual];
        let html = `
            <div class="mb-6 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span>Pergunta ${perguntaAtual + 1} de ${perguntasQuiz.length}</span>
                <span>Pontuação: ${pontuacao}</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold mb-6 text-white">${q.pergunta}</h3>
            <div class="space-y-3">
        `;

        q.opcoes.forEach((opcao, index) => {
            html += `
                <button onclick="verificarResposta(${index})" class="w-full text-left p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium transition flex items-center justify-between group">
                    <span>${opcao}</span>
                    <span class="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-xs group-hover:border-cyan-400 group-hover:text-cyan-400">${String.fromCharCode(65 + index)}</span>
                </button>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    } else {
        let mensagemFinal = "Excelente!";
        if (pontuacao <= 2) mensagemFinal = "Bom esforço! Que tal explorar o site novamente?";
        else if (pontuacao <= 4) mensagemFinal  = "Muito bem! Você conhece bastante sobre os destinos.";

        container.innerHTML = `
            <div class="text-center py-8">
                <div class="w-20 h-20 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-4xl mx-auto mb-6">
                    <i class="fa-solid fa-trophy"></i>
                </div>
                <h3 class="text-3xl font-black mb-3 text-white">Quiz Concluído!</h3>
                <p class="text-lg text-slate-300 mb-2">Você acertou <strong class="text-cyan-400">${pontuacao}</strong> de <strong class="text-white">${perguntasQuiz.length}</strong> perguntas.</p>
                <p class="text-sm text-slate-400 mb-8">${mensagemFinal}</p>
                <button onclick="reiniciarQuiz()" class="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl shadow-lg transition">
                    Tentar Novamente
                </button>
            </div>
        `;
    }
}

function verificarResposta(selecionada) {
    const q = perguntasQuiz[perguntaAtual];
    if (selecionada === q.correta) {
        pontuacao++;
    }
    perguntaAtual++;
    carregarQuiz();
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    carregarQuiz();
}

// Inicializar Quiz ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarQuiz();
});
