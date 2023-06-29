import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  listaUsers: User[] = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.list().subscribe((listaUsers) => {
      this.listaUsers = listaUsers
    })
  }

  editUserRole(userLogin: string): void {
    // O role pode ser ou ADMIN ou USER, e quando clica no botão inverte
    this.service.editUserRole(userLogin).subscribe((response) => {console.log(response)});
  }
  
  deleteUser(userLogin: string): void {
    // A linha deve ser deletada
    this.service.excluir(userLogin).subscribe((response) => {console.log(response)});
  }
}