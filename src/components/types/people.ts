export interface userInterface {
  id: number;
  username: string;
  email: string;
  nickname: string;
  avatar: string;
  firstName: string;
  lastName: string;
  permissions: permissionInterface[];
}

export interface userFullInterface extends userInterface {
  lastLogin: Date;
  createdAt: Date;
  createdBy: number;
  updatedAt: Date;
  updatedBy: number;
  deletedAt: Date;
  deletedBy: number;
  roles: roleInterface;
}

export interface roleInterface {
  id: number;
  name: string;
  description: string;
  permissions: permissionInterface[];
}

export interface permissionInterface {
  id: number;
  name: string;
  description: string;
}
