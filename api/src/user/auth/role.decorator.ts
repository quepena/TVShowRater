import { SetMetadata } from "@nestjs/common";

export const HasRoles = (isAdmin: boolean) => SetMetadata('role', isAdmin);