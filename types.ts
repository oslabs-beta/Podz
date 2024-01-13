export interface ServerError {
  log: string;
  status: number;
  message: { err: string };
}

export interface DeveloperType {
  name: String;
  picture: String;
  github: String;
  email: String;
  linkedin: String;
}
