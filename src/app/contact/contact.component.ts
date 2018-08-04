import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() contact: Contact;

  @Output() selectedContact: EventEmitter<Contact>;

  constructor() {
    this.selectedContact = new EventEmitter();
  }

// propagates back the information about selected contact

  clickedContact(contact: Contact): void {
    this.selectedContact.emit(contact);
  }

  ngOnInit() {
  }

}
