import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/providers/authentication.service';
import { ReturnPage } from './return/return.page';
import { LoginPage } from './login/login.page';
import OneSignal from 'onesignal-cordova-plugin';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appClient = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Profil', url: '/profil', icon: 'person' },
    { title: 'Trash', url: '/tabs', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public appTech = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Clients', url: '/customers', icon: 'person' },
    { title: 'Planning', url: '/calendar', icon: 'calendar' },
    //{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    //{ title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Carte', url: '/map', icon: 'map' },
    { title: 'Profil', url: '/profil', icon: 'person' },
    //{ title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    //{ title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public appAdmin = [
    { title: 'Home', url: '/home', icon: 'home' },
     //{ title: 'Profil', url: '/profil', icon: 'person' },
    { title: 'Utilisateurs', url: '/customers', icon: 'person' },
     //{ title: 'Techniciens', url: '/techs', icon: 'person' },
     //{ title: 'Administrateurs', url: '/users', icon: 'person' },
    { title: 'Posts', url: '/posts', icon: 'mail' },
  //  { title: 'Planning', url: '/calendar', icon: 'calendar' },
    //{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //  { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Carte', url: '/map', icon: 'map' },

  // { title: 'Emails', url: '/emails', icon: 'person' },
  //  { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];



  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
     
    { title: 'Utilisateurs', url: '/customers', icon: 'people' },
     //{ title: 'Techniciens', url: '/techs', icon: 'person' },
     //{ title: 'Administrateurs', url: '/users', icon: 'person' },
    { title: 'Posts', url: '/posts', icon: 'list' },
    { title: 'Services', url: '/services', icon: 'copy' },
    { title: 'Interventions', url: '/appointements', icon: 'calendar' },
    { title: 'Produits', url: '/products', icon: 'cart' },
    { title: 'Categories', url: '/categories', icon: 'pricetags' },

  //  { title: 'Planning', url: '/calendar', icon: 'calendar' },
    //{ title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //  { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Carte', url: '/map', icon: 'map' },
    { title: 'Mon entreprise', url: '/profil', icon: 'alert-circle' },
  // { title: 'Emails', url: '/emails', icon: 'person' },
  //  { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //  { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];



  public labels = ['Divers'];
  firstname: any;
  lastname: any;
  role: any;
  deeplinks: any;
  constructor(   
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private authenticationService: AuthenticationService,
    public menu: MenuController,
    private storage: Storage
  
) {
    this.initializeApp();
  }



  initializeApp() {


    this.menu.enable(false);
   // this.menu.enable(false, 'menu1');

    this.platform.ready().then(() => {
    this.OneSignalInit();
 
        
  //  this.router.navigate(['/public-posts']);     
     });

     this.router.navigate(['/login']);     

 // this.authenticationService.authState.subscribe(state => {
   // this.loginmenu=state;
   // console.log(this.loginmenu);
 //   });
  //  console.log("AuthGuard");
   // console.log( this.AuthGuard.canActivate());
 //    this.login= this.AuthGuard.canActivate()
      // this.setupDeeplinks();
      // this.splashScreen.hide();

      /*
      this.deeplinks.Router({
        '/login': LoginPage,
        '/return': ReturnPage
      }).subscribe((match: any) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
      }, (nomatch: any) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
      
*/

/*

       this.deeplinks
        .route({
          "/home": HomePage,
        })
        .subscribe(
          (match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log("Successfully matched route", match);
          },
          (nomatch) => {
            // nomatch.$link - the full link data
            console.error("Got a deeplink that didn't match", nomatch);
          }

          */


   // });
  }



   OneSignalInit(): void {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.Debug.setLogLevel(6);
    
    // Uncomment to set OneSignal visual logging to VERBOSE  
    // OneSignal.Debug.setAlertLevel(6);
  
    // NOTE: Update the init value below with your OneSignal AppId.
    OneSignal.initialize("69ac6a4a-3e9c-49d2-931c-7c6248593467");
    
    
    let myClickListener = async function(event: any) {
    let notificationData = JSON.stringify(event);



    console.log("---------ONESIGNAL-------");
    console.log(notificationData);
    };
    OneSignal.Notifications.addEventListener("click", myClickListener);




    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.Notifications.requestPermission(true).then((accepted: boolean) => {
      console.log("User accepted notifications: " + accepted);
    });

  }

  async logout() {


    const alert = await this.alertController.create({
      header: 'Déconnexion',
      subHeader: '',
      message: 'Voulez-vous vraiment déconnecter ?',
      buttons: [{
        text: 'Ok',
        cssClass: 'primary',
        handler: (blah) => {
          console.log('Confirm Ok: blah');
     
          this.authenticationService.logout();
           setTimeout(() => { 
       
           
          this.menu.enable(false);
           this.router.navigateByUrl('/login');
         }, 1000); 
        }
      },
      {
        text: 'Annuler',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
    });

    await alert.present();
  }
}
