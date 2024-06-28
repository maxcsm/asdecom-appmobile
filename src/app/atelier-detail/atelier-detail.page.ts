import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal, ModalController } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalNotePage } from '../modal-note/modal-note.page';
import { LocalService } from 'src/providers/local.service';
import { ModalNoteAtelierPage } from '../modal-note-atelier/modal-note-atelier.page';


@Component({
  selector: 'app-atelier-detail',
  templateUrl: './atelier-detail.page.html',
  styleUrls: ['./atelier-detail.page.scss'],
})
export class AtelierDetailPage implements OnInit {


  @ViewChild(IonModal)
  modal!: IonModal;

  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;
  table: string="GetAtelierWithNote";
  file: any;
  products: any;
  iduser: any;
  idproduct: any;
  idatelier: any;
  notationatelier: any;
  suppliers: any;
  label2: any;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private localStore: LocalService,
    private loadingCtrl: LoadingController) {

   }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.idatelier= params['id']; 
     });
   }

   ionViewWillEnter(){
    this.iduser = this.localStore.getItem('iduser');
    this.label2 = this.localStore.getItem('label2');
    this.getdata(); 
   }


   async getdata() {
    this.redditService.getAtelierWithNote(this.table, this.iduser, this.idatelier).subscribe(data=>{

      console.log(data); 
        this.posts = [data.appointement];
        this.products = [data.products][0];
        this.notationatelier = [data.notationatelier][0];
        this.suppliers = [data.suppliers][0];
      })
   }

     async  doSave() {
     var data = {
      id:this.id,
      title: this.title,
      content: this.content,
      price: this.price,
      url: this.url,
      image: this.image
    }
      console.log(data); 
      this.redditService.update(this.table,this.id,data) 
      .toPromise()
      .then((response) =>
      {
      console.log(response);
      setTimeout(() => { 
      this.getdata();
      this.router.navigateByUrl('/products'); 
      }, 600); 
           
      })}
          
    
      cancel() {
        this.modalCtrl.dismiss(null, 'cancel');
      }
      
      onWillDismiss(event: Event) {
        const ev = event as CustomEvent<OverlayEventDetail<string>>;
      
      }
      
      async openModal($event: any, item: any) {
        this.idproduct=item.id;
        console.log(this.idproduct);
        if(this.label2==0){
          const toast = await this.toastCtrl.create({
            cssClass: 'bg-profile',
            color:'primary',
            message: 'Vous ne pouvez pas ajouter de notation pour le moment.',
            duration: 3000,
            position: 'bottom',
        
          });
          toast.present();
        }else {
       
        const modal = await this.modalCtrl.create({
          component: ModalNotePage,
          //componentProps: {
          // "paramID": 255225,
          // }
        });
        modal.onDidDismiss().then(async (dataReturned) => {
          if (dataReturned !== null) {
          //this.imgsign = dataReturned.data;

         
          var data = JSON.stringify({ 
              idproduct:this.idproduct,
              iduser:this.iduser,
              note: dataReturned.data[0].postData.note,
              comment:dataReturned.data[0].postData.commentaire
          });

          console.log(data);

          const loading = await this.loadingCtrl.create({
            message: 'Enregistrement..',
            spinner: 'bubbles',
          });

          this.redditService.addPost("productnotation", data)  
          .subscribe((response) => {
            console.log(response); 
            loading.dismiss();
              setTimeout(() => { 
               this.getdata();
             }, 400); 
          })
          }
        });
        return await modal.present();
      }
      
     }  


      
     async openModalNoteAtelier() {
      if(this.label2==0){
        const toast = await this.toastCtrl.create({
          cssClass: 'bg-profile',
          color:'primary',
          message: 'Vous ne pouvez pas ajouter de notation pour le moment.',
          duration: 3000,
          position: 'bottom',
      
        });
        toast.present();
      }else {

        const modal = await this.modalCtrl.create({
          component: ModalNoteAtelierPage,
       // componentProps: {
        //   "paramID": 255225,
        //  }
        });
        modal.onDidDismiss().then((dataReturned) => {
          if (dataReturned !== null) {
          //  this.imgsign = dataReturned.data;
          var data = JSON.stringify({ 
              
              idatelier:this.idatelier,
              iduser:this.iduser,
              note_info: dataReturned.data[0].postData.note_info,
              note_presentation: dataReturned.data[0].postData.note_presentation,
              comment:dataReturned.data[0].postData.commentaire
          });
          this.redditService.addPost("ateliernotation", data)  
          .subscribe((response) => {
            console.log(response); 
     
              setTimeout(() => { 
               this.getdata();
             }, 400); 
          })
          }
        });
        return await modal.present();
      }
      
    }  

    async closeModal() {
      await this.modalCtrl.dismiss(undefined, "close")
    }


}