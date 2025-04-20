document.getElementById('afficher').addEventListener('click', ()=>{
    const cni = document.getElementById('cni').value;
    const exams = getExams(cni);
    if(exams.length == 0){
        alert('no exams');
    }else{
        let result = document.getElementById('resultat');
        exams.forEach(ex => {
            const exam = document.createElement('div');
            exam.classList.add("exam");
            const title = document.createElement('h1');
            title.innerText = `${ex.nom}(${ex.dure} min)`;

            let questions = document.createElement('div');
            questions.classList.add('questions');
            ex.questions.forEach(quest=>{
                let question = document.createElement('div');
                question.classList.add('question');
                let enonce = document.createElement('h2');
                enonce.innerText = quest.enonce;

                let options = document.createElement('div');
                options.classList.add('options');

                quest.propositions.forEach(pro=>{
                    let prop = document.createElement('div');
                    prop.innerHTML = `<input type="checkbox"> <p>${pro.textQuestion}</p>`
                    options.appendChild(prop)
                })
                question.appendChild(enonce);
                question.appendChild(options);
                questions.appendChild(question);

            })
            exam.appendChild(title);
            exam.appendChild(questions)
            result.appendChild(exam);
        });
    }
})

function getExams(cni){
    const examKey = 'exams_' + cni;
    const exams = JSON.parse(localStorage.getItem(examKey)) || [];
    console.log(exams);
    return exams;
}