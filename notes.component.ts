import { Component, OnInit } from '@angular/core';
import { PostNotes } from '../models/postNotes.model';
import { NotesService } from '../service/notes.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {
  title = 'postNotes';
  modalTitle: string = 'Crear nota';
  isEditNote: boolean = false;
  idNote: any = '';
  isSearch: boolean = false;
  noteName: string = '';
  noteBody: string = '';
  postNotes: PostNotes[] = [];

  constructor(private _notesService: NotesService) {  }

  ngOnInit(): void {
  }

  addNotes = () => {
    // if (!this.isEditNote) {
    //   this.postNotes.push({
    //     noteName: this.noteName,
    //     noteBody: this.noteBody,
    //     inputDate: new Date(),
        
    //   });
    // } else {
    //   this.postNotes[this.idNote ?? 0] = {
    //     noteName: this.noteName,
    //     noteBody: this.noteBody,
    //     // inputDate: new Date(),
       
    //   }

    // }
    // console.log(this.noteName, new Date().toLocaleDateString(), new Date().toLocaleTimeString())
    // this.backupData();
    // this.clearModal();
  }

  clearModal = () => {
    this.noteName = '';
    this.noteBody = '';
    this.isEdit(false);
  }
  
  backupData = () => {
     this._notesService.backupData(this.noteName, this.noteBody).subscribe(
      {
        next: async data =>{
         await this.postNotes.push({
                noteName: data.note.noteName,
                noteBody: data.note.noteBody,
                _id: data.note._id,
        })
      console.log(data)
      },
        error: error=>{
          console.log(error);
        }
      });
  }

  restoreData = () => {
    this.postNotes = JSON.parse(sessionStorage.getItem('postNotes') || '');
  }

  isEdit = (isEditData: boolean, idNote?: number) => {
    if (isEditData) {
      this.idNote = idNote??0;
      this.isEditNote = true;
      this.setModalEdit();
    } else {
      this.isEditNote = false;
      this.modalTitle = 'Crear nota';
    }
  }

  setModalEdit = () => {
    this.modalTitle = 'Editar nota';
    this.noteName = this.postNotes[this.idNote ?? 0].noteName;
    this.noteBody = this.postNotes[this.idNote ?? 0].noteBody;
  }

  setDeleteIdNote = (idNote: number) => {
    this.idNote = this.idNote;
  }

  deleteNote = (idNote:any) => {
    console.log("=>"+idNote)
    try {
      this._notesService.deleteNotes(idNote).subscribe(data =>{
        console.log(data);
      });
      // console.log('Contacto Eliminado')

    }catch
    (error){
      console.log(error); 
    } 

  }


  searchNote = () => {
    this.isSearch = true;
    this.postNotes = this.postNotes.filter((elem) =>{
      return elem.noteName.includes(this.noteName);
    })
  }

  isSearchNote =()=>{
    this.isSearch = false;
    this.noteName = '';
    this.restoreData();
  }

  sortAsc = () => {
    this.postNotes.sort (function (a,b){
      if (a.noteName > b.noteName){
        return 1;
      }
      if (a.noteName < b.noteName){
        return -1;
      }
      return 0;
    });
  }
  
  sortDesc = () => {
    this.postNotes.sort (function (a,b){
      if (a.noteName < b.noteName){
        return 1;
      }
      if (a.noteName > b.noteName){
        return -1;
      }
      return 0;
    });
  }


  // sortDateAsc = () => {
  //   this.postNotes.sort(
  //     (objA, objB) => objA.inputDate.getTime() - objB.inputDate.getTime(),
  //   );
  // }
  
  // sortDateDesc = () => {
  //   this.postNotes.sort(
  //     (objA, objB) => objB.inputDate.getTime() - objA.inputDate.getTime(),
  //   );
  } 





