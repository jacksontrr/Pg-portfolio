const xhr = new XMLHttpRequest();
const form = document.querySelector('form');
let firebaseConfig = null;
let db = null;

xhr.onload = function () {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        firebaseConfig = data;
        initFirebase();
    }
};

xhr.open('GET', './config.json', true);
xhr.send();

function initFirebase() {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
}

function limparFormulario() {
    document.getElementById('email').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('assunto').value = '';
    document.getElementById('mensagem').value = '';
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const nome = document.getElementById('nome').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    const emailsRef = db.collection('Emails');
    if (email === '' || nome === '' || assunto === '' || mensagem === '') {
        modalTitle("Atenção!");
        modalText("Preencha todos os campos!");
        openModal();
        return;
    }
    emailsRef.doc(email).set({
        email: email,
        nome: nome,
        assunto: assunto,
        mensagem: mensagem,
        data: new Date()
    }).then(() => {
        limparFormulario();
        modalTitle("Mensagem enviada com sucesso!");
        modalText("Em breve entrarei em contato com você! Obrigado!");
        openModal();
    }).catch(error => {
        modalTitle("Erro ao enviar mensagem!");
        modalText("Atualizer a página e tente novamente. Se o erro persistir, entre em contato.");
        openModal();
    });
});
