// Luokka joka implementoi ErrorHandler rajapinnan.
// Kaikki Angularin kiinniottamat virheet menevät tämän kautta, kun se määritellään providers-taulukossa app.modulessa.
// Tämä on globaali errorhandler, eli korvaa Angularin oman, joten tätä ei tarvitse erikseen kutsua/importata
import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorHandlerService } from './services/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private errorService: ErrorHandlerService) {}

    handleError(error) {
        // Loggaa tällä hetkellä vain konsoliin kustomoidun virheviestin
        this.errorService.logError(error);
        this.errorService.showErrorDialog(error);
    }
}

// Service virheiden käsittelylle
// TODO loggaa palvelimelle tekstitiedostoon/vastaavaan
