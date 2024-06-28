


import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController, AlertController, MenuController, LoadingController, NavParams, ToastController, InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-ateliers',
  templateUrl: './ateliers.page.html',
  styleUrls: ['./ateliers.page.scss'],
})
export class AteliersPage implements OnInit {

  @ViewChild(IonModal)
  modal!: IonModal;

  table: string="GetAllAtelierBySession";

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
  category:any="2";
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
  session_id:any;
  label2: any;


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
    private localStore: LocalService ) {
    this.page=1;
  }
  ngOnInit() {
 

  }

  ionViewWillEnter(){

      this.session_id= this.localStore.getItem('session_id');
 console.log( this.session_id);


      this.getData();
    
    

  }




  async getData(){
        this.page=1;
        this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
         console.log(data); 
          this.posts=data.appointements;
          console.log(this.posts);
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
        })
  }  
  
  
  next(event: any ) {
     if (this.currentpage<this.last_page){
     this.page = this.page +1 ;
     this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
        let postspush = data.appointements;
        for (let post of postspush) {
          this.posts.push(post);
        }
        this.total=data.total;
        this.per_page=data.per_page;
        this.currentpage=data.current_page;    
        this.last_page=data.last_page; 
       
      }) 
      event.target.complete();  
    }  else    {
      event.target.complete();  
    }
  }
  

  async  doInfinite(event:any) {
    this.next(event);
  }

  handleChange(event:any) {
   const query = event.target.value.toLowerCase();
   this.filter = query
   this.filter=event.target.value;
   this.page=1;

   setTimeout(() => { 
     this.getDataFilter();
    }, 1000);
  }
  async getDataFilter(){ 
        this.page=1;
        this.redditService.getDataBygroupBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
          this.posts=data.appointements;
          this.total=data.total;
          this.per_page=data.per_page;
          this.currentpage=data.current_page;    
          this.last_page=data.last_page;   
        })
  }  
  
  async onChangeWord(event:any){
    this.filter=event.target.value;
    this.page=1;

    setTimeout(() => { 
      this.getDataFilter();
     }, 1000);
}
        
  onCancelword(selectedValue: any) {
       this.filter=="";
  }
            
reset(){
      this.filter="";
      this.page=1;
      this.per_page=20;
      this.getData();
}

cancel() {
  this.modal.dismiss(null, 'cancel');
}
onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
}

doSave(){

  var data = JSON.stringify({ 
    title: this.title,
      content: this.content,
      url: this.url,
      image: this.image,
      price:this.price,
      age_min:this.age_min,
      age_max:this.age_max,
      autorisation_parentale:this.autorisation_parentale,
      nb_places:this.nb_places,
      nb_free:this.nb_free,
      intervenant:this.intervenant
  });

  this.redditService.addPost(this.table, data)  
  .subscribe((response) => {
    console.log(response); 
    this.modal.dismiss();
      setTimeout(() => { 
      this.router.navigateByUrl('/products/');
     }, 400); 
  })
  }


prev() {
    if  (this.page>1){
    this.page = this.page -1;
    this.getData();}}


forward(){
    if  (this.currentpage<this.last_page){
    this.page = this.last_page
   this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
      console.log(data);
      this.posts=data.data;
      this.total=data.total;
      this.per_page=data.per_page;
      this.currentpage=data.current_page;    
      this.last_page=data.last_page;   
    })
}}

backward() {
  if  (this.currentpage>1){
  this.page=1;
  this.getData();}
}

async post(event: any, item: any) {
this.router.navigateByUrl('/atelier-detail/' + item.id);
}



 }
  
  