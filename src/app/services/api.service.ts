import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { forkJoin, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Token, User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private _currentUser: User;
  private _isLoggedIn: boolean;

  constructor(private http: HttpClient, public router: Router) { }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get currentUser(): User {
    return this._currentUser;
  }

  login(email: string, password: string) {
    return this.http.post<Token>(environment.login, { email, password }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  getUser(data?: Token) {
    if (data) {
      this.setTokenInfo(data);
    }
    return this.http.get<User>(environment.getUser).pipe(
      catchError(error => throwError(() => error))
    );
  }

  signIn(email: string, password: string) {
    return this.login(email, password).pipe(
      switchMap(res => this.getUser(res).pipe(
        tap(user => this.setCurrentUser(user))
      ))
    );
  }

  setTokenInfo(data: Token) {
    this._isLoggedIn = true;
    localStorage.setItem('access_token', data.accessToken);
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  setUserInfo(data: User) {
    this.setCurrentUser(data);
  }

  setCurrentUser(value: User) {
    this._currentUser = value;
  }

  logout() {
    localStorage.removeItem('access_token');
    this._isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  getSamples() {
    return this.http.get(environment.getSamples).pipe(
      switchMap(res => this.getSamplesDetail(res).pipe(
        tap(obj => this.normalizeData(obj))
      )),
      catchError(error => throwError(() => error))
    );
  }

  normalizeData(s){
    return s.forEach(sample => {
      sample.tests.forEach(t => t.sampleId = sample.id)
    })
  }

  getSamplesDetail(obj) {
    const samplesArray = [];
    obj.items.forEach(o => samplesArray.push(this.getSamplesId(o.id)))
    return forkJoin(samplesArray);
  }


  getSamplesId(id) {
    return this.http.get(environment.getSamplesId.replace('##id##', id)).pipe(
      catchError(error => throwError(() => error))
    );
  }

  createSample(name: string, description: string) {
    return this.http.post(environment.createSample, { name: name, description: description }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  createTest(name: string, sampleId: string) {
    return this.http.post(environment.createTest, { name: name, sampleId: sampleId }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  deleteSample(id: string) {
    return this.http.delete(environment.deleteSample.replace('##id##', id)).pipe(
      catchError(error => throwError(() => error))
    );
  }

  deleteTest(id: string) {
    return this.http.delete(environment.deleteTest.replace('##id##', id)).pipe(
      catchError(error => throwError(() => error))
    );
  }

  editSample(id: string, name: string, description: string) {
    return this.http.put(environment.editSample.replace('##id##', id), { name: name, description: description }).pipe(
      catchError(error => throwError(() => error))
    );
  }

  editTest(id: string, name: string, sampleId: string) {
    return this.http.put(environment.editTest.replace('##id##', id), { name: name, sampleId: sampleId }).pipe(
      catchError(error => throwError(() => error))
    );
  }
}