import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any; // właściwość będzie przechowywać info o błędzie

  constructor(private router: Router) { // wstrzykujemy obiekt Router, który umożliwia nawigację w aplikacji Angulara
    const navigation = this.router.getCurrentNavigation(); // pobiera info o aktualnej nawigacji
    this.error = navigation?.extras?.state?.['error'] 
    // "?." (optional chaining) sprawdza się, czy istnieją odpowiednie właściwości 
    // w obiekcie nawigacji, a konkretnie extras.state['error']. 
    // Jeśli tak, przypisuje się wartość tej właściwości do właściwości error komponentu.
   }

  ngOnInit(): void {
  }

}
