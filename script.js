document.querySelector('#clientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const nascimento = document.querySelector('#nascimento').value;
    const compra = parseFloat(document.querySelector('#compra').value);
    let desconto = 0;

    // Cálculo de desconto
    if (compra >= 500 && compra < 1000) {
        desconto = compra * 0.05;
    } else if (compra >= 1000) {
        desconto = compra * 0.10;
    }

    // Adicionar os dados na tabela
    const table = document.querySelector('#clientTable tbody');
    const row = table.insertRow();
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${nascimento}</td>
        <td>R$ ${compra.toFixed(2)}</td>
        <td>R$ ${desconto.toFixed(2)}</td>
    `;

    // Limpar formulário
    document.querySelector('#clientForm').reset();
});

// Função para exportar para Excel
document.querySelector('#exportBtn').addEventListener('click', function() {
    const senha = prompt("Digite a senha para exportar:");
    if (senha === "12345") {
        exportTableToExcel('clientTable', 'clientes');
    } else {
        alert("Senha incorreta!");
    }
});

function exportTableToExcel(tableID, filename = '') {
    const dataType = 'application/vnd.ms-excel';
    const tableSelect = document.querySelector(`#${tableID}`);
    const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Criando link de download
    const downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    // Nome do arquivo
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;

    downloadLink.click();
}

// Switch para alternar entre modo claro e escuro
document.querySelector('#themeToggle').addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
});
