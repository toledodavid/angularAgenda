import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contacts:any = [];

  name:string;
  email:string;
  phone:number;
  address:string;


  editIndex:number;
  editId:number;
  editName:string;
  editEmail:string;
  editPhone:number;
  editAddress:string;

  constructor() {

    if(!JSON.parse(localStorage.getItem('contacts'))){
      this.contacts.push(
        {
          id: 1,
          name: 'David Toledo',
          email: 'dtoledoz0207@gmail.com',
          phone: '3121959748',
          address: 'Moctezuma #85, Centro, Coquimatlán, Colima.'
        }
      );
      
      this.saveStorage();
    }else{
      this.contacts = JSON.parse(localStorage.getItem('contacts'));
    }
    
  }

  ngOnInit() {}

  saveContact(formulario: NgForm){
    let id:number = new Date().getTime();
    let name:string = formulario.value.name;
    let email:string = formulario.value.email;
    let phone:number = formulario.value.phone;
    let address:string = formulario.value.address;
    
    let newContact:any = {id, name, email, phone, address};
    this.contacts.push(...[newContact]);
    this.saveStorage();

    this.name = '';
    this.email = '';
    this.phone = undefined;
    this.address = '';
  }


  deleteContact(index:number){
    this.contacts.splice(index, 1);
    this.saveStorage();
  }

  getContactDataForModalEdit(index:number, id:number, name:string, email:string, phone:number, address:string){
    this.editIndex = index;
    this.editId = id;
    this.editName = name;
    this.editEmail = email;
    this.editPhone = phone;
    this.editAddress = address;
  }


  editContact(){
    this.contacts[this.editIndex].name = this.editName;
    this.contacts[this.editIndex].email = this.editEmail;
    this.contacts[this.editIndex].phone = this.editPhone;
    this.contacts[this.editIndex].address = this.editAddress;
    this.saveStorage();
  }


  saveStorage(){
    localStorage.setItem("contacts", JSON.stringify(this.contacts));
  };

}
