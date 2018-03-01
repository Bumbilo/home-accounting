export class WFMEvent {
  constructor(public type: string,
              public date: string,
              public amount: number,
              public category: string,
              public description: string,
              public id?: string) {

  }
}
