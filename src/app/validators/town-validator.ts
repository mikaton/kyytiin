import { AbstractControl } from '@angular/forms';
import { Town, townsArray } from '../components/ridecreate/town'

export const townMatcher = (control: AbstractControl): { [key: string]: boolean } => {
	const place = control.value;
	if (!place) {
		return null;
	}
	return townsArray.includes(place) ? null : { nomatch: true };
};
