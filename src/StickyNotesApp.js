import NotesWall from './NotesWall.js';

class StickyNotesApp {
  
    constructor() {
        this.notesWall = new NotesWall();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.renderNotes();
        });

        //Creating a new note
        document.getElementById("new-note").addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey && event.target.value.trim() !== "") {
                event.preventDefault();
                const text = event.target.value.trimRight();
                this.notesWall.addNote(text);
                event.target.value = "";
                this.renderNotes();
            }
        });
    }

    attachEventListeners(noteElement, note, noteText, editTextarea) {
        const toggleEditing = () => {
            noteText.classList.toggle("hidden");
            editTextarea.classList.toggle("hidden");
            editTextarea.focus(); 
        };

        noteElement.addEventListener("dblclick", toggleEditing); 

        noteElement.querySelector('.delete-btn').addEventListener("click", () => {
            this.notesWall.removeNote(note.id);
            this.renderNotes();
        });

        editTextarea.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();  
                editTextarea.blur();  
            }
        });

        editTextarea.addEventListener("blur", () => {
            this.notesWall.editNote(note.id, editTextarea.value);
            noteText.textContent = editTextarea.value; 
            toggleEditing(); 
        });
    }

    renderNotes() {
        
        const notesWallElement = document.getElementById("notes-wall");
        notesWallElement.innerHTML = ""; // clear the current list to avoid duplicates

        const notes = this.notesWall.getNotes();

        notes.forEach((note) => {
            const noteElement = document.createElement("div");
            noteElement.className = "relative w-40 h-40 p-0 m-2 overflow-y-auto transition-transform transform bg-yellow-200 shadow-lg note hover:scale-105";

            const noteText = document.createElement("div"); 
            noteText.classList.add("p-4", "note-text"); 
            noteText.textContent = note.text; 
            noteText.style.whiteSpace = 'pre-line'; //preserve new lines

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "🗑";
            deleteButton.className = "absolute w-5 h-5 leading-5 text-center transition-opacity opacity-0 cursor-pointer delete-btn top-1 right-1 hover:opacity-100"; 

            const editTextarea = document.createElement("textarea");
            editTextarea.className = "absolute top-0 left-0 hidden w-full h-full p-4 transition-transform transform bg-yellow-300 shadow-xl resize-none outline-rose-700 outline-offset-0 note-edit note hover:scale-105";
            editTextarea.textContent = note.text;

            noteElement.appendChild(deleteButton);
            noteElement.appendChild(noteText);
            noteElement.appendChild(editTextarea);

            this.attachEventListeners(noteElement, note, noteText, editTextarea);

            notesWallElement.appendChild(noteElement);
        });
    }
}

export default StickyNotesApp;