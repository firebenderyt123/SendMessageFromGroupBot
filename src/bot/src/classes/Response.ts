class Response<T> {
  error: string | null = null;
  data: T | null = null;

  constructor(data: T | null = null, error: string | null = null) {
    if (data) this.data = data;
    if (error) this.error = error;
  }
}

export default Response;
