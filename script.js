document.getElementById('form-examen').addEventListener('submit', (event)=>{
    event.preventDefault();
    getExamData();
})

function getExamData(){
    const cni = document.getElementById('cni').value;
    const examen = {
        nom: document.getElementById('nom').value,
        dure: document.getElementById('duree').value,
        description: document.getElementById('description').value,
        proprietaire: document.getElementById('proprietaire').value,
        questions:[]
    }

    const examsKey = 'exams_' + cni;
    const exams = JSON.parse(localStorage.getItem(examsKey)) || [];
    exams.push(examen);
    localStorage.setItem(examsKey,JSON.stringify(exams));
    location.href = 'ajoute-question.html';
}