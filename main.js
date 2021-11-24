const inputItem = document.querySelector('.input-item');
const itemList = document.querySelector('.list-box');
const form = document.querySelector('#form');
let itemArray = [];
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemName = inputItem.value;
    if (inputItem.value !== '') {
        //        console.log(itemName)
        //push names into array
        itemArray.push(itemName)
        //store them locally
        storeLocally(itemArray)
        getFromLocal();
    } else {
        const war = itemList.insertAdjacentHTML('afterbegin', `<p class="p">Empty Item</p>`)

        setTimeout(() => {
            const child = document.querySelector('.p');
            itemList.removeChild(child)
        }, 1000)

    }
    inputItem.value = null;
})





const listItem = function (itemArray) {
    itemList.innerHTML = '';
    itemArray.forEach((item) => {
        itemList.insertAdjacentHTML('beforeend', `<div class="item"><p class="item-name">${item}</p><div class="buttons"><button class="buttons check"><i class="fas fa-check-circle"></i></button><button class="buttons edit"><i class="fas fa-edit"></i></button><button class="buttons delete"><i class="fas fa-trash-alt"></i></button></div></div>`);
        handle(item);
    })
}

const handle = function (item) {
    //    const check = document.querySelector('.check');
    //    const edit = document.querySelector('.edit');
    //    const remove = document.querySelector('.delete');

    //items sharing .item class
    const listItems = itemList.querySelectorAll('.item');


    listItems.forEach((i) => {
        //if input is text content
        if (i.textContent === item) {
            //for complete
            i.querySelector('.check').addEventListener('click', () => {
                console.log(i.querySelector('.check'))
                i.querySelector('.check').classList.toggle('lightgreen')
                i.querySelector('.item-name').classList.toggle('checked');
            })

            //edit event
            i.querySelector('.edit').addEventListener('click', () => {
                inputItem.value = item;
                itemList.removeChild(i)
                console.log(i, item)
                itemArray = itemArray.filter((find) => {
                    return find !== item;
                })
            })

            //delete event
            i.querySelector('.delete').addEventListener('click', () => {
                itemList.removeChild(i)
                itemArray = itemArray.filter((filter) => {
                    return filter !== item;
                })
            })

        }
    });
}

const getFromLocal = function () {

    const getStorage = localStorage.getItem('itemArray');
    if (getStorage === undefined || getStorage === null) {
        itemArray = [];
        //        console.log('ready')
    } else {
        itemArray = JSON.parse(getStorage)
        //        console.log(itemArray)
        listItem(itemArray);
    }
}

const storeLocally = function (itemArray) {
    localStorage.setItem('itemArray', JSON.stringify(itemArray))
    //    console.log(localStorage.getItem('itemArray'))
}

const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
    console.log(itemArray)
    itemArray = [];
    localStorage.clear();
    listItem(itemArray)
})
