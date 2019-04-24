export class Ingredient {

  // Instead of adding the properties name and amount and pass the
  // external values through the constructor to them, angular offers
  // a short cut that is declare public into the parameters of the
  // constructor. The effect is the same as:
  //  public name: string;
  //  public amount: string;
  //  constructor(name: string, amount: number){
  //    this.name = name;
  //    this.amount = amount;
  //  }
  constructor(public name: string, public amount: number) {

  }
}
