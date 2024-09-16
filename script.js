document.getElementById('adicionar').addEventListener('click', adicionarDados);

function adicionarDados() {
    const input = document.getElementById('dados');
    const valor = input.value;

    if (valor) {
        // Armazenar dados no localStorage
        let historico = JSON.parse(localStorage.getItem('historico')) || [];
        historico.push(valor);
        localStorage.setItem('historico', JSON.stringify(historico));

        // Atualizar a exibição do histórico
        atualizarHistorico();
        input.value = ''; // Limpar o campo
    }
}

function atualizarHistorico() {
    const historicoDiv = document.getElementById('historico');
    historicoDiv.innerHTML = ''; // Limpar a exibição atual

    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item;
        historicoDiv.appendChild(div);
    });
}

// Carregar histórico ao iniciar
window.onload = atualizarHistorico;

const tabButtons = document.querySelectorAll('.aba-botao');
const tabPanes = document.querySelectorAll('.painel-guias');

// Função para ativar uma aba específica
function activateTab(index) {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    tabButtons[index].classList.add('active');
    tabPanes[index].classList.add('active');
}

// Adicionando eventos aos botões
tabButtons[3].addEventListener('click', () => {
    activateTab(0);
    window.location.href = 'sobre.html';
});

tabButtons[1].addEventListener('click', () => {
    activateTab(1);
    window.location.href = 'contato.html';
});

// Ativar a primeira aba por padrão
activateTab(0);

const ctx = document.getElementById('graficoPizza').getContext('2d');
const graficoPizza = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Categoria A', 'Categoria B'],
        datasets: [{
            data: [50, 50],
            backgroundColor: ['#ff6384', '#36a2eb']
        }]
    }
});

// trecho para interações com formulário de envio para contato com a empresa //
const form = document.getElementById('contact-form');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário (ALTERADO)

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            confirmation.style.display = 'block'; // Exibe mensagem de confirmação (ALTERADO)
            form.reset(); // Limpa o formulário
        } else {
            alert('Houve um erro ao enviar o formulário.');
        }
    }).catch(error => {
        alert('Houve um erro ao enviar o formulário.');
    });
});