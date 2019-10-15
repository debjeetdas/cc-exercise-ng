import { FormGroup } from '@angular/forms';

// Function to validate a form when the user directly clicks on form submit without touching the form
export function validateForm(form: FormGroup) {
  if (form.invalid) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsTouched();
    });
  }
}
export function checkNumberField(event, fieldControl, fieldLength?: number) {
  if (event.keyCode === 69 || event.keyCode === 189 || event.keyCode === 187) {
    return false;   // To prevent user from inputting the letter 'e' '+' '-' as it's allowed by <input type=number>
  } else {
    const value = fieldControl.value + '';
    if (fieldLength && value.length >= fieldLength) {
      fieldControl.setValue(value.slice(0, fieldLength - 1));
    }
  }
}
