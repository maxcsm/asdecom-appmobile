import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, LoadingController, PopoverController, AlertController, ToastController, IonModal } from '@ionic/angular';
import { RedditService } from 'src/providers/reddit-service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-mentions-legales',
  templateUrl: './mentions-legales.page.html',
  styleUrls: ['./mentions-legales.page.scss'],
})
export class MentionsLegalesPage implements OnInit {
  posts: any;
  title: any;
  price: any;
  content: any;
  url: any;
  image: any;
  id: any;

  file: any;
  gallery: any;
  idgallery: any;

  public editorValue: string = '';


  UrlBase: string="";
  UrlImage: string="";
  subtitle: any;
  view: any;
 
  table: string="posts";
  category:any="page";
  pages: any;
  items: any;
  status:any="";
  filter:string="";
  wordid: any="";
  total:number=0;
  last_page:number=0;
  per_page:number=6;
  order_id:any="id";
  order_by:any="asc";
  currentpage!: number;
  page!: number;

  constructor(
    public navCtrl: NavController, 
    public popoverCtrl: PopoverController,
    public alertController: AlertController,
    private route: ActivatedRoute,
    public loadingController:LoadingController,  
    public redditService:RedditService, 
    private router: Router,  
    public toastCtrl: ToastController,
    public sanitizer: DomSanitizer,
    private loadingCtrl: LoadingController) {

   }

  ngOnInit() {
      this.getData(); 
      this.UrlImage=this.redditService.getUrlImage();
   }

   async getData(){
    //  this.simpleLoader();
    const loading = await this.loadingCtrl.create({
      message: 'Chargement..',
      spinner: 'bubbles',
    });
    await loading.present();
        this.page=1;
          this.redditService.getByid("posts", 1).subscribe(data=>{
              loading.dismiss();
              this.posts = [data];
              this.title = this.posts[0].title;
              this.subtitle = this.posts[0].subtitle;
              this.content = this.transform(this.posts[0].content);
              this.image = this.posts[0].image;
            })    
  }  



  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
 
}