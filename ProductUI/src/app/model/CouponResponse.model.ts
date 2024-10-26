export interface CouponResponse {
  status: string;
  message: string;
  amount: number;
}

export interface CouponRequest {
  coupon: string;
  amount: number
}
