import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  constructor(private http: HttpClient) { }

  private destinationUrl = 'http://localhost:8080';


  transferImg(base64CapturedImg: String): Observable<any> {
    return this.http.post(this.destinationUrl, base64CapturedImg,{
      headers: {
        "Content-Type": "text/plain; charset=UTF-8",
        //CORS対策
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*"
      },
      //jsonではなく文字列で結果が欲しいので追記(なくても落ちはしないが余分なエラーメッセージ出る)
      'responseType': 'text'
    })
  }
}
