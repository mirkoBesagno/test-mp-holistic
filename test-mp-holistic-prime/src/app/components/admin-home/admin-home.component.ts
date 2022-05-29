import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  itemPersona = new FormGroup({
    nome: new FormControl('Mahesh'),
    cognome: new FormControl('jiji')
   }); 

  nome = '';
  cognome = '';

  constructor() {
  }

  ngOnInit(): void {
    this.nome = 'nome test angular';
    this.cognome = "cognome test angular";
  }
  onFormSubmit(){
    console.log('ciao');    
  }
}
