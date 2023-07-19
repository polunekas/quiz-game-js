const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

//Поиск элементов

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

//Переменные игры

let score = 0; // набранные очки
let questionIndex = 0; // текущий вопрос

//Очистка разметки страницы

clearPage();
showQuestion();

submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

//Функция отображения вопроса

function showQuestion() {
  console.log("showQestion");

  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;
  let answerNumber = 1;
  //Варианты ответов
  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = `<li>
          <label>
            <input value = "%number%" type="radio" class="answer" name="answer" />
            <span>%answer%</span>
          </label>
        </li>`;

    let answerHTML = questionTemplate.replace("%answer%", answerText);

    answerHTML = answerHTML.replace("%number%", answerNumber);
    listContainer.innerHTML = listContainer.innerHTML + answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  //Выбор кнопки
  const checkedRadio = listContainer.querySelector("input:checked");
  //Если ответ не выбран, то выход из функции
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  //Узнаем номер ответа от пользователя
  const userAnswer = parseInt(checkedRadio.value);

  //Ecли ответ верен - увеличиваем счет
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
  }

  function showResults() {
    console.log(score);

    const resultsTemplate = `
		<h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>`;

    let title, message;

    //Варианты заголовков и текста
    if (score === questions.length) {
      title = "Поздравляю!";
      message = "Вы ответили верно на все вопросы!";
    } else if ((score * 100) / questions.length >= 50) {
      title = "Неплохой результат!";
      message = "Вы дали более половины правильных ответов!";
    } else {
      title = "Стоит постараться!";
      message = "Пока у вас меньше половины правильных ответов.";
    }
    //Результат

    let result = `${score} из ${questions.length}`;
    const finalMessage = resultsTemplate
      .replace("%title%", title)
      .replace("%message%", message)
      .replace("%result%", result);

    headerContainer.innerHTML = finalMessage;

    //Меняем кнопку на играть снова

    submitBtn.blur();
    submitBtn.innerText = "Начать заново";
    submitBtn.onclick = () => history.go(); //Обновление страницы
  }
}
