import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export class MyHotelApi {
  private client: AxiosInstance;

  private routes = {
    SUBMIT_BOOKING: "",
  };

  private handleRequest = async (request: Promise<AxiosResponse<any>>) =>
    request.then(this.handleResult).catch(this.handleError);

  private handleError(err: AxiosError) {
    if (err.response) {
      const status = err.response.status;
      // @ts-ignore
      const errorMessage = err.response.data.message || 'Unknown error';

      if (status >= 400 && status < 500) {
        console.warn('Client error:', errorMessage);
      } else if (status >= 500 && status < 600) {
        console.error('Server error:', errorMessage);
      }
    } else {
      console.error('Network error:', err.message);
    }
    throw err;
  }

  private handleResult(res: AxiosResponse) {
    return res.data;
  }

  constructor() {
    this.client = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com/posts',
    });
  }

  public submitBooking = async (bookingData: any) => {
    // TODO: before uploading data - convert the date time from local to UTC.
    try {
      const response = await this.handleRequest(
        this.client.post(this.routes.SUBMIT_BOOKING, bookingData)
      );
      return response;
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error;
    }
  }
}
