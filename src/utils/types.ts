export interface ProductType {
  id: number;
  name: string;
  priceNet: number;
  priceTaxPercentage: number;
  chargeMethod: string;
  image: string
}

export interface RoomType {
  id: number;
  name: string;
  pricePerNightNet: number;
  priceTaxPercentage: number;
  image: string
}

export interface Booking {
  id: number;
  roomId: number;
  startDateUtc: string;
  endDateUtc: string;
}

export interface Property {
  id: number;
  name: string;
  timezone: string;
  startTimesLocal: string[];
  endTimesLocal: string[];
}

export interface SelectedRoom {
  id: number;
  image: string;
  name: string;
  pricePerNight: number;
  priceTaxPercentage: number;
  discountedPrice: number;
  numberOfNights: number;
  totalPrice: number;
}

export interface SelectedProduct {
  id: number;
  image: string;
  name: string;
  priceNet: number;
  priceTaxPercentage: number;
  numberOfNights: number;
  totalPrice: number;
  chargeMethod: string;
}

export interface BookingData {
  utcCheckInDateTime: string;
  utcCheckOutDateTime: string;
  room: SelectedRoom;
  products: SelectedProduct[];
}