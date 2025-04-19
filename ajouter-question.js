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

    let auMoinsUneCorrecte = false;

    propositionsRec.forEach(div => { 
        const texte = div.querySelector('input[type="text"]').value.trim(); 
        const correcte = div.querySelector('input[type="checkbox"]').checked; 

        if (texte !== '') {
            if (correcte) {
                auMoinsUneCorrecte = true;
            }
            propositions.push({ texte, correcte }); 
        }
    });

    // vérifier si au moins une proposition est correcte
    if (!auMoinsUneCorrecte) {
        alert('Veuillez cocher au moins une proposition correcte !'); 
        return; 
    }

    // TODO : Trouver l'examen existant à partir du localStorage 
    const examsKey = 'examens_' + proprietaire; 
    const exams = JSON.parse(localStorage.getItem(examsKey)) || []; 
    const exam = exams.find(e => e.nom === nomExamen && e.id === cni); 
    if (!exam) { 
        alert('Examen non trouvé !'); 
        return; 
    }

    // TODO : Ajouter la question à l'examen et mettre à jour le localStorage 
    const question = { enonce, duree, points, propositions }; 
    exam.questions.push(question); 

    localStorage.setItem(examsKey, JSON.stringify(exams)); 

    alert('Question ajoutée avec succès !'); 
    this.reset(); 
    document.getElementById('propositions').innerHTML = ''; 
});
