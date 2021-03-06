import { AbstractControl } from '@angular/forms';


export const emailMatcher = (control: AbstractControl): { [key: string]: boolean } => {
    const email = control.get('confEmail');
    const confirmedEmail = control.get('confirmedEmail');
    if (!email || !confirmedEmail) {
        return null;
    }
    return email.value === confirmedEmail.value ? null : { nomatch: true };
};

export const emailPattern = '^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
