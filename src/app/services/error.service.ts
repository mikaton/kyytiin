// Service virheiden käsittelylle
// TODO loggaa palvelimelle tekstitiedostoon/vastaavaan
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {
    logError(error: any) {
        // Logataan aika jolloin virhe tapahtui
        const date = new Date();

        // Jos tapahtui HTTP-virhe
        // Palvelimen virheen mukana (myös omien!) pitää aina tulla message ja statuskoodi
        if(error instanceof HttpErrorResponse) {
            console.error(date, 'HTTP-virhe!', error.message, 'Statuskoodi: ', (<HttpErrorResponse>error).status);
        }
        // Kustiin jotain koodissa
        else if(error instanceof TypeError) {
            console.error(date, 'Tietotyyppivirhe!', error.message);
        }
        // Heitettiin jokin yleinen virhe
        else if(error instanceof Error) {
            console.error(date, 'Geneerinen virhe!', error.message);
        } else {
            // Jotain meni pieleen ja ei tiedetä että mitä..
            console.error(date, 'Tuntematon virhe!', error);
        }

    }
}