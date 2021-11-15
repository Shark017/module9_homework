// Задание 1
const button01 = document.getElementById('button01');

button01.addEventListener('click', () => {
//Этап 1. Подготовка данных

//Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();
//console.log('parser', parser);

//XML, который будем парсить
const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
  </list>
`;
//console.log('xmlString', xmlString);

//Этап 2. Получение данных

// Парсинг XML
const xmlDom = parser.parseFromString(xmlString, "text/xml");

// Получение всех DOM-нод
const listNode = xmlDom.querySelector("list");
const student1Node = listNode.querySelector("student");
const name1Node = student1Node.querySelector("name");
const age1Node = student1Node.querySelector("age");
const prof1Node = student1Node.querySelector("prof");
const student2Node = listNode.querySelector("student:last-child");
const name2Node = student2Node.querySelector("name");
const age2Node = student2Node.querySelector("age");
const prof2Node = student2Node.querySelector("prof");

// Получение данных из атрибутов
const lang1Attr = name1Node.getAttribute("lang");
const lang2Attr = name2Node.getAttribute("lang");

//Этап 3. Запись данных в результирующий объект

const result = [{
    name: name1Node.textContent,
    age: Number(age1Node.textContent),
    prof: prof1Node.textContent,
    lang: lang1Attr},{ 
    name: name2Node.textContent,
    age: Number(age2Node.textContent),
    prof: prof2Node.textContent,
    lang: lang2Attr
}];
console.log('list: ', result);
});

// Задание 2
const button02 = document.getElementById('button02');

button02.addEventListener('click', () => {
    //  Этап 1. Подготовка данных

    // JSON, который будем парсить
    const jsonString = `
    {
    "list": [
    {
        "name": "Petr",
        "age": "20",
        "prof": "mechanic"
    },
    {
        "name": "Vova",
        "age": "60",
        "prof": "pilot"
    }
    ]
    }`;

    // Этап 2. Получение данных
    const data = JSON.parse(jsonString);

    const result = data.list;

    //Этап 3. Запись данных в результирующий объект
    const list = [{
    name: result[0].name,
    age: result[0].age,
    prof: result[0].prof},
    {name: result[1].name,
    age: result[1].age,
    prof: result[1].prof,
    }];

    console.log('list', list);
});

// Задание 3

// В HTML созданы input с идентификатором .input, кнопка с идентификатором .button, div с классом result j-result

const button03 = document.querySelector('#button03');
const value = button03.addEventListener ('click', function() {  // По клику мыши сохраняем значение input в value
  const inpValue = document.querySelector('#input03').value;
  if (11 > inpValue&inpValue > 0) {    // Если value попадает в диапазон, выполняем запрос
    function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('Get', url, true);

    xhr.onload = function() {           // обработчик onload на результат запроса
      if(xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status); // если статус не 200, выводим значение статуса
      } else {
        const result = JSON.parse(xhr.response);  // если статус 200, парсим в JSON результирующие данные
        if (callback) {                             // если вызывается каллбэк
          callback(result);                         // отправляем в функцию результат запроса 
        }
    }
  };
    
    xhr.onerror = function() {                      // обработчик ошибки
      console.log('ошибка! Статус ответа: ', xhr.status); 
    };

    xhr.send();                                     // метод вызова
  };

  // Ишем ноду для вставки результата запроса
  const resultNode = document.querySelector('.j-result03');
  
  function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">          
          <img
          src="${item.download_url}"
          class="card-image"
          width="50%" 
          height="50%"
          />
          <p>id: ${item.id}</p>
          <p>author: ${item.author}</p>
          <p>width: ${item.width}</p>
          <p>height: ${item.height}</p>
          <p>url: ${item.url}</p>
          <p>download_url: ${item.download_url}</p>
        <div>
      `;
      cards = cards + cardBlock;          
    });

    resultNode.innerHTML = cards;
    
  }
    let url = new URL('https://picsum.photos/v2/list/');
    url.searchParams.set('limit', inpValue);  // Кодируем в url get-параметр limit 
    useRequest(url, displayResult); 
  }
  else {
    var newDiv = document.createElement("div");   // Иначе вставляем строку с предупреждением
    newDiv.innerHTML = "<p>Число вне диапазона от 1 до 10<p>";
    my_div = document.getElementById("script");
    document.body.insertBefore(newDiv, my_div);
    }
});

// Задание 4

const button04 = document.getElementById('button04');  // Кнопка из HTML

button04.addEventListener('click', () => {           
  const widthValue = +document.getElementById('widthValue').value;      
  const heightValue = +document.getElementById('heightValue').value;    // Задаем константам значения input

  let result = document.getElementById('result04');                       // Определяем поле для вывода ошибки

  if (widthValue >= 100 && widthValue <= 300 && heightValue >= 100 && heightValue <= 300) { // Если числа из input соответвует требованиям, выполняем запрос
    fetch(`https://picsum.photos/${widthValue}/${heightValue}`)                             // В запросе используем значения ширины и высоты
    .then((response) => {
      document.getElementById('displayImage04').src = response.url;
    });
  } 
  else { result.textContent = 'Одно из чисел вне диапазона от 100 до 300'; };               // Иначе приложение выдает ошибку
  
});

// Задание 5

const button05 = document.getElementById('button05');       // Кнопка из HTML

button05.addEventListener('click', () => {           
  const pageNumber = +document.getElementById('inputPageNumber').value;      
  const limit = +document.getElementById('inputLimit').value;    // Задаем константам значения input
  let pageError = document.getElementById('pageError');
  let limitError = document.getElementById('limitError');        // Объявляем поля для вывода сообщений об ошибках
  let totalError = document.getElementById('totalError');
  const resultNode = document.querySelector('.j-result05');        // Ишем ноду для вставки результата запроса
  if (!(pageNumber >= 1 && pageNumber <= 10 || limit >= 1 && limit <= 10)) {
    totalError.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
  }
  else if (!(pageNumber >= 1 && pageNumber <= 10)) {
    pageError.textContent = "Номер страницы вне диапазона от 1 до 10";
  }
  else if (!(0 < limit&&limit < 11)) {                                          // Производим проверку условий
    limitError.textContent = "Лимит вне диапазона от 1 до 10";
  } else {
    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)   // Если проверка прошла, делаем запрос с условиями из input
    .then((response) => {               //Объект response после реализации запроса
      const result = response.json();   
      return result;
      })
      .then ((data) => {                // Объект результата в формате JSON
        function displayResult(data) {
          let cards = '';
          data.forEach(item => {
            const cardBlock = `
              <div class="card">          
                <img
                  src="${item.download_url}"
                  class="card-image"
                  width="50%" 
                  height="50%"
                />
                <p>id: ${item.id}</p>
                <p>author: ${item.author}</p>
                <p>width: ${item.width}</p>
                <p>height: ${item.height}</p>
                <p>url: ${item.url}</p>
                <p>download_url: ${item.download_url}</p>
              <div>
            `;
            cards = cards + cardBlock;  // Верстка карточек
          });
          resultNode.innerHTML = cards; // Результирующую строку cards записываем в поле innerHTML переменной resultNode
          localStorage.setItem("cards", cards); // Засываем cards в localStorage 
        }
        displayResult(data);
      });
  }
});
