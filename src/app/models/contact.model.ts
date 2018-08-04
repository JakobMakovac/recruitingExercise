export class Contact {
  name: string;
  email: string;

// a model for our contact. We require only name and email

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}