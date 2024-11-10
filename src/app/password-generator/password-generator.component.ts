import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.css'
})
export class PasswordGeneratorComponent implements OnInit{
  length: number = 8;
  number: boolean = false;
  character: boolean = false;
  password: string = '';
  button: string = 'Copy';
  
  @ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.generatePassword();
  }

  generatePassword(): void {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (this.number) str += '0123456789';
    if (this.character) str += '!@#$%^&*()_-=+~{}[]';

    for (let i = 0; i < this.length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    
    this.password = pass;
  }

  copyPasswordToClipboard(): void {
    this.passwordInput.nativeElement.select();
    window.navigator.clipboard.writeText(this.password);
    this.toastr.success('Password Copied Successfully!', '', {
      positionClass: 'toast-top-center',
      toastClass: 'ngx-toastr',
    });
  }

  onLengthChange(event: any): void {
    this.length = event.target.value;
    this.generatePassword();
  }

  toggleNumbers(): void {
    this.number = !this.number;
    this.generatePassword();
  }

  toggleCharacters(): void {
    this.character = !this.character;
    this.generatePassword();
  }
}
