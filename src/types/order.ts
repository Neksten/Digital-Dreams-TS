export interface IOrder {
  user: {
	userName: string,
	userSurname: string,
	userPhone: string,
	userEmail: string,
  };
  creditCard: {
	cardHolder: string,
	cardNumber: string,
	cardCvv: string,
	cardMonth: string,
	cardYear: string,
  };
}