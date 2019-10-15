export class Card {
  id: number;
  name: string;
  ccnumber: string;
  balance: string;
  limit: string;
  constructor(
    name: string = '',
    ccnumber: string = '',
    balance: string = '',
    limit: string = ''
  ) {
    this.name = name;
    this.ccnumber = ccnumber;
    this.balance = balance;
    this.limit = limit;
  }
}
