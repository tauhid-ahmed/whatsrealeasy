type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type LoginAPIResponse = {
  success: boolean;
  message: string;
  statusCode?: number;
  data: TokenResponse;
};

export type LoggedInUser = {
  userId: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: LoggedInUser;
};

export type SignUpAPIResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
  data: TokenResponse;
};
