import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `https://api.escuelajs.co/api/v1/users`;

  constructor(private http: HttpClient) {}

  create(dto: Partial<User>) {
    return this.http.post<User>(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }

  isAvailableByEmail(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/is-available`,
      { email }
    );
  }
}
