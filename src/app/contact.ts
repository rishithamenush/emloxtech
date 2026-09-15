import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { services } from './content';
@Component({ selector: 'app-contact', imports: [FormsModule], templateUrl: './contact.html' })
export class Contact {
  services = services;
  sent = signal(false);
  model = {
    name: '',
    email: '',
    company: '',
    service: inject(ActivatedRoute).snapshot.queryParamMap.get('service') || '',
    budget: 'Let’s discuss',
    message: '',
  };
  get brief() {
    return `Project enquiry for EmloX Tech\n\nName: ${this.model.name}\nEmail: ${this.model.email}\nCompany: ${this.model.company || 'Not specified'}\nInterested in: ${this.model.service}\nBudget: ${this.model.budget}\n\n${this.model.message}`;
  }
  get mailto() {
    return (
      'mailto:info@emloxtech.com?subject=' +
      encodeURIComponent('Project enquiry — ' + this.model.name) +
      '&body=' +
      encodeURIComponent(this.brief)
    );
  }
  submit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }
    this.sent.set(true);
    setTimeout(() => document.getElementById('brief-heading')?.focus(), 0);
  }
  download() {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([this.brief], { type: 'text/plain' }));
    a.download = 'emlox-project-brief.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  }
}
