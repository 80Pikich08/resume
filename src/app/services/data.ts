import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  private base = 'assets/data';

  private courses$?: Observable<any[]>;
  private projects$?: Observable<any[]>;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<any[]> {
    if (!this.courses$) {
      this.courses$ = this.http
        .get<any[]>(`${this.base}/courses.json`)
        .pipe(shareReplay(1));
    }
    return this.courses$;
  }

  getProjects(): Observable<any[]> {
    if (!this.projects$) {
      this.projects$ = this.http
        .get<any[]>(`${this.base}/projects.json`)
        .pipe(shareReplay(1));
    }
    return this.projects$;
  }
}
