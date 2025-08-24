import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ITurnOnLight } from 'src/interface/turnOnall.interface';
import { espIP } from 'src/main';

@Injectable()
export class turnOnLight implements ITurnOnLight {
  async execute(room: string): Promise<void> {
    await axios
      .get(`${espIP}/${room}`, {
        headers: {
          Connection: 'close',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        return Promise;
      });

    return;
  }
}
