export class WFMEvent {
  constructor(public type: string,
              public date: string,
              public amount: number,
              public category: number,
              public description: string,
              public id?: string) {

  }
}
