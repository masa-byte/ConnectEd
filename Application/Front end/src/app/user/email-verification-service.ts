import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class EmailVerificationService {
  private apiKey = '424e295cb5a74c308466379565368d23';
  //private apiKey ='749c669d31ee47a094762ed3e204c740';
  constructor() {}

  verifyEmail(email: string): Promise<boolean> {
    const url = `https://api.zerobounce.net/v2/validate?api_key=${
      this.apiKey
    }&email=${encodeURIComponent(email)}`;

    return axios
      .get(url)
      .then((response) => {
        const { status } = response.data;

        if (status === 'valid' || status === 'catch-all') {
          return true; // Email is valid or a catch-all address
        }

        return false; // Email is invalid
      })
      .catch(() => {
        return false; // Error occurred during the verification process
      });
  }
}
