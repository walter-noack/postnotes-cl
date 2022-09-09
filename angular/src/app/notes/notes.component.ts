import { Component, OnInit } from '@angular/core';
import { PostNotes } from '../models/postNotes.model';
import { NotesService } from '../service/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  id: any = '';
  postNotes: PostNotes[] = [];
  modalTitle: string = 'Crear nota';
  note: PostNotes = {
    noteName: '',
    noteBody: ''
  }
  noteName: string = '';
  noteBody: string = '';
  title = 'postNotes';
  isEditNote: boolean = false;
  isSearch: boolean = false;
  noteEdit: any = '';

  constructor(
    private notesService: NotesService
    ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes() {
    this.notesService.getNotes().subscribe({
      next: (data) => {
        console.log(data),
          this.postNotes = data.notes
      }, error: (error) => {
        console.log(error)
      }
    })
  }


  addNotes = () => {
    let newNote = new PostNotes(
      this.noteName,
      this.noteBody);
    this.notesService.addNotes(newNote).subscribe({
      next: (data) => {
        console.log(data),
          this.getNotes()
      }, error: (error) => { console.log(error) }
    })
    this.clearModal();

  }
  

  

  clearModal = () => {
    this.noteName = '';
    this.noteBody = '';
  }


  deleteNotes(id: any) {
    this.notesService.deleteNotes(id).subscribe({
      next: (data) => {
        console.log(data),
          console.log('Nota Eliminada'),
          this.getNotes()
      }, error: (error) => { console.log(error) }
    })

  }


  editNote = (id: any) => {
    this.notesService.getNoteById(id).subscribe(data => {
      console.log(data);
      this.noteEdit = data.notes;
    });
  }


  updateNote = () => {
    this.notesService.updateNote(this.noteEdit).subscribe({
      next: () => {
        this.getNotes();
      }, error: (error) => { console.log(error) }
    });
  }




  searchNote = () => {
    this.isSearch = true;
    this.postNotes = this.postNotes.filter((elem) => {
      return elem.noteName.includes(this.noteName);
    })
  }

  isSearchNote = () => {
    this.isSearch = false;
    this.noteName = '';
    this.getNotes();
  }



  sortAsc = () => {
    this.postNotes.sort(function (a, b) {
      if (a.noteName > b.noteName) {
        return 1;
      }
      if (a.noteName < b.noteName) {
        return -1;
      }
      return 0;
    });
  }

  sortDesc = () => {
    this.postNotes.sort(function (a, b) {
      if (a.noteName < b.noteName) {
        return 1;
      }
      if (a.noteName > b.noteName) {
        return -1;
      }
      return 0;
    });
  }



}



