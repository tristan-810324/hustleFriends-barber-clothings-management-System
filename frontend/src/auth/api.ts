type Role = 'CLIENT' | 'STAFF' | 'OWNER';
type SafeUser = { id: string; email: string; fullName: string; role: Role };
type ApiResponse<T> = { data?: T; error?: string };
import { getAuthErrorMessage } from './authMessages';

const apiBaseUrl = import.meta.env.VITE_API_URL || '';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
	try {
		const response = await fetch(`${apiBaseUrl}${path}`, {
			...options,
			credentials: 'include',
			headers: { 'Content-Type': 'application/json', ...options.headers }
		});
		const body = (await response.json().catch(() => ({}))) as ApiResponse<T>;
		if (!response.ok) throw new Error(getAuthErrorMessage(new Error(body.error ?? 'Request failed')));
		return body as T;
	} catch (error) {
		throw new Error(getAuthErrorMessage(error, 'Request failed. Please try again.'));
	}
}

const json = (body: unknown): RequestInit => ({ method: 'POST', body: JSON.stringify(body) });

export const authApi = {
	register: (body: { fullName: string; email: string; password: string }) => request<{ email: string }>('/api/auth/register', json(body)),
	verifyOtp: (body: { email: string; otp: string }) => request<{ user: SafeUser }>('/api/auth/verify-otp', json(body)),
	resendOtp: (body: { email: string }) => request<{ message: string }>('/api/auth/resend-otp', json(body)),
	login: (body: { email: string; password: string }) => request<{ user: SafeUser }>('/api/auth/login', json(body)),
	logout: () => request<void>('/api/auth/logout', json({})),
	forgotPassword: (body: { email: string }) => request<{ message: string }>('/api/auth/forgot-password', json(body)),
	resendResetOtp: (body: { email: string }) => request<{ message: string }>('/api/auth/forgot-password', json(body)),
	verifyResetOtp: async (body: { email: string; otp: string }) => {
		return request<{ message: string }>('/api/auth/verify-reset-otp', json(body));
	},
	resetPassword: async (body: { email: string; password: string }) => {
		return request<{ message: string }>('/api/auth/reset-password', json(body));
	}
};