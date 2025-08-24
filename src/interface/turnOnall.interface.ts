export abstract class ITurnOnLight {
  abstract execute(room: string): Promise<void>;
}
