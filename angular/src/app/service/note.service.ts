import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostNotes } from '../models/postNotes.model';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  url = 'http://localhost:3000/api/notes/';

  constructor(private http: HttpClient) { }


  addNotes(notes: PostNotes): Observable<any> {
    return this.http.post(this.url, notes);
  }

  getNotes(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteNotes(id: any): Observable<any> {
    return this.http.delete(`${this.url}${id}`);
  }

  getNoteById(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  updateNote(notes: PostNotes): Observable<any> {
     return this.http.put(this.url + notes._id, notes);
  }


}