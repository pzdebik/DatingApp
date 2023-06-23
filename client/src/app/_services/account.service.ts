import { HttpClient } from '@angular/common/http'; // umożliwia wykonywanie żądań HTTP w aplikacji Angular.
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs'; // używane do zarządzania strumieniem danych.
import { User } from '../_models/user';
import { environment } from 'src/environments/environment'; // zawiera zmienne środowiskowe, takie jak adres URL do API.

// znacza, że ta usługa jest dostępna na poziomie całej aplikacji (jako usługa globalna) 
// i zostanie dostarczona przez Angular na żądanie. 
@Injectable({
  providedIn: 'root' 
})

export class AccountService {
  baseUrl = environment.apiUrl;
  // BehaviorSubject - przechowuje info o bieżącym userze. Początkowo jest ustawiony na null.
  private currentUserSource = new BehaviorSubject<User | null>(null); 
  // currentUser$ jest strumieniem (observable), który można subskrybować, aby uzyskać dostęp 
  //do bieżącego użytkownika. Jest to publiczne pole i można je subskrybować z innych komponentów.
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  // Odpowiedź z serwera jest przetwarzana przez operator map, który pobiera response i 
  //przypisuje go do zmiennej user. Jeśli user istnieje, jego dane są zapisywane w 
  //pamięci lokalnej przeglądarki za pomocą localStorage.setItem, a następnie aktualizowane 
  //są dane w obiekcie currentUserSource za pomocą this.currentUserSource.next(user). 
  //Na końcu metoda zwraca strumień (Observable) z typem User.
  login(model: any){ //  Przyjmuje model jako argument, który reprezentuje dane logowania
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model: any) {
    // przekazuję model
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    ) 
  }

  setCurrentUser(user: User) { // służy do ustawienia bieżącego użytkownika
    this.currentUserSource.next(user);
  }

  logout() { //  Usuwa dane użytkownika z pamięci lokalnej przeglądarki
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
