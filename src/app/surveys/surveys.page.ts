import { Component, OnInit } from '@angular/core';
import { RedditService } from 'src/providers/reddit-service';
import { Router } from '@angular/router';
import { LocalService } from 'src/providers/local.service';



@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {

  posts: any = [];
  page: any;
  currentpage: any;
  table: string = "surveysUserByid";
  category: number = 0;
  filter: any = "";
  total: number = 0;
  last_page: number = 0;
  per_page: number = 10;
  order_id: any = "id";
  order_by: any = "asc";
  status: number = 0;
  id: number | undefined;
  newcolor: any;
  option: any = [];
  session_id: any;
  classements: any;
  per_page2: number = 3;
  currentpage2: any;
  last_page2: number = 10;
  total2: number = 0;
  page2: any;
  iduser: any;
  UrlImage: string="";
  posts2: any;
  title: any;
  ///[ngStyle]="{'background-color': item.color }"



  constructor(
    public redditService: RedditService, 
    private router: Router,
    private localStore: LocalService ) { }


    ngOnInit() {
      this.UrlImage=this.redditService.getUrlImage();
      this.session_id = this.localStore.getItem('session_id');
      this.iduser = this.localStore.getItem('iduser');
  
    }

  ionViewWillEnter(){
    this.getDataClassement();
    this.page = 1;
    this.redditService.getByid(this.table, this.iduser).subscribe(data=>{
    console.log(data);
    this.posts=data.surveys1;
    console.log(this.posts);






    })
  }



  async view(event: any, item: any) {

   
     
    console.log(item.id);
    console.log(item.title);
    this.router.navigate(['questions', { id: item.id, title:item.title }]);
  



  
  }



  async getDataClassement(){
    //  this.simpleLoader();
        this.page2=1;
        this.redditService.getDataBygroupBypage(this.page,"usersPoints",this.per_page2,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
         
         
          this.classements=data.data;
          console.log(this.classements);
          this.total2=data.total;
          this.per_page2=data.per_page;
          this.currentpage2=data.current_page;    
          this.last_page2=data.last_page;   
        })
  }  
  

  next2() {
     if (this.currentpage2<this.last_page2){
     this.page2 = this.page2 +1 ;
      this.redditService.getDataBygroupBypage(this.page2,"usersPoints",this.per_page2,this.order_id,this.order_by,this.category,this.session_id, this.status,this.filter).subscribe(data => {
        let postspush = data.data;
        for (let post of postspush) {
          this.classements.push(post);
        }
        this.total2=data.total;
        this.per_page2=data.per_page;
        this.currentpage2=data.current_page;    
        this.last_page2=data.last_page; 
       
      }) 
    }
  }
  


  getRandomColor() {
    var color = "#";
    var part = Math.round(Math.random() * 255).toString(16);
    color += "0" + part;
    return color;
  }


  getcolor(data: string | any[]) {
    for (let i = 0; i < data.length; i++) {
      console.log(data);
      this.newcolor = this.getRandomColor();
      this.option = { id: data[i].id, color: this.newcolor, title: data[i].title, subtitle: data[i].subtitle, content: data[i].content };
      this.posts.push(this.option);
    }

  }



}
