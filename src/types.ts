export interface Patient {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: string;
  age: number;
  address: string;
  medicines: string[];
}

export interface Purchase {
  _id: string;
  pid: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthday: string;
  age: number;
  address: string;
  medicines: string[];
  createdAt: string;
}
