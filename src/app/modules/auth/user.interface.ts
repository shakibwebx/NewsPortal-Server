export interface IUser {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
