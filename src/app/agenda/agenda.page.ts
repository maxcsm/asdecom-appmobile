import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal, Platform } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {format} from "date-fns";
import { LocalService } from 'src/providers/local.service';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  table: string="GetAgendaByUser";

  id: any;
  pages: any;
  items: any;
  posts: any;
  page:number;

  title: string="";
  content: string="";
  price: any;
  age_max!: number;
  age_min!: number;
  autorisation_parentale: any;
  intervenant: any;
  nb_free: any;
  nb_places: any;
  status:any="";
  category:any;
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="asc";
  currentpage!: number;
  formgroup!: FormGroup;
  validations_form!: FormGroup;
  image: any;
  url: any;
  session_id: any=100;
  alldate:any= [];
  resultData: any;
  testdate: Date= new Date();
  iduser: any="";
  postsrecap: any;
  label1: any;
  label2: any;
  label3: any;
  label4: any;
  label5: any;
  label6: any;
  label7: any;
  label8: any;
  label9: any;
  label10: any;
  label: any;


  constructor
  ( public navCtrl: NavController, 
    private formBuilder: FormBuilder, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController, 
    public menu: MenuController,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private localStore: LocalService,
    private element: ElementRef, 
    private platform: Platform ) {
    this.page=1;
  }
  ngOnInit() {
    this.session_id = this.localStore.getItem('session_id');
    this.category = this.localStore.getItem('category');
    this.iduser = this.localStore.getItem('iduser');
  }

  ionViewWillEnter(){
    this.getData();
    this.getdatauser(); 
   // this.getDataRecap();
  }


  async getData(){

   console.log(this.getDayName(this.testdate ))
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;

        console.log(this.session_id); 
        this.redditService.getAgendaBygroupBypage(this.page,"GetAgendaByUser",this.per_page,this.order_id,this.order_by,this.category,this.session_id,this.iduser,this.status,this.filter).subscribe(data => {
        console.log(data);
        loading.dismiss();
        let result = data.appointements.reduce((acc: { date: any;name: any;month: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
            let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
            if (item) {
              item.events.push(curr);
            } else {
              acc.push({
                "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
                "name":this.getDayName(new Date(curr.start_at)),
                "month":this.getMonthName(new Date(curr.start_at)),
                "day":format(new Date(curr.start_at), "dd"),
                "events": [curr]
              });
            }
            return acc;
          }, []);
          this.posts=result;  
          console.log(this.posts); 
        })
  }  
  
  


  async getDataRecap(){
    this.page=1;
    this.redditService.getAgendaBygroupBypage(this.page,"GetAgendaByUserRecap",this.per_page,this.order_id,this.order_by,this.category,this.session_id,this.iduser,this.status,this.filter).subscribe(data => {
    console.log(data);
  
    let result = data.appointements.reduce((acc: { date: any;name: any;month: any;year: any;day: any; events: any[]; }[], curr: { start_at: any }) => {
        let item = acc.find(item => item.date === format(new Date(curr.start_at), "dd-MM-yyyy"));
        if (item) {
          console.log(curr); 
          item.events.push(curr);
        } else {
          acc.push({
            "date":format(new Date(curr.start_at), "dd-MM-yyyy"),
            "name":this.getDayName(new Date(curr.start_at)),
            "month":this.getMonthName(new Date(curr.start_at)),
            "year":this.getYearName(new Date(curr.start_at)),
            "day":format(new Date(curr.start_at), "dd"),
            "events": [curr]
          });
        }
        return acc;
      }, []);
      this.postsrecap=result;  
    console.log(   this.postsrecap); 
    })
  }  



  async getdatauser() {
    this.redditService.getByid("users", this.iduser).subscribe(data=>{
      console.log(data); 
        this.label1= data[0].label1;
        this.label2 = data[0].label2;
        this.label3 = data[0].label3;
        this.label4= data[0].label4;
        this.label5 = data[0].label5;
        this.label6 = data[0].label6;
        this.label7= data[0].label7;
        this.label8 = data[0].label8;
        this.label9 = data[0].label9;
        this.label10 = data[0].label10;
      })
  }
  



async edit(event: any, item2: any) {
  console.log(item2);
this.router.navigateByUrl('/atelier-detail/' + item2.atelier_id);
}


async edit2(event: any, item2: any) {
this.router.navigateByUrl('/post/'+item2.atelier_id);
}

async change(event: any, item2: any) {
    var data = {
       user_id:this.iduser,
       appointement_id:item2.id,
       idfk:item2.idfk,
       value:event.target.checked
     }
    this.redditService.addPost("addcheckappoint",data) 
    .toPromise()
    .then((response) =>
    {  
      
    setTimeout(async () => { 
if(event.target.checked==false){
  const toast = await this.toastCtrl.create({
    cssClass: 'success',
    message: 'Vous avez supprimé votre présence ',
    duration: 3000,
    position: 'bottom',

  });
  toast.present();

} else if(event.target.checked==true){
  const toast = await this.toastCtrl.create({
    cssClass: 'success',
    message: 'Vous avez validé votre présence ',
    duration: 3000,
    position: 'bottom',
  });
  toast.present();
  };
  }, 100);  
  })
}

getDayName(date: Date): string {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  // Renvoie le nom complet du jour en utilisant toLocaleDateString
  return date.toLocaleDateString(undefined, options);
}


getMonthName(date: Date): string {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = { month: 'long' };
  // Renvoie le nom complet du mois en utilisant toLocaleDateString
  return date.toLocaleDateString(undefined, options);
}


getYearName(date: Date): string {
  // Options pour formater la date
  const options: Intl.DateTimeFormatOptions = { year: 'numeric' };
  // Renvoie le nom complet du mois en utilisant toLocaleDateString
  return date.toLocaleDateString(undefined, options);
 }
 
 scrollToTop() {
  const content = this.element.nativeElement.closest('ion-content');
    content.scrollToTop(300); // You can adjust the duration (in milliseconds) as needed
    window.scrollTo(0, 0); // For non-mobile platforms
  
}



async change1() {
 // this.updatedata(); 
setTimeout(() => { 
  this.updatedata(); 
  }, 400); 

}

async change2() {
  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}

async change3() {
  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}

async change4() {

  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}

       
async change5() {

  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}


async change7() {
  if(this.label7==1){
    this.label8=0;
  }
  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}

async change8() {
  if(this.label8==1){
    this.label7=0;
  }
  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}

async change9() {

  if(this.label9==1){
    this.label10=0;
  }
  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}
async change10() {

  if(this.label10==1){
    this.label9=0;
  }
  setTimeout(() => { 
  this.updatedata(); 
  }, 400); 
}






async getPresent() {
  this.redditService.getByid("users", this.iduser).subscribe(data=>{

      this.label1=data[0].label1;
      this.label2=data[0].label2;
      this.label3=data[0].label3;
      this.label4=data[0].label4;
      this.label5=data[0].label5;
      this.label6=data[0].label6;
      this.label7=data[0].label7;
      this.label8=data[0].label8;
      this.label9=data[0].label9;
      this.label10=data[0].label10;

   

    })
 }



async updatedata() {

  var data = {
    label1:this.label1,
    label2:this.label2,
    label3:this.label3,
    label4:this.label4,
    label5:this.label5,
    label6:this.label6,
    label7:this.label7,
    label8:this.label8,
    label9:this.label9,
    label10:this.label10
  }

  console.log(data); 
  this.redditService.update("users",this.iduser,data) 
.toPromise()
.then(async (response) =>
{
 console.log(response);
  this.getPresent();
})

}

}
  
  
