export interface Permission {
  id: number;
  name: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  firstName: string;
  lastName: string;
  permissions: Permission[];
}

export interface UserFull extends User {
  lastLogin: Date;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
  deletedAt: Date;
  deletedBy: number;
  roles: Role[];
}
