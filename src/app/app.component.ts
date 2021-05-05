import { Component } from '@angular/core';
import { ImgService } from './img.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  { 
  constructor(private service: ImgService) { }
  private video: any;
  // Springから返ってくる笑顔の判定メッセージを格納
  result: String = ""; 

  //撮影フォーム設定
  ngOnInit(): void {
    this.video = document.querySelector('video')!;

    const options = {
      video: true
    }
    navigator.mediaDevices.getUserMedia(options)
    .then(stream => {
      this.video.srcObject = stream;
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  //撮影ボタン押下時の処理
  captureImg(){
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    context?.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    let base64CapturedImg : ConstrainDOMString = canvas.toDataURL("image/png");
    this.service.transferImg(base64CapturedImg).subscribe(
      data => this.result = data,
      error => console.log(error)
    );
  ;
  }
}
