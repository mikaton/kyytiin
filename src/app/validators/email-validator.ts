import { AbstractControl } from '@angular/forms';


export const emailMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const email = control.get('confEmail');
    const confirmedEmail = control.get('confirmedEmail');
    if (!email || !confirmedEmail) {
        return null;
    }
    return email.value === confirmedEmail.value ? null : { nomatch: true };
};

export const emailPattern = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
