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
	accessToken: string;
	memberInfo: MemberInfo;
	refreshExpiresIn: number;
	refreshToken: string;
};
