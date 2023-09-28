import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { exhaustMap, forkJoin, from, tap } from 'rxjs';

declare let cordova: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly platform: Platform,
  ) {
  }

  ngOnInit(): void {
    console.log('Starting...');
    this.initializeApp();
  }

  initializeApp() {
    setTimeout(() => {
      console.log('Passed Timeout');
      this.startGlassbox();
    }, 5000);
  }


  private successCallback() {
    console.log("successCallback");
  }
  private errorCallback() {
    console.log("errorCallback")
  }

  private startGlassbox(): void {
    console.log('Enter in startGlassbox');
    const glassbox = cordova.require('glassbox-client-recording-plugin.glassbox');
    const reportUri = 'https://report.rabobank.gbqofs.io/thickclient/report/383ba605-6ae5-7605-a18c-d38a436a5a20/cls_report';
    const appId = '383ba605-6ae5-7605-a18c-d38a436a5a20';


    const startSession = () => {
      console.log('startSession entrou');

      glassbox.getSessionId(
        (sessionId: string) => console.log('getSessionId = ' + sessionId),
        () => console.info('GlassBox:getSessionId:error')
      );

      glassbox.isStarted((isStarted: any) =>
        console.log(`${isStarted ? 'GlassBox:sdk:IsStarted' : 'GlassBox:sdk:IsNotStarted'}`)
      );
    };

    glassbox.startSession(
      () => startSession(),
      (err: any) => console.info('GlassBox:startSession:error', err),
      reportUri,
      appId
    );
    glassbox.reportEvent("getInfo", {'test':'value', 'test2':'value2'}, this.successCallback, this.errorCallback);
  }
}
