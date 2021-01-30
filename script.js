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

const newNoteBtn = document.querySelector('.notes-add') // add button
const noteInputCont = document.querySelector('.note-input-container') // form
const noteInput = document.querySelector('.note-input') // input 
const noteDoneBtn = document.querySelector('.note-done') // input submit
const notesList = document.querySelector('#notes-list') // ul 
const emptyNotesMsg = document.querySelector('.empty-note-msg')
const emptyNotesBtn = document.querySelector('.empty-note-btn')

// toggle text input
newNoteBtn.onclick = () => {
    noteInputCont.classList.toggle('hidden')
    newNoteBtn.classList.toggle('rotate')
}

emptyNotesBtn.onclick = (e) => {
    noteInputCont.classList.toggle('hidden')
    newNoteBtn.classList.toggle('rotate')
}

showNotesMsg = () => {
    emptyNotesMsg.classList.remove('hidden')
    emptyNotesBtn.classList.remove('hidden')
}

hideNotesMsg = () => {
    emptyNotesMsg.classList.add('hidden')
    emptyNotesBtn.classList.add('hidden')
}

// create note item 
createNote = (val) => {
    // create li
    const li = document.createElement('li')
    li.innerText = val
    li.classList.add('todo-item')
    li.classList.add('li-flex')
    notesList.prepend(li)

    // create del btn
    const delBtn = document.createElement('button')
    delBtn.classList.add('del-btn')
    delBtn.innerText = "X"
    li.appendChild(delBtn)

    delBtn.onclick = (e) => {
        e.target.parentElement.remove()
        deleteNote(val)
    }

    hideNotesMsg()
}

// delete note item 
deleteNote = val => {
    notesArr = JSON.parse(localStorage.getItem('notes'))
    const noteIndex = notesArr.indexOf(val)
    notesArr.splice(noteIndex, 1)
    localStorage.setItem('notes', JSON.stringify(notesArr))

    if (notesArr.length < 1) {
        showNotesMsg()
    }
}

// store note items to local storage
storeNotes = val => {
    notesArr = JSON.parse(localStorage.getItem('item'))
    if (notesArr !== null) {
        notesArr.push(val)
        localStorage.setItem('notes', JSON.stringify(notesArr))
    } else {
        let notesArr = []
        notesArr.push(val)
        localStorage.setItem('notes', JSON.stringify(notesArr))
    }
}

// populate UI
displayNotes = () => {
    let notesArr = JSON.parse(localStorage.getItem('notes'))
    if (notesArr !== null) {
        notesArr.forEach((note) => {
            createNote(note)
            hideNotesMsg()
        })
    } else return
}

displayNotes()

// adding new note 
noteDoneBtn.onclick = e => {
    e.preventDefault()
    createNote(noteInput.value)
    storeNotes(noteInput.value)
}

// & ----------------------------------------------------------------
// & TODO ----------------------------------------------------------------
// & ----------------------------------------------------------------


const newTodoBtn = document.querySelector('.todo-add')
const todoInputCont = document.querySelector('.todo-input-container')
const todoInput = document.querySelector('.todo-input')
const todoDoneBtn = document.querySelector('.todo-done')
const todoList = document.querySelector('#todo-list')
const emptyTodosMsg = document.querySelector('.empty-todo-msg')
const emptyTodosBtn = document.querySelector('.empty-todo-btn')

// toggle text input
newTodoBtn.onclick = () => {
    todoInputCont.classList.toggle('hidden')
    newTodoBtn.classList.toggle('rotate')
}

emptyTodosBtn.onclick = (e) => {
    todoInputCont.classList.toggle('hidden')
    newTodoBtn.classList.toggle('rotate')
}

showTodosMsg = () => {
    emptyTodosMsg.classList.remove('hidden')
    emptyTodosBtn.classList.remove('hidden')
}

hideTodosMsg = () => {
    emptyTodosMsg.classList.add('hidden')
    emptyTodosBtn.classList.add('hidden')
}

// create todo item
createTodo = (val) => {
    // create li
    const li = document.createElement('li')
    li.innerText = val
    li.classList.add('todo-item')
    li.classList.add('li-flex')
    todoList.prepend(li)

    // create del btn
    const delBtn = document.createElement('button')
    delBtn.classList.add('del-btn')
    delBtn.innerText = 'X'
    li.appendChild(delBtn)
    
    delBtn.onclick = (e) =>{
        e.target.parentElement.remove()
        deleteTodo(val)
    }

    hideTodosMsg()
}

// delete todo item from dom and storage
deleteTodo = val => {
    todosArr = JSON.parse(localStorage.getItem('todos'))
    const todoIndex = todosArr.indexOf(val)
    todosArr.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todosArr))

    if (todosArr.length < 1) {
        showTodosMsg()
    }
}

// store todo items to local storage
storeTodos = val => {
    todosArr = JSON.parse(localStorage.getItem('todos'))
    if (todosArr !== null) {
        todosArr.push(val)
        localStorage.setItem('todos', JSON.stringify(todosArr))
    } else {
        let todosArr = []
        todosArr.push(val)
        localStorage.setItem('todos', JSON.stringify(todosArr))
    }
}

// populate UI
displayTodos = () => {
    let todosArr = JSON.parse(localStorage.getItem('todos'))
    if (todosArr !== null) {
        todosArr.forEach((todo) => {
            createTodo(todo)
            hideTodosMsg()
        })
    } else return
}

displayTodos()

// adding new todo
todoDoneBtn.onclick = e => {
    e.preventDefault()
    createTodo(todoInput.value)
    storeTodos(todoInput.value)
    todoInput.value = ''
}