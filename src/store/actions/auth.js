
export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';

export const tokenReceived = (token) => {
	return {
		type: TOKEN_RECEIVED,
		token
	}
};
