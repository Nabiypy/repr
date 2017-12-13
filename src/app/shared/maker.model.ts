/**
 * Created by hanso on 6/28/2017.
 */

export class Post {
  id: number;
  product: string;
  account: string;
  reference: string;
  amountPaid: number;
  bug: string;
  userId?: string;

  constructor(id: number, product: string, account: string, reference: string, amountPaid: number, bug: string, userId?: string) {
    this.id = id;
    this.product = product;
    this.account = account;
    this.reference = reference;
    this.amountPaid = amountPaid;
    this.bug = bug;
    this.userId = userId;
  }
}
