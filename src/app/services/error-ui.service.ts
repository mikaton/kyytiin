import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { ErrorDialog } from './../dialogs/error-dialog';
import { VERSION, MatDialog, MatDialogRef } from '@angular/material';

@Injectable()
export class ErrorUiService {
	errorDialogRef: MatDialogRef<ErrorDialog>

    constructor(
		private dialog: MatDialog
	) {}

	// Haetaan käyttäjän ilmoitukset palvelimelta
	popErrorDialog(err) {
        this.errorDialogRef = this.dialog.open(ErrorDialog, {
			data: {
			  errorMessage: 'Jotain meni pieleen',
			  serverError: err.error.message
			}
		  });
	  }
}