import { Component, Injectable, Inject, AfterViewInit } from '@angular/core';
import { OT_GConstants, IGConstants } from './constants/GConstants';
import { TranslateService } from 'ng2-translate';
import globalVar = require('./globalVar');

@Component({
    selector: 'my-app',
    templateUrl: './app/app.html',
    styleUrls: ['./app/app.component.css', './app/assets/css/global.main.css'
        , './app/assets/css/fadeInDiv.css']
})

@Injectable()
export class AppComponent {

    constructor( @Inject(OT_GConstants) private GCONSTANTS: IGConstants, private translate: TranslateService) {
        translate.addLangs([GCONSTANTS.LANG_EN, GCONSTANTS.LANG_ZH]);
        translate.setDefaultLang(GCONSTANTS.LANG_ZH);

        let browserLang = translate.getBrowserLang();
        globalVar.gLangInd = browserLang;
        translate.use(browserLang.match(/en|zh/) ? browserLang : GCONSTANTS.LANG_ZH);

        // Set default filter Year
        globalVar.filterYear = 45;
    }

    ngAfterViewInit() {
        // jQuery: find the menu and toggle the menu body;
        $(function () {
            $('.navbar-toggle').click(function () {
                $('.navbar-nav').toggleClass('slide-in');

                /// uncomment code for absolute positioning tweek see top comment in css
                //$('.absolute-wrapper').toggleClass('slide-in');

            });
        });
    }

    toggleMenuSlideOut(event) {
        $('.navbar-nav').toggleClass('slide-in');
    }

    appChangeLang(lang: string) {
        globalVar.gLangInd = lang;
        var langIndBtn = document.getElementById('langIndBtn');
        if (langIndBtn !== null && langIndBtn !== undefined) {
            langIndBtn.click();
        }
    }
}