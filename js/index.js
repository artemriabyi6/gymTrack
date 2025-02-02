const DOM = {
    exercise1: document.getElementById('exercise1'),
    exercise2: document.getElementById('exercise2'),
    exercise3: document.getElementById('exercise3'),
    exercise4: document.getElementById('exercise4'),
    exercise5: document.getElementById('exercise5'),
    exercise6: document.getElementById('exercise6'),
    exercise7: document.getElementById('exercise7'),
    set1: document.getElementById('set1'),
    set2: document.getElementById('set2'),
    set3: document.getElementById('set3'),
    set4: document.getElementById('set4'),
    set5: document.getElementById('set5'),
    set6: document.getElementById('set6'),
    set7: document.getElementById('set7'),
    rep1: document.getElementById('rep1'),
    rep2: document.getElementById('rep2'),
    rep3: document.getElementById('rep3'),
    rep4: document.getElementById('rep4'),
    rep5: document.getElementById('rep5'),
    rep6: document.getElementById('rep6'),
    rep7: document.getElementById('rep7'),
    date: document.getElementById('trainingData'),

    btn: document.getElementById('add-btn'),
    addedTraining: document.getElementById('addedTraining')
}

const data = [
    {
        exercise: document.getElementById('exercise1'),
        set: document.getElementById('set1'),
        rep: document.getElementById('rep1'),
    },
    {
        exercise: document.getElementById('exercise2'),
        set: document.getElementById('set2'),
        rep: document.getElementById('rep2'),
    },
    {
        exercise: document.getElementById('exercise3'),
        set: document.getElementById('set3'),
        rep: document.getElementById('rep3'),
    } ,
    {
        exercise: document.getElementById('exercise4'),
        set: document.getElementById('set4'),
        rep: document.getElementById('rep4'),
    },
    {
        exercise: document.getElementById('exercise5'),
        set: document.getElementById('set5'),
        rep: document.getElementById('rep5'),
    }, 
       
    {
        exercise: document.getElementById('exercise6'),
        set: document.getElementById('set6'),
        rep: document.getElementById('rep6'),
    },
    {
        exercise: document.getElementById('exercise7'),
        set: document.getElementById('set7'),
        rep: document.getElementById('rep7'),
        date: DOM.date
    },
]

const exercises = [
    DOM.exercise1, 
    DOM.exercise2,
    DOM.exercise3, 
    DOM.exercise4, 
    DOM.exercise5,
    DOM.exercise6,
    DOM.exercise7
]
const sets = {
    set1: DOM.set1,
    set2: DOM.set2,
    set3: DOM.set3,
    set4: DOM.set4,
    set5: DOM.set5,
    set6: DOM.set6,
    set7: DOM.set7,
}

const complex = [
    {
        exercise: DOM.exercise1,
        set: DOM.set1,
        rep: DOM.rep1,
    },
    {
        exercise: DOM.exercise2,
        set: DOM.set2,
        rep: DOM.rep2,
    },
    {
        exercise: DOM.exercise3,
        set: DOM.set3,
        rep: DOM.rep3,
    }, {
        exercise: DOM.exercise4,
        set: DOM.set4,
        rep: DOM.rep4,
    }, {
        exercise: DOM.exercise5,
        set: DOM.set5,
        rep: DOM.rep5,
    }, {
        exercise: DOM.exercise6,
        set: DOM.set6,
        rep: DOM.rep6,
    }, {
        exercise: DOM.exercise7,
        set: DOM.set7,
        rep: DOM.rep7,
    },
    

]

function getInfo() {

    const createWrapper = document.createElement('div')
    createWrapper.classList.add('training-card')
    const trainingDate = document.createElement('h3')
    trainingDate.textContent = DOM.date.value
    
    createWrapper.append(trainingDate)
    

    complex.map((el) => {

         const exerciseWrapper = document.createElement('div')
         exerciseWrapper.classList.add('exercise-wrapper')


        exerciseWrapper.innerHTML = `
        <div class="training-details">
        <p class="exercise-name">${el.exercise.options[el.exercise.selectedIndex].text}</p>
        <p class="exercise-set">${el.set.value} X ${el.rep.value}</p>
        </div>
        `
        createWrapper.append(exerciseWrapper)
        
        let complexDataObj = {}
        
        for(let field in el) {
            Object.defineProperty(complexDataObj, field, {
                value: el[field]
            })
        }
        
    })
    DOM.addedTraining.prepend(createWrapper)
    


    alert('Training has been succsesfuly added')
}



function saveTrainingToLocalStorage() {
    const trainingData = [];

    data.forEach(obj => {
        let newObj = {};
        for (let key in obj) {
            if (obj[key]) { // Переконуємось, що елемент існує
                newObj[key] = obj[key].value;
            }
        }
        trainingData.push(newObj);
    });

    // Отримуємо попередні тренування або створюємо порожній масив
    let existingTrainings = JSON.parse(localStorage.getItem("trainings")) || [];

    // Додаємо нове тренування до списку
    existingTrainings.push(trainingData);

    // Зберігаємо оновлений масив у localStorage
    localStorage.setItem("trainings", JSON.stringify(existingTrainings));

    console.log("Дані збережено!", existingTrainings);
}


function loadTrainings() {
    const trainingContainer = document.getElementById("addedTraining");

    // Отримуємо тренування з localStorage
    let trainings = JSON.parse(localStorage.getItem("trainings")) || [];
    

    // Сортуємо за датою (найновіші — перші)
    trainings.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Відмальовуємо кожне тренування у вигляді картки
    trainings.forEach(arrOfTraining => {

        
        const card = document.createElement('div')
        card.classList.add('training-card')
        const dateOfTraining = document.createElement('h3')
        dateOfTraining.textContent = arrOfTraining[6].date 
        card.append(dateOfTraining)


        arrOfTraining.forEach(training => {
            
            const cardRow = document.createElement('div')
            cardRow.classList.add('training-card-row')
            const firstBlock = document.createElement('div')
            const secondBlock = document.createElement('div')
            secondBlock.classList.add('second-block')
            firstBlock.classList.add('first-block')


            const exerciseName = document.createElement('p')
            exerciseName.classList.add('exercise-name')
            const result = document.createElement('p')
           
           
            exerciseName.textContent = training.exercise
            result.textContent = `${training.set} X ${training.rep}`
            

            
            firstBlock.append(exerciseName)
            secondBlock.append(result)
            cardRow.append(firstBlock)
            cardRow.append(secondBlock)
            card.append(cardRow)
             
            // card.innerHTML = `
            // <div class="training-card-row">
            //     <div class ="first-block">
            //         <p class="exrcise-name">${training.exercise}</p>
            //     </div>
            //     <div>
            //         <p> ${training.set} X ${training.rep} </p> 
            //     </div>
            // </div>`

            trainingContainer.append(card)

        })
      
    });
   
}

// Викликаємо функцію при завантаженні сторінки
document.addEventListener("DOMContentLoaded", loadTrainings);





DOM.btn.addEventListener('click', (e) => {
    e.preventDefault()
    if(DOM.date.value === ''){
        alert('You must enter training date!')
    } else {
        getInfo() 
        saveTrainingToLocalStorage()
    }
})