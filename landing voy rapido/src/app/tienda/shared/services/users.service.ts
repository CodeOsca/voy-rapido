import { Comment } from './../interfaces/comment.interface';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API = environment.API;
  constructor(private http: HttpClient) {}

  update(user: User): Observable<string> {
    return this.http.put(this.API + 'users/', user).pipe(pluck('message'));
  }

  setComment(comment: Comment): Observable<string> {
    return this.http
      .post(this.API + 'comments', comment)
      .pipe(pluck('message'));
  }

  uploadImage(file: File): Observable<string> {
    const fileData = new FormData();
    fileData.append('file', file);
    return this.http
      .post(this.API + 'users/image/upload', fileData)
      .pipe(pluck('message'));
  }
}
