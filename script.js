
let liElements = document.getElementsByTagName('li');
let ulElem = document.getElementById('itemList');
let btn = document.getElementById('btnAdd');


let createElement = function() {
  let li = document.createElement('li');
  let liText = document.getElementById('newItemText').value;
  let list = document.getElementById('itemList');
  let textSpan = document.createElement('span');
  let text = document.createTextNode(liText);
  textSpan.appendChild(text);
  textSpan.classList.add('taskText');
  if (liText === '') {
    alert('Enter your task!')
  } else {
    li.appendChild(textSpan);
    plusAndCross(li);
    list.appendChild(li);
    document.getElementById('newItemText').value = '';
    setlocalStorage();
  }
};


let plusAndCross = function(elem) {
  let crossElement = document.createElement('span');
  let plusElement = document.createElement('span');
  let cross = document.createTextNode('\u00D7');
  let plus = document.createTextNode('+');
  crossElement.className = 'del';
  plusElement.className = 'edit';
  crossElement.appendChild(cross);
  plusElement.appendChild(plus);
  elem.appendChild(crossElement);
  elem.appendChild(plusElement);
}


let checkToggle = function(elem) {
  if (!elem.classList.contains('taskText')) {
    return;
  }
    elem.parentElement.classList.contains('checked')
      ? elem.parentElement.classList.remove('checked')
      : elem.parentElement.classList.add('checked')
};


let deleter = function(elem) {
  if (elem.classList.contains('del')) {
    // elem.parentElement.style.display = 'none';
    elem.parentElement.remove();
    setlocalStorage();
  }
}


let editor = function(elem) {
  if (elem.classList.contains('edit')) {
    let textValue = elem.parentElement.firstChild.innerText;
    let newValue = prompt('Editing', textValue);
    elem.parentElement.firstChild.innerText = newValue || textValue;
    elem.parentElement.classList.remove('checked');
  }
}


let checkClick = function(func) {
  ulElem.addEventListener('click', function(event) {
    const target = event.target;
    func(target);
  });
};


let setlocalStorage = function(){
  let str = JSON.stringify(ulElem.innerHTML);
  localStorage.setItem('todos', str);
}


let getlocalStorage = function(){
  let str = localStorage.getItem('todos');
 ulElem.innerHTML = JSON.parse(str);

}

  getlocalStorage();
  btn.onclick = createElement;
  checkClick(checkToggle);
  checkClick(deleter);
  checkClick(editor);
