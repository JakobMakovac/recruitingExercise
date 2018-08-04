import { Component, OnInit } from '@angular/core';
import * as contactsJson from './contacts.json';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  contacts: Contact[] = [];
  addedContacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  lastFilter: string = "";
  finalMessage: string = "";

// load sample contacts from contacts.json and populate contacts array

  constructor() {

    for(var c in contactsJson) {
      if(contactsJson.hasOwnProperty(c)){
        this.contacts.push(new Contact(contactsJson[c].name, contactsJson[c].email));
      }
    }
  }

  ngOnInit(){}
  
// showSearch and hideSearch are connected to search and comment input field
// Used to display and hide dropdown menu with contacts

  showSearch(): void {
    document.getElementById("dropDownElements").classList.remove('hidden');
    document.getElementById("searchField").classList.remove('inputError');
    (<HTMLInputElement>document.getElementById("searchField")).placeholder="Type name or email";
    document.getElementById("email").classList.add('hidden');
    this.filterResults(this.lastFilter);
  }

  hideSearch(): void {
    document.getElementById("dropDownElements").classList.add('hidden');
    document.getElementById("email").classList.remove('hidden');
  }

  addContact(contact: Contact): void {
    this.addedContacts.push(contact);
    (<HTMLInputElement>document.getElementById("searchField")).value="";
    this.lastFilter="";
    this.filterResults(this.lastFilter);
  }

  removeContact(contact: Contact) {
    this.addedContacts = this.addedContacts.filter(c => c.name !== contact.name);
    this.filterResults(this.lastFilter);
  }

// auxiliary function for contact sorting

  compareContacts(a: Contact, b: Contact) {
    return a.name > b.name ? 1 : -1;
  }

/* Populates filteredContacts array based on initial contacts, removes already added contacts
*  and filters remainder based on filter parameter.
*  Finnaly sorts filteredContacts alphabetically.
*/

  filterResults(filter: string): void {
    var input = this.contacts;

    this.filteredContacts = [];

    for(var a in this.addedContacts){
      input = input.filter(c => c.name !== this.addedContacts[a].name);
    }

    for(var i in input) {
        if((input[i].name.toUpperCase().indexOf(filter) > -1) ||
		(input[i].email.toUpperCase().indexOf(filter) >-1)){
 	  this.filteredContacts.push(input[i]);
      	}
    }

    this.filteredContacts.sort(this.compareContacts);

  }

// Gets user input and calls filtering function, also stores last used keyword

  getKeyword(event: any): void {
    var keyword = event.target.value.toUpperCase();
    this.lastFilter = keyword;

    this.filterResults(keyword);
      
  }

  onSubmit(comment: string): void {

    if(this.addedContacts.length == 0){
      document.getElementById("searchField").classList.add('inputError');
      (<HTMLInputElement>document.getElementById("searchField")).placeholder=
      "Choose at least one contact";
    } else {
      this.finalMessage =
      "Shared " + comment + " with " + this.addedContacts.map(c => " " + c.name);
      document.getElementById("finalMessage").classList.remove('hidden');
      document.getElementById("submitButton").classList.add('hidden');
      document.getElementById("confirmButton").classList.remove('hidden');
    }
  }

  onConfirm(): void {
    document.getElementById("submitButton").classList.remove('hidden');
    document.getElementById("confirmButton").classList.add('hidden');
    document.getElementById("finalMessage").classList.add('hidden');
    (<HTMLInputElement>document.getElementById("searchField")).value="";
    (<HTMLInputElement>document.getElementById("comment")).value="";
    this.hideSearch();
    this.addedContacts = [];
  }
}
