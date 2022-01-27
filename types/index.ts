interface IHabitus {
  id: string;
  name: string;
  text: string;
  characteristics: ICharacteristic[];
  genera: number[];
}

interface ICharacteristic {
  name: string;
  value: string;
  special: boolean;
}

interface IGenus {
  id: number;
  name: string;
}

interface IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
}

interface IAnswer {
  text: string;
  next: number | string;
}

interface IPage {
  name: string;
}

interface INotification {
  title: string;
  message: string;
  status: string;
}

export type { IHabitus, IAnswer, IQuestion, IPage, ICharacteristic, IGenus, INotification };
