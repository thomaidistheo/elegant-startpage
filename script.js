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
let hours = today.getHours()
let minutes = today.getMinutes()
let time =  hours + ":" + minutes
let day = today.getDate() + " " + monthNames[today.getMonth()] + " " + today.getFullYear()

let welcomeMsg = document.querySelector('.welcome-msg')
hours < 12 ? welcomeMsg.innerHTML = "Good morning, Theo" : welcomeMsg.innerHTML = "Good afternoon, Theo"

let dateTime = document.querySelector('.current-date')
dateTime.innerHTML = day + "&nbsp | &nbsp" + time


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
    // createBookmark()
    bookmarksArr.push(newBookmarkInput.value)
    // const newIndex = bookmarksArr.indexOf(newBookmarkInput.value)
    // index = newIndex
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
            newA.setAttribute("href", `//${linkText.data}`)
            newA.innerHTML = linkText.data.split(".", 2).pop() // remove www and .com
            newLi.appendChild(newA)
            
            // delete button
            const delBtn = document.createElement('button')
            newLi.appendChild(delBtn)
            delBtn.innerText = "X"
            delBtn.classList.add('del-btn')

            newLi.classList.add('li-flex')

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

// // creates bookmark LIs when a new one is added 
// const createBookmark = () => {
//     const newLi = document.createElement('li')
//     const newA = document.createElement('a')
//     const linkText = document.createTextNode(newBookmarkInput.value)

//     newA.appendChild(linkText)
//     newA.setAttribute("href", `//${linkText.data}`)
//     newA.innerHTML = linkText.data.split(".", 2).pop() // remove www and .com
//     newLi.appendChild(newA)

//     bookmarkList.prepend(newLi) // prepend NEW li items to ul

//     // delete button
//     const delBtn = document.createElement('button')
//     delBtn.innerText = "DELETE"
//     delBtn.classList.add('del-btn')
//     newLi.appendChild(delBtn)
// }

// Runs when page loads to populate the bookmarks section using the stored local storage
// createBookmarksArr()

// button functionality for the bookmark form
newBookmarkBtn.onclick = () => {
    newBookmarkForm.classList.toggle('hidden')
    bookmarkList.classList.toggle('hidden')
}

newBookmarkCancel.onclick = () => {
    newBookmarkForm.classList.toggle('hidden')
    bookmarkList.classList.toggle('hidden')
}

newBookmarkForm.onsubmit = (e) => {
    e.preventDefault()
    location.reload()
    inputArr()
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
const notesList = document.getElementById('notes-list')

// toggle text input
newNoteBtn.onclick = () => {
    noteInputCont.classList.toggle('hidden')
}

// initialize temp array and stored notes array
let notesArr = []
let storedNotes = JSON.parse(localStorage.getItem("notes"))

// sync temp array with stored array then update stored array
notesArrUpdate = () => {
    if (storedNotes !== null) {
        notesArr = storedNotes
    } 
    notesArr.push(noteInput.value)
    localStorage.setItem("notes", JSON.stringify(notesArr))
}

// create the note element
createNewNote = (e) => {
    const newLi = document.createElement('li')
    const text =  document.createTextNode(e)
    newLi.appendChild(text)
    newLi.classList.add('note-item')
    notesList.appendChild(newLi)
}

// POPULATE NOTES  ----------
// pull notes array from local storage
displayNotes = () => {
    if (storedNotes !== null) {
        storedNotes.forEach((note) => {
            // createNewNoteArr(note)
            createNewNote(note)
        })
    } else return
}
// show the stored notes on load
window.onload = displayNotes()

// adding new note
noteDoneBtn.onclick = (e) => {
    e.preventDefault()
    createNewNote(noteInput.value)
    notesArrUpdate()
}