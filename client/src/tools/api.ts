import axios from 'axios';

export class API {
  static {
    axios.create({
      responseType: 'json',
    });
  }

  static async get<T>(...args: Parameters<typeof axios.post>): Promise<T> {
    return (await axios.post<T>(...args)).data;
  }

  static async post<T>(...args: Parameters<typeof axios.post>): Promise<T> {
    return (await axios.post<T>(...args)).data;
  }

  static async put<T>(...args: Parameters<typeof axios.post>): Promise<T> {
    return (await axios.post<T>(...args)).data;
  }

  static async delete<T>(...args: Parameters<typeof axios.post>): Promise<T> {
    return (await axios.post<T>(...args)).data;
  }
}
