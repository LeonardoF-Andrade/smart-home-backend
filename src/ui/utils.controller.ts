import { Body, Controller, Put } from '@nestjs/common';
import {
  DeviceType,
  IDeviceControl,
} from 'src/interface/deviceControl.interface';

@Controller('utils')
export class UtilsController {
  constructor(private readonly deviceControl: IDeviceControl) {}

  @Put('gate/status')
  async changeGateStatus(@Body() body: { status: boolean }): Promise<void> {
    console.log('Changing gate status to:', body.status);
    await this.deviceControl.execute(DeviceType.GATE, body.status);
  }

  @Put('door/status')
  async changeDoorStatus(@Body() body: { status: boolean }): Promise<void> {
    console.log('Changing door status to:', body.status);
    await this.deviceControl.execute(DeviceType.DOOR, body.status);
  } 

  @Put('window/status')
  async changeWindowsStatus(@Body() body: { status: boolean }): Promise<void> {
    console.log('Changing windows status to:', body.status);
    await this.deviceControl.execute(DeviceType.WINDOW, body.status);
  }

  @Put('drying/status')
  async changeDryingStatus(@Body() body: { status: boolean }): Promise<void> {
    console.log('Changing drying status to:', body.status);
    await this.deviceControl.execute(DeviceType.DRYING, body.status);
  }

  @Put('alarm/status')
  async changeAlarmStatus(@Body() body: { status: boolean }): Promise<void> {
    console.log('Changing alarm status to:', body.status);
    await this.deviceControl.execute(DeviceType.ALARM, body.status);
  }
}
