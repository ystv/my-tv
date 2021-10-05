export interface PermissionInterface {
  id: number;
  name: string;
  description: string;
}

export interface RoleInterface {
  id: number;
  name: string;
  description: string;
  permissions: PermissionInterface[];
}

export interface UserInterface {
  id: number;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  firstName: string;
  lastName: string;
  permissions: PermissionInterface[];
}

export interface UserFullInterface extends UserInterface {
  lastLogin: Date;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
  deletedAt: Date;
  deletedBy: number;
  roles: RoleInterface;
}
