export default interface APIToken {
  exp: number;
  id: number;
  perms: Permission[];
}

interface Permission {
  id: number;
  name: string;
}
