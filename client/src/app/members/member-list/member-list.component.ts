import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = []; // właściwość przechowująca wszystkich członków aplikacji

  constructor(private memberService: MembersService) { }

  ngOnInit(): void { // metoda cyklu życia komponentu
    this.loadMembers(); // lista członków zostaje załadowana podczas inicjalizacji komponentu
  }

  // Wywołuje usługę memberService i subskrybuje się do wyniku, który otrzymuje w postaci strumienia (observable).
  loadMembers() { 
    this.memberService.getMembers().subscribe({
      // co ma się stać po otrzymaniu danych -> przypisuje ona otrzymaną listę członków (members) do właściwości this.members komponentu.
      next: members => this.members = members 
    })
  }

}
