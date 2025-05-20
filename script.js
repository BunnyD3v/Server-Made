// Objeto Contato para o formulário
function Contato(nome, email, assunto, anexo, mensagem) {
    this.nome = nome; 
    this.email = email;
    this.assunto = assunto;
    this.anexo = anexo;
    this.mensagem = mensagem;
}

/*
class Contato1{
    constructor(nome, email, assunto, anexo, mensagem){
        this.nome = nome; 
        this.email = email;
        this.assunto = assunto;
        this.anexo = anexo;
        this.mensagem = mensagem;
    }
}
*/

// Evento de envio do formulário
document.addEventListener('DOMContentLoaded', function () { // So executa quando o html estiver carregado
    const form = document.querySelector('.contact-form'); // Seleciona o formulário
    if (form) { // Verifica se o formulário existe
        form.addEventListener('submit', function (e) { // ao clicar no botão de enviar a função é executada (o "e" é o evento)
            e.preventDefault();

            // vai buscar os valores dos inputs
            const nome = form.nome.value; 
            const email = form.email.value;
            const assunto = form.assunto.value;
            const anexo = form.anexo ? form.anexo.value : ""; // se o input anexo existir, fica com o valor, senão, fica vazio
            const mensagem = form.mensagem.value; // <-- Adicione esta linha

            // cria instância do objeto Contato
            const contato = new Contato(nome, email, assunto, anexo, mensagem);

            // faz o popup com os dados do contato
            alert(
                `Contato enviado!\n\n` +
                `Nome: ${contato.nome}\n` +
                `Assunto: ${contato.assunto}\n` +
                `Email: ${contato.email}\n` +
                `Anexo: ${contato.anexo}\n` +
                `Mensagem: ${contato.mensagem}`
            );

            form.reset();
        });
    }
});


//THIS NEEDS TO BE REDONE PARECE O SOURCE CODE DO MINECRAFT
// JAVASCRIPT DO CARAÇAS RRRRRAAARRWW
//MENTAL BREAKDOWN

// PRODUTOS
document.addEventListener('DOMContentLoaded', function () {
    const produtosList = document.getElementById('produtos-list');
    const produtoForm = document.getElementById('produto-form');
    const produtoNome = document.getElementById('produto-nome');
    const produtoDesc = document.getElementById('produto-desc');
    const produtoId = document.getElementById('produto-id');
    const produtoImg = document.getElementById('produto-img');
    const previewImg = document.getElementById('preview-img');

    // Carrega produtos do localStorage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let imgBase64 = ""; // Variável para armazenar a imagem em base64 (está em base64 pk assim é possivel guardar no localStorage)

    // Preview da imagem
    if (produtoImg) {
        produtoImg.addEventListener('change', function () {
            const file = produtoImg.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imgBase64 = e.target.result;
                    previewImg.src = imgBase64;
                    previewImg.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // mostra os produtos na lista
    function renderProdutos() {
        produtosList.innerHTML = '';
        produtos.forEach((produto, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${produto.img ? `<img src="${produto.img}" alt="" style="max-width:60px;vertical-align:middle;"> ` : ''}
                <strong>${produto.nome}</strong>: ${produto.desc}
                <button onclick="editarProduto(${idx})">Editar</button>
                <button onclick="removerProduto(${idx})">Remover</button>
            `;
            produtosList.appendChild(li);
        });
    }

    // Editar o produto
    window.editarProduto = function(idx) {
        produtoId.value = idx;
        produtoNome.value = produtos[idx].nome;
        produtoDesc.value = produtos[idx].desc;
        imgBase64 = produtos[idx].img || "";
        if (imgBase64) {
            previewImg.src = imgBase64;
            previewImg.style.display = "block";
        } else {
            previewImg.style.display = "none";
        }
    };

    // Remover o produto
    window.removerProduto = function(idx) {
        if (confirm('Remover este produto?')) {
            produtos.splice(idx, 1);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            renderProdutos();
        }
    };


    // Adicionar o produto
    if (produtoForm) {
        produtoForm.onsubmit = function(e) {
            e.preventDefault();
            const nome = produtoNome.value.trim();
            const desc = produtoDesc.value.trim();
            const img = imgBase64;
            if (!nome || !desc) return;

            if (produtoId.value) {
                produtos[produtoId.value] = { nome, desc, img };
                produtoId.value = '';
            } else {
                produtos.push({ nome, desc, img });
            }
            localStorage.setItem('produtos', JSON.stringify(produtos));
            produtoForm.reset();
            imgBase64 = "";
            previewImg.style.display = "none";
            renderProdutos();
        };
    }

    if (produtosList) renderProdutos();
});