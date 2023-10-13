import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {
  constructor(private readonly http: HttpClient) { }

  static token = '6693522068:AAHbtWxGu4LOhTAfLAO6biOyzFV-S8roTrI'
  static chatId = '@my_organizer'

  sendM(m: string): Observable<any> {
    return this.http.post(`https://api.telegram.org/bot${TelegramService.token}/sendMessage?chat_id=${TelegramService.chatId}&text=${m}`, {})
  }
}
