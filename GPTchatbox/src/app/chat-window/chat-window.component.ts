import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChatService } from '../chat.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})

export class ChatWindowComponent implements OnInit,AfterViewChecked {
  @ViewChild('scrollMe')
  private scrollBottom!: ElementRef;
  public form: any;
  public isLoading:boolean = false;
  messageInput: any;
  chatWindow: any=[];
  constructor(public formBuilder: FormBuilder, public http: HttpClient,public chatService: ChatService,) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: ['', [Validators.required]]

    });
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
   } 
   scrollToBottom(): void {
    try {
        this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch(err) { }
}
  gettime(time:any){
    if((Math.floor((Date.now()-time) / 60000))<60)
    return (Math.floor((Date.now()-time) / 60000))+" min";
    else if ((Math.floor((Date.now()-time) / 3600000))<24)
    return (Math.floor((Date.now()-time) / 3600000))+" hours";
    else return(Math.floor((Date.now()-time) / 3600000*24))+" days"
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading=true;
    this.messageInput = this.form.controls['message'].value;
    this.chatWindow.push({by:"Me",message:this.messageInput,time:Date.now()});
    this.form.reset();
    this.chatService.getResponse(this.messageInput).pipe()
      .subscribe({
        next: (result) => {
          this.chatWindow.push({by:"Friend",message:result,time:result.time});
          this.isLoading=false;
        },
        error:(error)=>{
          console.log(error);
          this.isLoading=false;
        }
      })
  }
}
