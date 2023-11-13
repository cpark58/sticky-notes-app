import Note from './Note.js';

class NotesWall {
  constructor() {
    this.notes = [];
    this.nextNoteId = 1;
  }

  addNote(text) {
    const newNote = new Note(this.nextNoteId++, text);
    this.notes.push(newNote);
  }

  editNote(id, newText) {
    const note = this.notes.find(note => note.id === id);
    if (note) {
      note.text = newText;
    }
  }

  removeNote(id) {
    this.notes = this.notes.filter(note => note.id !== id);
  }

  getNotes() {
    return this.notes;
  }
}

export default NotesWall;
