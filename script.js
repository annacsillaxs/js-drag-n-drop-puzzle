const boxes = document.querySelectorAll('.box');
const draggableList = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const listItems = [];
let dragStartIndex;

createGrid();

function createGrid() {
  [...indexes]
  // every index 'value' gets a random num 'sort'
  .map(a => ({ value: a, sort: Math.random()}))
  // sorts the index values based on their sort numbers
  .sort((a, b) => a.sort - b.sort)
  // gives back only the index value
  .map(a => a.value)
  .forEach((num, i) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', i);

    listItem.innerHTML = `
      <div class="box draggable" draggable="true" style="background:url(./img/${num}.jpg) no-repeat center center/cover;">${num}</div>
     `;
    
    listItems.push(listItem);
    draggableList.appendChild(listItem);

  });
  // console.log(indexes)
  addEventListeners();
}

function dragStart() {
  dragStartIndex = this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  this.className += ' hovered';
}

function dragLeave() {
  this.classList.remove('hovered');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('hovered');
}
 
// Swap list items that are dragged and dropped
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const imgNum = +listItem.querySelector('.draggable').innerText;
    
    if (imgNum !== indexes[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }

    setTimeout(() => {
      listItem.classList.remove('wrong');
      listItem.classList.remove('right');
    }, 3000);
  });
}

  function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    })
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    })
  }

check.addEventListener('click', checkOrder);

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again') {
    window.location.reload();
  }
});
