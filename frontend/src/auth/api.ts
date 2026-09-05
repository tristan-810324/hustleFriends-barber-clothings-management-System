type User = { role: 'CLIENT' | 'STAFF' | 'OWNER' };

const requireOtp = (otp: string) => {
	if (!/^\d{6}$/.test(otp)) throw new Error('Enter a valid 6-digit code.');
};

export const authApi = {
	register: async (_body: { fullName: string; email: string; password: string }) => ({ email: _body.email }),
	verifyOtp: async (body: { email: string; otp: string }) => {
		requireOtp(body.otp);
		return { user: { role: 'CLIENT' as const } };
	},
	login: async (_body: { email: string; password: string }) => ({ user: { role: 'CLIENT' as User['role'] } }),
	forgotPassword: async (_body: { email: string }) => ({ message: 'Check your email for the reset code.' }),
	verifyResetOtp: async (body: { email: string; otp: string }) => {
		requireOtp(body.otp);
		return { token: `ui-preview-${body.email}` };
	},
	resetPassword: async (_body: { email: string; token: string; password: string }) => ({ message: 'Password updated.' })
};