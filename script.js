// & ----------------------------------------------------------------
// & THEME SELECTOR ----------------------------------------------------------------
// & ----------------------------------------------------------------

const themeToggle = document.querySelector('.theme')
const body = document.body
themeToggle.onclick = () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light')
        body.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        body.classList.remove('dark')
        body.classList.add('light')
        localStorage.setItem('theme', 'light')
    }
}

// LOAD THEME FROM LOCALSTORAGE ----------------------------------------------------------------
const theme = localStorage.getItem('theme')

if (theme) {
    body.classList.add(theme)
}

// & ----------------------------------------------------------------
// & HEADER MSG ----------------------------------------------------------------
// & ----------------------------------------------------------------

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let today = new Date()
let day = today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getFullYear()

let dateTime = document.querySelector('.current-date')
let welcomeMsg = document.querySelector('.welcome-msg')
function time() {
    var d = new Date();
    var m = d.getMinutes();
    var h = d.getHours();
    dateTime.textContent = 
    day + " // " + ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2)

    if (h<12) {
        welcomeMsg.textContent = "Good morning"
    } else {
        welcomeMsg.textContent = "Good afternoon"
    }
  }
  
  setInterval(time, 1000);

// & ----------------------------------------------------------------
// & ADD BOOKMARKS ----------------------------------------------------------------
// & ----------------------------------------------------------------

const newBookmarkBtn = document.querySelector(".new-bookmark-btn") // new btn
const newBookmarkCancel = document.querySelector(".cancel-btn") // cancel input
const bookmarkEdit = document.querySelector(".edit-bookmark-btn") // edit bookmarks
const newBookmarkForm = document.getElementById("bookmark-input-form") // form
const newBookmarkInput = document.getElementById("bookmark-input") // form input
const bookmarkList = document.getElementById("bookmarks-list") // ul 

let index;

let bookmarksArr = []

// Creates new array with newly added LIs to store in Local Storage
const inputArr = () => {
    bookmarksArr.push(newBookmarkInput.value)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksArr))
}


// Creates bookmark LIs using the stored bookmarks array
const createBookmarksArr = () => {

    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks"))

    if (storedBookmarks !== null) {
        storedBookmarks.forEach((bookmark) => {
            const newLi = document.createElement('li')
            const newA = document.createElement('a')
            const linkText = document.createTextNode(bookmark)
    
            newA.appendChild(linkText)
            newA.setAttribute("href", `//www.${linkText.data}`)
            newA.setAttribute("target", "_blank")
            newA.innerHTML = linkText.data.split(".", 1).pop() // remove www and .com
            newLi.appendChild(newA)
            
            // delete button
            const delBtn = document.createElement('button')
            newLi.appendChild(delBtn)
            delBtn.innerText = "X"
            delBtn.classList.add('del-btn')

            newLi.classList.add('li-flex-reverse')

            bookmarkList.prepend(newLi) // prepend STORED li items to ul

            const newIndex = storedBookmarks.indexOf(bookmark)

            delBtn.onclick = (e) => {
                storedBookmarks.splice(newIndex, 1)
                e.target.parentElement.remove()
                localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks))
            }
             
            bookmarksArr = storedBookmarks
        })

    } else return

}

// Runs when page loads to populate the bookmarks section using the stored local storage
window.onload = createBookmarksArr()

const handleDelete = (index) => {
    bookmarksArr.splice(index, 1)
}

// button functionality for the bookmark form
newBookmarkForm.onsubmit = (e) => {
    e.preventDefault()
    location.reload()
    inputArr()
    newBookmarkForm.classList.toggle('hidden')
    bookmarkList.classList.toggle('hidden')
}

newBookmarkBtn.onclick = () => {
    newBookmarkForm.classList.toggle('hidden')
    bookmarkList.classList.toggle('hidden')
}

newBookmarkCancel.onclick = () => {
    newBookmarkForm.classList.toggle('hidden')
    bookmarkList.classList.toggle('hidden')
}

// & ----------------------------------------------------------------
// & NOTES ----------------------------------------------------------------
// & ----------------------------------------------------------------

const newNoteBtn = document.querySelector('.notes-add')
const noteInputCont = document.querySelector('.note-input-container')
const noteInput = document.querySelector('.note-input')
const noteDoneBtn = document.querySelector('.note-done')
const notesList = document.querySelector('#notes-list')

// toggle text input
newNoteBtn.onclick = () => {
    noteInputCont.classList.toggle('hidden')
    newNoteBtn.classList.toggle('rotate')
}

// initialize temp array and stored notes array
let notesArr = []
let storedNotes = JSON.parse(localStorage.getItem("notes"))

// sync temp array with stored array then store updated array
notesArrUpdate = () => {
    if (storedNotes !== null) {
        notesArr = storedNotes
    }
    notesArr.push(noteInput.value)
    localStorage.setItem("notes", JSON.stringify(notesArr))
    noteInput.value = ''
}

// create the note element
createNewNote = (e) => {
    //create li element with note text from either input value or stored notes
    const newLi = document.createElement('li')
    newLi.innerText = e
    newLi.classList.add('note-item')
    newLi.classList.add('li-flex')
    notesList.prepend(newLi)

    //create delete btn
    const delBtn = document.createElement('button')
    newLi.appendChild(delBtn)
    delBtn.innerText = "X"
    delBtn.classList.add('del-btn')

    delBtn.onclick = (e) => {
        const noteIndex = storedNotes.indexOf(e)
        storedNotes.splice(noteIndex, 1)
        e.target.parentElement.remove()
        //update the stored notes
        localStorage.setItem("notes", JSON.stringify(storedNotes))
    }
}

// POPULATE NOTES  ----------
// pull notes array from local storage
displayNotes = () => {
    if (storedNotes !== null) {
        storedNotes.forEach((note) => {
            createNewNote(note)
        })
    } else return
}
// show the stored notes on load
window.onload = displayNotes()

// adding new note
noteDoneBtn.onclick = (e) => {
    e.preventDefault()
    if (noteInput.value === '') {
        noteDoneBtn.setAttribute('disabled', true)
        noteDoneBtn.classList.add('opacity')
    } else {
        createNewNote(noteInput.value)
        notesArrUpdate()
    }
}


// & ----------------------------------------------------------------
// & TODO ----------------------------------------------------------------
// & ----------------------------------------------------------------


const newTodoBtn = document.querySelector('.todo-add')
const todoInputCont = document.querySelector('.todo-input-container')
const todoInput = document.querySelector('.todo-input')
const todoDoneBtn = document.querySelector('.todo-done')
const todoList = document.querySelector('#todo-list')


// toggle text input
newTodoBtn.onclick = () => {
    todoInputCont.classList.toggle('hidden')
    newTodoBtn.classList.toggle('rotate')
}

// initialize temp array and stored todos array
let todosArr = []
let storedTodos = JSON.parse(localStorage.getItem("todos"))

//sync temp array with stored array then store updated array
todosArrUpdate = () => {
    if (storedTodos !== null) {
        todosArr = storedTodos
    }
    todosArr.push(todoInput.value)
    localStorage.setItem("todos", JSON.stringify(todosArr))
    todoInput.value = ''
}

// create the todo element
createNewTodo = (e) => {
    //crete li element with todo text from either input value or stored todos
    const newLi = document.createElement('li')
    newLi.innerText = e
    newLi.classList.add('todo-item')
    newLi.classList.add('li-flex')
    todoList.prepend(newLi)

    //create btn container
    const btnsCont = document.createElement('div')
    newLi.appendChild(btnsCont)

    //create completed todo btn 
    const completedBtn = document.createElement('button')
    btnsCont.appendChild(completedBtn)
    completedBtn.innerText = "✓"
    completedBtn.classList.add('completed-btn')

    //TODO completed todo functionality ------------

    //create delete brn
    const delBtn = document.createElement('button')
    btnsCont.appendChild(delBtn)
    delBtn.innerText = "X"
    delBtn.classList.add('del-btn')

    //delete functionality
    delBtn.onclick = (e) => {
        const todoIndex = storedTodos.indexOf(e)
        storedTodos.splice(todoIndex, 1)
        e.target.parentElement.remove()
        //update stored todos
        localStorage.setItem("todos", JSON.stringify(storedTodos))
    }
}

// POPULATE TODOS
//pull todos array from local storage
displayTodos = () => {
    if (storedTodos !== null) {
        storedTodos.forEach((todo) => {
            createNewTodo(todo)
        })
    } else return
}

// show the stored notes on load
window.onload = displayTodos()

// adding new todo
todoDoneBtn.onclick = e => {
    e.preventDefault()
    if(todoInput.value === '') {
        todoDoneBtn.setAttribute('disabled', true)
        todoDoneBtn.classList.add('opacity')
    } else {
        createNewTodo(todoInput.value)
        todosArrUpdate()
    }
}