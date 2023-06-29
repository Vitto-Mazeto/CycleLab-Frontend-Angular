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

  editUserRole(user: User): void {
    this.service.editUserRole(user.login).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });
  }
  
  
  deleteUser(user: User): void {
    this.service.excluir(user.login).subscribe((response) => {
      console.log(response);
      window.location.reload();
    });
  }
}