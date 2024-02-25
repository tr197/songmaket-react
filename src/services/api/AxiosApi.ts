import axios, { AxiosInstance } from 'axios';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

class AxiosApi {
  private static staticObject: AxiosApi;
  public instance: AxiosInstance;

  private constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): AxiosApi {
    if (!AxiosApi.staticObject) {
      AxiosApi.staticObject = new AxiosApi();
    }
    return AxiosApi.staticObject;
  }

  public setAuthorizationToken(token: string): void {
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthorizationToken(): void {
    delete this.instance.defaults.headers.common['Authorization'];
  }
}

export default AxiosApi.getInstance();
