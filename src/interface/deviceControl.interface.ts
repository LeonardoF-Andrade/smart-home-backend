export enum DeviceType {
  GATE = 'gate',
  DOOR = 'door',
  WINDOW = 'window',
  DRYING = 'drying',
  ALARM = 'alarm',
}

export abstract class IDeviceControl {
  abstract execute(deviceType: DeviceType, status: boolean): Promise<void>;
}
