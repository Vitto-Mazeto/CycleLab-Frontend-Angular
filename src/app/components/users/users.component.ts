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

  editUserRole(userId: number): void {
    // Lógica para editar o usuário com o ID fornecido
  }
  
  deleteUser(userId: number): void {
    // Lógica para excluir o usuário com o ID fornecido
  }
}