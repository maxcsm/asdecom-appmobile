import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedditService } from 'src/providers/reddit-service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LocalService } from 'src/providers/local.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  table: string="questions/questions_survey";
  userid: any;
  getValue: any;
  id: any;
  page: number = 0;
  post: any;
  questions:any;
  datareponse: any = [];
  title: any;
  question_label: any;
  q_prop1: any;
  q_prop2: any;
  options: any;
  indextest: number = 0;
  goodanswer: number = 0;
  nbquestionbytest: number=0;
  q_prop3: any;
  q_prop4: any;
  q_prop5: any;
  q_prop6: any;
  progress: any;
  resp: any;
  firstname: any;
  lastname: any;
  email: any;
  checked: any;
  datarep: any = [];
  nbchecked: any;
  dataq: any;
  options2!: { id: any; question: any; isChecked: boolean; resp: string; }[];
  iduser: any;


  constructor(
    private route: ActivatedRoute, 
    public router: Router, 
    public redditService: RedditService,
    public alertController: AlertController, 
    public storage: Storage,
    private localStore: LocalService,
    public LoadingController: LoadingController
  ) {

  }

  async ngOnInit() {

    const loader = await this.LoadingController.create({
      message: 'Chargement',
      });
      loader.present();
      this.getValue = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.title = params['title'];
      });

      this.iduser = this.localStore.getItem('iduser');
      this.redditService.getByid(this.table, this.id).subscribe(data=>{
      console.log(data); 
      this.questions = data;
      this.nbquestionbytest=data.length;
      // for (let i = 0; i < data.length; i++) {
      //  this.nbquestionbytest = this.nbquestionbytest+1;
        /*
        this.question_label = this.questions[i].question;
        this.q_prop1 = this.questions[i].answer1;
        this.q_prop2 = this.questions[i].answer2;
        this.q_prop3 = this.questions[i].answer3;
        this.q_prop4 = this.questions[i].answer4;
        this.q_prop5 = this.questions[i].answer5;
        this.q_prop6 = this.questions[i].answer6;
        */
      // this.options2 = [{ id: this.questions[i].id, question: this.question_label, isChecked: false, resp: "" }];
      //  this.datareponse.push(this.options2);
      //  this.options = { rep1: this.q_prop1, rep2: this.q_prop2, rep3: this.q_prop3, rep4: this.q_prop4, rep5: this.q_prop5, rep6: this.q_prop6 };
      //  this.datarep.push(this.options);
      //  }
    });

    this.progress = (this.indextest) / this.nbquestionbytest;

    setTimeout(() => {
      loader.dismiss();
      }, 2000);
    setTimeout(() => {
    this.retrieveQuestions(0);
    }, 2000);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Merci !',
      message: 'Merci de répondre attentivement à l&#146;ensemble des questions.',
      buttons: ['OK']
    });
    await alert.present();
  }


  async presentAlertEnd() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Merci !',
      message: 'Merci d&#146;avoir répondu aux questions.',
      buttons: ['OK']
    });
    await alert.present();
  }


  back() {
    if (0 < this.indextest) {
      this.indextest = this.indextest - 1;
      this.retrieveQuestions(this.indextest);
    } else {
    }
  }


  next() {

    console.log(this.resp); 
    if(this.resp==this.q_prop5){
      console.log("VRAI"); 
      this.goodanswer=this.goodanswer+1;
    }
    if (this.indextest+1 < this.nbquestionbytest ) {
      this.indextest = this.indextest + 1;
      this.retrieveQuestions(this.indextest);
    } else {
      this.submit();
      setTimeout(async () => {    
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Merci !',
          message: 'Merci d&#146;avoir répondu aux questions. Vous avez '+this.goodanswer+' réponse(s) juste(s)',
          buttons: ['OK']
        });
        await alert.present();
      }, 2000);
    }
   
  }


  onChange(event: any) { 
    console.log(event.detail.value);
    this.resp=event.detail.value;
  }


  retrieveQuestions(indextest: number) {
    this.resp = 0;
    this.question_label = this.questions[this.indextest].question;
    this.q_prop1 = this.questions[this.indextest].answer1;
    this.q_prop2 = this.questions[this.indextest].answer2;
    this.q_prop3 = this.questions[this.indextest].answer3;
    this.q_prop4 = this.questions[this.indextest].answer4;
    this.q_prop5 = this.questions[this.indextest].answer5;
    this.q_prop6 = this.questions[this.indextest].answer6;
    this.progress = this.indextest / (this.nbquestionbytest - 1);
    console.log(this.progress);
  }


  async submit() {
    var data = JSON.stringify({
      idsurvey: this.id,
      goodanswer: this.goodanswer,
      nbquestionbytest: this.nbquestionbytest,
      userid:this.iduser
    });
    console.log(data);

    this.redditService.addPost("saveanswer",data)
    .subscribe((response) => {
     console.log(response);
    setTimeout(() => { 
     
      this.router.navigateByUrl('/surveys');

      }, 3000); 
  },(error: any) => {console.log(error);});


  }


}
