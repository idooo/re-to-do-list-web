import * as queryString from 'query-string';
import * as Cookies from 'js-cookie';
import APIService from "./API";


export class AuthenticationService {

	static authorise (history, redirect) {
		const parsedToken = queryString.parse(location.hash)['/token']; // eslint-disable-line no-restricted-globals
		const storedToken = Cookies.get('jwt');

		if (parsedToken) {
			APIService.addAuthorisationHeader(parsedToken);

			if (parsedToken && parsedToken !== storedToken) {
				Cookies.set('jwt', parsedToken, { expires: 7 });
			}

			history.push(redirect);
		}
	}

}
