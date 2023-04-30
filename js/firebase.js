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
    if(email === '' || nome === '' || assunto === '' || mensagem === '') {
        alert('Preencha todos os campos!');
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
        alert('Mensagem enviada com sucesso!');
    }).catch(error => {
        console.error('Erro ao enviar mensagem:', error);
    });
});
