import axios, { AxiosInstance } from "axios";

export default class BackendClient {
  client?: AxiosInstance;
  constructor() {}

  public async Init() {
    this.client = axios.create({
      baseURL: "http://localhost:3000",
      maxBodyLength: Infinity,
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }

  public async post(endpoint: string, data: unknown) {
    if (!this.client) {
      console.log("error");
      return;
    }
    try {
      const response = await this.client.post(
        `data/${endpoint}`,
        data
      );
      return response.data;
    } catch (error: unknown) {
      try {
        if (axios.isAxiosError(error)) {
          console.log("error", error);
          return;
        } else {
          console.log("error", error);
          return;
        }
      } catch (error) {
        console.log("error", error);
        return;
      }
    }
  }

  public async get(path: string) {
    if (!this.client) {
      console.log("error");
      return;
    }
    try {
      const response = await this.client.get( `/data/${path}`);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("error", error);
        return;
      } else {
        console.log("error", error);
        return;
      }
    }
  }

  handleError(error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Error: ", error.message);
      return error.message;
    } else {
      console.log("Error no controlado: ", error);
      return "An unexpected error occurred";
    }
  }
}
