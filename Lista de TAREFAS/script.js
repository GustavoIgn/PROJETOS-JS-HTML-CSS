const armLocal = 'Tasklist';

function AdicionarTarefa() {
    // Cria uma variável para armazenar o elemento de entrada de texto.
    let entrada = document.getElementById('txttarefa');
    entrada.style.border = ' '
    // Verifica se o campo de entrada está vazio ou contém apenas espaços em branco.
    if (entrada.value.length == 0 || entrada.value == " ") {
        entrada.style.border = '1px solid black'
        alert("Insira uma TAREFA!");
        // Verifica se a tarefa já existe na lista de tarefas.
    } else if (validarNovaTarefa()) {
        alert("Já existe esta TAREFA!")
    } else {
        // Cria uma variável para armazenar o valor do localStorage.
        let valor = JSON.parse(localStorage.getItem(armLocal) || "[]");
        // Adiciona a nova tarefa ao array de tarefas.
        valor.push({
            name: entrada.value
        })
        // Atualiza o localStorage com o novo array de tarefas.
        localStorage.setItem(armLocal, JSON.stringify(valor))
        // Chama a função mostrarTarefas() para exibir a lista de tarefas atualizada.
        mostrarTarefas();
    }
    entrada.value = ' '
}

function mostrarTarefas() {
    let valores = JSON.parse(localStorage.getItem(armLocal) || '[]')
    let lista = document.getElementById('lista')
    lista.innerHTML = ''

    for (let i = 0; i < valores.length; i++) {
        lista.innerHTML += `<li>${valores[i]['name']}<button id="btn-ok" onclick="removerItem('${valores[i]['name']}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg></button></li>`


    }
}

function removerItem(dado) {
    let valores = JSON.parse(localStorage.getItem(armLocal) || '[]')
    let index = valores.findIndex(x => x.name == dado);
    valores.splice(index, 1);
    localStorage.setItem(armLocal, JSON.stringify(valores))
    mostrarTarefas();
}

function validarNovaTarefa() {
    let valor = JSON.parse(localStorage.getItem(armLocal) || "[]");
    let entradaValor = document.getElementById('txttarefa').value
    entradaValor = entradaValor.toLowerCase();
    let existente = valor.find(x => x.name == entradaValor)
    return !existente ? false : true
}

mostrarTarefas();