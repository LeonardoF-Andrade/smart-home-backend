import { Module } from '@nestjs/common';
import { IluminacaoController } from './iluminação/iluminação.controller';
import { IDeviceControl } from './interface/deviceControl.interface';
import { ITurnOnLight } from './interface/turnOnall.interface';
import { turnOnLight } from './use-case/turnOnAll';
import { DeviceControlUseCase } from './use-case/deviceControl';
import { UtilsController } from './ui/utils.controller';

const turnOnAllProvider = {
  provide: ITurnOnLight,
  useClass: turnOnLight,
};

const DeviceControlProvider = {
  provide: IDeviceControl,
  useClass: DeviceControlUseCase,
};

@Module({
  imports: [],
  controllers: [IluminacaoController, UtilsController],
  providers: [turnOnAllProvider, DeviceControlProvider],
})
export class AppModule {}
