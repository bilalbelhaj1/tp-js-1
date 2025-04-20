// TODO : Ajouter un écouteur d'événement pour ajouter des propositions dynamiquement 
document.getElementById('add-proposition').addEventListener('click', () => { 
    const container = document.createElement('div'); 
    const input = document.createElement('input'); 
    const checkbox = document.createElement('input'); 
    checkbox.type = 'checkbox'; 
   
    input.type = 'text'; 
    input.placeholder = 'Proposition'; 
   
    container.appendChild(checkbox); 
    container.appendChild(input); 
    document.getElementById('propositions').appendChild(container); 
});

// TODO : Ajouter un écouteur d'événement pour enregistrer la question 
document.getElementById('form-question').addEventListener('submit', function(e) { 
    e.preventDefault(); 
    getQuestion();
});

function getQuestion(){
    const enonce = document.getElementById('enonce').value; 
    const duree = parseInt(document.getElementById('duree').value); 
    const points = parseInt(document.getElementById('points').value); 
    const proprietaire = document.getElementById('proprietaire').value; 
    const nomExamen = document.getElementById('nom-examen').value;
    const cni = document.getElementById('cni').value;
    const propositions = []; 

    // récupérer les propositions et vérifier si on a ajouté au moins 2 propositions
    const propositionsRec = document.querySelectorAll('#propositions div');
    if (propositionsRec.length < 2) {
        alert('Veuillez ajouter au moins 2 propositions !'); 
        return; 
    }
    propositionsRec.forEach(prop=>{
        const textQuestion = prop.querySelector('input[type="text"]').value;
        const correcte = prop.querySelector('input[type="checkbox"]').checked;
        propositions.push({textQuestion, correcte})
    })
    const auMoinsUneCorrecte = propositions.some(p=>p.correcte);
    if(!auMoinsUneCorrecte){
        alert("check at least one option as true")
    }else{
        // procced to insert the question
        const question = {
            enonce,
            duree,
            points,
            propositions
        }

        const examKey = 'exams_' + cni;
        insertQuestion(examKey,nomExamen ,question);
    }
}

function insertQuestion(exkey,nom, question){
    console.log(exkey);
    const examsList = localStorage.getItem(exkey);
    console.log(examsList);
    if(!examsList){
        alert("No exam found For this Proprietaire");
    }else{
        const exams = JSON.parse(examsList);
        const exam = exams.find(e=> e.nom === nom)
        if(!exam){
            alert('no exam found with this name');
        }else{
            exam.questions.push(question);
            localStorage.setItem(exkey,JSON.stringify(exams));
            alert('Question added with succec');
            document.getElementById('form-question').reset();
            return;
        }
    }
}
