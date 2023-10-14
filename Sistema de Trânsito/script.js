let Estatistica = [];
let res = document.getElementById('res');

function salvarNoLocalStorage() {
    localStorage.setItem('Estatistica', JSON.stringify(Estatistica));
}

function carregarDoLocalStorage() {
    const data = localStorage.getItem('Estatistica');
    if (data) {
        Estatistica = JSON.parse(data);
    }
}

function exibirEstatisticas() {
    res.innerHTML = '<strong>Todos os cadastros:</strong><br>';
    for (let i = 0; i < Estatistica.length; i++) {
        res.innerHTML += `Cd: ${Estatistica[i].CodigoCidade}, Nome da Cidade: ${Estatistica[i].NomeCidade}, Quantidade de Acidentes: ${Estatistica[i].QtdAcidentes}<br>`;
    }
}

function Limpar() {
    if (Estatistica.length > 0) {
        Estatistica.pop(); // Remove o último item do array
        salvarNoLocalStorage(); // Atualiza o Local Storage
        exibirEstatisticas();
    } else {
        alert('Campos limpos, sem NENHUM cadastro.')
    }
}

function Cadastrar() {
    const codigoCidade = document.getElementById('txtCD').value;
    const nomeCidade = document.getElementById('txtNC').value;
    const qtdAcidentes = document.getElementById('txtQtd').value;

    if (codigoCidade && nomeCidade && qtdAcidentes) {
        Estatistica.push({
            CodigoCidade: codigoCidade,
            NomeCidade: nomeCidade,
            QtdAcidentes: qtdAcidentes
        });
        salvarNoLocalStorage(); // Salva os dados no Armazenamento Local
        exibirEstatisticas();

        // Limpar os campos após o cadastro
        document.getElementById('txtCD').value = '';  // Limpa o campo de código da cidade
        document.getElementById('txtNC').value = '';  // Limpa o campo de nome da cidade
        document.getElementById('txtQtd').value = ''; // Limpa o campo de quantidade de acidentes
    } else {
        alert('Preencha todos os campos.')
    }
}

function PQTD() {
    if (Estatistica.length === 0) {
        // Caso em que a matriz está vazia
        alert('Não há dados de estatística para processar.');
        return;
    }
    let min = Number(document.getElementById('txtMin').value);
    let max = Number(document.getElementById('txtMax').value);
    res.innerHTML = ''
    
    exibirEstatisticas();
    res.innerHTML += '<br><strong>Os dados referentes aos acidentes entre ' + min + ' e ' + max + ' são:</strong><br>';

    for (let i = 0; i < Estatistica.length; i++) {
        if (Estatistica[i].QtdAcidentes >= min && Estatistica[i].QtdAcidentes <= max) {
            res.innerHTML += `Código da Cidade: ${Estatistica[i].CodigoCidade}, Nome da Cidade: ${Estatistica[i].NomeCidade}, Quantidade de Acidentes: ${Estatistica[i].QtdAcidentes}<br>`;
        }
    }

    document.getElementById('txtMin').value = '';
    document.getElementById('txtMax').value = '';

}

function MaiorMenor() {
    if (Estatistica.length === 0) {
        // Caso em que a matriz está vazia
        alert('Não há dados de estatística para processar.');
        return;
    }
    res.innerHTML = '';
    let menor = Number(Estatistica[0].QtdAcidentes);
    let maior = Number(Estatistica[0].QtdAcidentes);
    let copMenor = 0, copMaior = 0;

    for (let i = 0; i < Estatistica.length; i++) {
        if (Estatistica[i].QtdAcidentes < menor) {
            menor = Estatistica[i].QtdAcidentes;
            copMenor = i;
        } else if (Estatistica[i].QtdAcidentes > maior) {
            maior = Estatistica[i].QtdAcidentes;
            copMaior = i;
        }
    }
    exibirEstatisticas();
    res.innerHTML += `<br><strong>A cidade com menor quantidade de acidentes é </strong><br>Cd: ${Estatistica[copMenor].CodigoCidade}, Nome da Cidade: ${Estatistica[copMenor].NomeCidade}, Quantidade de Acidentes: ${Estatistica[copMenor].QtdAcidentes}<br>`;
    res.innerHTML += `<strong>A cidade com maior quantidade de acidentes é </strong><br>Cd: ${Estatistica[copMaior].CodigoCidade}, Nome da Cidade: ${Estatistica[copMaior].NomeCidade}, Quantidade de Acidentes: ${Estatistica[copMaior].QtdAcidentes}<br>`;
}

function PACIMA() {
    if (Estatistica.length === 0) {
        // Caso em que a matriz está vazia
        alert('Não há dados de estatística para processar.');
        return;
    }

    let média = 0;
    let div = 0;

    for (let i = 0; i < Estatistica.length; i++) {
        média = média + Number(Estatistica[i].QtdAcidentes);
        div++;
    }

    média = média / div;

    res.innerHTML = '';
    exibirEstatisticas();
    res.innerHTML += '<br><strong>Cidades acima da média de acidentes: </strong><br>'
    for (let i = 0; i < Estatistica.length; i++) {
        if (Estatistica[i].QtdAcidentes > média) {
            res.innerHTML += `Código da Cidade: ${Estatistica[i].CodigoCidade}, Nome da Cidade: ${Estatistica[i].NomeCidade}, Quantidade de Acidentes: ${Estatistica[i].QtdAcidentes}<br>`;
        }
    }

    res.innerHTML += `A média é ${média}`;
}

carregarDoLocalStorage();