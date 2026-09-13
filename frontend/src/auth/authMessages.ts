const messages: Record<string, string> = {
	INVALID_CREDENTIALS: 'The email or password is incorrect.',
	ACCOUNT_EXISTS: 'An account with this email already exists. Please sign in instead.',
	UNVERIFIED: 'Your email is not verified yet. We sent a new verification code to your inbox.',
	INACTIVE: 'This account is currently inactive. Please contact support.',
	INVALID_OTP: 'That verification code is incorrect. Please check your email and try again.',
	OTP_EXPIRED: 'That verification code has expired. Please request a new code.',
	OTP_ATTEMPTS: 'Too many incorrect attempts. Please request a new verification code.',
	RESET_EXPIRED: 'Your password reset session has expired. Please request a new code.',
	RESET_ACCOUNT_NOT_FOUND: 'We could not find a Hustle Friends account with that email address.',
	'Email verification required': 'Your email is not verified yet. We sent a new verification code to your inbox.',
	'Email delivery is not configured': 'We could not send the email right now. Please check the email settings or try again later.',
	'No Hustle Friends account is registered with that email.': 'We could not find a Hustle Friends account with that email address.',
	'Invalid request': 'Please check your information and try again.',
	'Internal server error': 'Something went wrong on our side. Please try again in a moment.'
};

export function getAuthErrorMessage(error: unknown, fallback = 'Something went wrong. Please try again.') {
	if (!(error instanceof Error)) return fallback;
	if (error.message === 'Failed to fetch' || error.message.includes('fetch')) {
		return 'We could not connect to the server. Please make sure the backend is running and try again.';
	}
	return messages[error.message] ?? error.message ?? fallback;
}
	