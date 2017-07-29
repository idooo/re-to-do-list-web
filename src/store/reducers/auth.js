import { TOKEN_RECEIVED } from "../actions/auth";

export default function auth (state = {}, action) {
	switch (action.type) {
		case TOKEN_RECEIVED:
			return {
				token: action.token
			};
		default:
			return state
	}
}




