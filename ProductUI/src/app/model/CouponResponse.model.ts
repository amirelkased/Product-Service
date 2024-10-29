export interface CouponResponse {
  status: string;
  message: string;
  amount: number;
}

export interface CouponRequest {
  couponCode: string;
  amount: number
}
