import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
//import { catchError, map, tap } from 'rxjs/operators';
import * as moment from "moment";

@Injectable()
export class AuthService {

  constructor(public jwtHelper: JwtHelperService,  private http: HttpClient) {}

  // ...
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  public login(email: string, password: string){
return this.http.post<User>('http://pre.skinner.viveogroup.com/api/v1/login', { email, password })
  	.pipe(
      tap((user: User) => this.setSession(user)),
      catchError(this.handleError<User>('login'))
    );
       //return this.http.post<User>('http://pre.skinner.viveogroup.com/api/v1/login', { email, password })
            // this is just the HTTP call, 
            // we still need to handle the reception of the token
        //.do(res => this.setSession) 
		//.shareReplay();
  }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
  	console.log(message);
  }

  private setSession(authResult){
  	const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.idToken);
	localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

   public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
   }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
	} 

}