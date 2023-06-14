import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {path: '', component: HomeComponent}, // path='' ponieważ jest to ścieżka strony głównej localhost:4200
  {path: 'members', component: MemberListComponent},
  {path: 'members/:id', component: MemberDetailComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'messages', component: MessagesComponent},
  {path: '**', component: HomeComponent, pathMatch:'full'} // ** reprezentuje to czego nie ma na liście ścieżek, czyli co się stanie jak user wpisze niepoprawną ścieżkę
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
