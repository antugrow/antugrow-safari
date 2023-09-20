import { ICooperative } from "./Cooperative";

export interface IUser {
	firstName: string;
	lastName: string;
	email?: string;
	phoneNo: string;
	age?: number;
	identity?: string;
	identityType?: IdentityType;
	vId: string;
	userType: UserType;
	userRole: UserType;
	isVerified: boolean;
	profilePicture?: string;
	createdAt?: Date;
	updatedAt?: Date;
	accountStatus?: AccountStatus;
	cooperative?: ICooperative | string | null;
	permissions?: string[];
	token?: string;
	tokenExpiresAt?: Date;
	password?: string;
	id?: string;
	roles?: string[];
}

export enum UserType {
	SUPER_ADMIN = "super_admin",
	ADMIN = "admin",
	COOP_ADMIN = "coop_admin",
	COOP_STAFF = "coop_staff",
	COOP_MEMBER = "coop_member",
	FARMER = "farmer",
}

export enum AccountStatus {
	ACTIVE = "active",
	INACTIVE = "inactive",
	SUSPENDED = "suspended",
	BANNED = "banned",
	DELETED = "deleted",
}

export enum IdentityType {
	NATIONAL = "national",
	PASSPORT = "passport",
	ALIEN = "alien",
}
