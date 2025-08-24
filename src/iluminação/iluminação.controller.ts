import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import axios from 'axios';
import { IStatusDto } from 'src/dto/status-dto.interface';
import { lightsEnum } from 'src/enum/lights.enum.interface';
import { ITurnOnLight } from 'src/interface/turnOnall.interface';
import { espIP } from 'src/main';

@Controller('iluminacao')
export class IluminacaoController {
  constructor(private readonly turnOnLight: ITurnOnLight) {}

  @Post(':id')
  async turnOnRoom(@Param() params: { id: lightsEnum }) {
    return await this.turnOnLight.execute(lightsEnum[params.id]);
  }

  @Get('status')
  async getStatus(): Promise<IStatusDto> {
    const response = await axios.get<IStatusDto>(`${espIP}/status`);
    return response.data;
  }

  @Post('offAll')
  async turnOffAll() {
    await this.turnOnLight.execute(lightsEnum.offall);
  }

  @Post('onAll')
  async turnOnAll() {
    await this.turnOnLight.execute(lightsEnum.onall);
  }

  @Get('socorro')
  async sos() {
    await axios
      .post(`${espIP}/sos`, {
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
  }
}
