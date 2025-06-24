export type MemberInfo = {
	averageRating: number;
	created_at: string;
	email: string;
	id: string;
	name: string;
	status: string;
	updated_at: string;
};

export type SignInResponse = {
	accessExpiresIn: number;
	access_token: string;
	member_info: MemberInfo;
	refresh_expires_in: number;
	refresh_token: string;
};
