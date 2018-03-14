import { AbstractControl } from '@angular/forms';


export const passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
	const password = control.get('pwd');
	const confirmPassword = control.get('confirmPwd');
	if (!password || !confirmPassword) {
		return null;
	}
	return password.value === confirmPassword.value ? null : { nomatch: true };
};

export const passwordPattern = '^[^<>=!]{6,32}$';