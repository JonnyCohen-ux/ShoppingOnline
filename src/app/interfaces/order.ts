export interface Order {
  user_identify: number;
  cart_identify: number;
  final_price: number;
  shipping_city: string;
  shipping_street: string;
  shipping_date: string;
  payment: number;
}
