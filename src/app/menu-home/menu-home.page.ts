import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalService } from 'src/providers/local.service';




@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.page.html',
  styleUrls: ['./menu-home.page.scss'],
})
export class MenuHomePage  {
  posts: any;
  table: string="public_posts";
  category:any="news";
  pages: any;
  items: any;
  page:number | undefined;
  status:any=1;
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=20;
  order_id:any="id";
  order_by:any="desc";
  content: any;
  title: any;
  session_id: any;
  UrlImage: string="";
  subtitle: any;
  newstotal: any=0;


  constructor( 
  public redditService:RedditService,  
  public LoadingController: LoadingController,
  private localStore: LocalService) { }


  ngOnInit() {
    this.UrlImage=this.redditService.getUrlImage();
    this.getDataPages();

   
  }


  ionViewWillEnter(){

    this.session_id = this.localStore.getItem('session_id');
    this.getDataNews();
    this.getSessionData();
 
  }

  async getSessionData() {
    this.redditService.getByid("sessions", this.session_id ).subscribe(data=>{
        this.posts = [data];
        this.title = this.posts[0].title;
        this.subtitle = this.posts[0].subtitle;
        this.content = this.posts[0].content;
      })
    }


  async getDataNews(){
    const loading = await this.LoadingController.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
        this.redditService.getDataBypage(this.page,this.table,this.per_page,this.order_id,this.order_by,this.category,this.status,this.filter).subscribe(data => {
        loading.dismiss();
          this.posts=data.data;
          this.newstotal=data.total;
        })
  }  
  
  async getDataPages(){
        this.page=1;
        this.redditService.getDataBypage("posts",this.table,this.per_page,this.order_id,this.order_by,"page",this.status,this.filter).subscribe(data => {
          this.pages=data.data;
          console.log( this.pages);
        })
  }  
  





}
