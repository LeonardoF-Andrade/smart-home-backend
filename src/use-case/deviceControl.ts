import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  DeviceType,
  IDeviceControl,
} from 'src/interface/deviceControl.interface';
import { espIP } from 'src/main';

@Injectable()
export class DeviceControlUseCase implements IDeviceControl {
  private readonly deviceEndpoints = {
    [DeviceType.GATE]: {
      open: '/opengate',
      close: '/closegate',
    },
    [DeviceType.DOOR]: {
      open: '/opendoor',
      close: '/closedoor',
    },
    [DeviceType.WINDOW]: {
      open: '/openwindows',
      close: '/closewindows',
    },
    [DeviceType.DRYING]: {
      open: '/opendrying',
      close: '/closedrying',
    },
    [DeviceType.ALARM]: {
      open: '/onalarm',
      close: '/offalarm',
    },
  };

  async execute(deviceType: DeviceType, status: boolean): Promise<void> {
    const deviceConfig = this.deviceEndpoints[deviceType];

    if (!deviceConfig) {
      throw new Error(`Unsupported device type: ${deviceType}`);
    }

    console.log(`Changing ${deviceType} status to:`, status);
    const endpoint = status ? deviceConfig.open : deviceConfig.close;

    try {
      await axios.post(
        `${espIP}${endpoint}`,
        {},
        {
          headers: {
            Connection: 'close',
          },
        },
      );

      console.log(
        `Successfully changed ${deviceType} status to ${status ? 'open/on' : 'closed/off'}`,
      );
    } catch (error) {
      console.error(`Failed to change ${deviceType} status:`, error);
      throw new Error(`Failed to control ${deviceType}: ${error}`);
    }
  }
}
