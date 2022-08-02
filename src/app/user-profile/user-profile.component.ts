import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  Usuario:any
  public userForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.Usuario = JSON.parse(localStorage.getItem('usuario'));
    this.userForm = new FormGroup({
      Nombre: new FormControl(this.Usuario[0].Nombre, Validators.required ),
      Password: new FormControl(this.Usuario[0].Password, Validators.required ),
      Rol: new FormControl(this.Usuario[0].Rol, Validators.required ),
      Usuario: new FormControl(this.Usuario[0].Usuario, Validators.required ),

    })
  }

}
