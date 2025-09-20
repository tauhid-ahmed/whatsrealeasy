export type LoginAPIResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken?: string;
    refreshToken?: string;
  };
};

export type AuthUser = {
  userId: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};
