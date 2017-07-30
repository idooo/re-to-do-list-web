import * as queryString from 'query-string';
import * as Cookies from 'js-cookie';
import APIService from "./API";

export const JWT_COOKIE_NAME = 'jwt';

export class AuthenticationService {

	static authorise (history, redirect) {
		const parsedToken = queryString.parse(location.hash)['/token']; // eslint-disable-line no-restricted-globals
		const storedToken = Cookies.get(JWT_COOKIE_NAME);

		if (parsedToken) {
			APIService.addAuthorisationHeader(parsedToken);

			if (parsedToken && parsedToken !== storedToken) {
				Cookies.set(JWT_COOKIE_NAME, parsedToken, { expires: 7 });
			}

			history.push(redirect);
		}
	}

	static logout (history, redirect) {
		Cookies.remove(JWT_COOKIE_NAME);
		APIService.removeAuthorisationHeader();
		history.push(redirect);
	}

}
