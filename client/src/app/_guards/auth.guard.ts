import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'; // Interfejs, który musi zostać zaimplementowany przez ten serwis w celu obsługi logiki autoryzacji.
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root' // dostępny w całej aplikacji
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, 
    private toastr: ToastrService) {}

  canActivate(): Observable<boolean> { // Zwraca obiekt typu Observable<boolean>, który reprezentuje strumień wartości typu boolean.
    // zwraca obserwatora currentUser$ z AccountService, który dostarcza informacje o aktualnie zalogowanym użytkowniku.
    return this.accountService.currentUser$.pipe( // dzięki pipe() łączy logikę przetwarzania strumienia.
      map(user => { // map() przekształca wartość strumienia (czyli użytkownika) na wartość boolean.
        if (user) return true;
        else {
          this.toastr.error('You shall not pass!');
          return false;
        }
      })
    );
  }
  
}

// AuthGuard sprawdza, czy użytkownik jest zalogowany przed nawigacją do określonych ścieżek. Dopisując np 
// ścieżkę /members w url, niezalogowany użytkownik nie będzie mógł zobaczyc treści
// w app-routing.module dodajemy właściwośc canActivate do tych ścieżek, które chcemy ukryć przed niezalogowanym userem