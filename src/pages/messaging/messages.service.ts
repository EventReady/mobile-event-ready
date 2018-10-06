import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
	eventUrl,
	serverToken,
	eventId,
	clientId,
	database,
} from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MessagesService {
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(private http: Http) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getContacts
	**-------------------------------------------------------------------------------------
	*/
	deleteMessage(messageId) {
		return this.http
			.get(
				`${eventUrl}.delete-message&messageid=${messageId}&clientId=${clientId}&eventId=${eventId}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getContacts
	**-------------------------------------------------------------------------------------
	*/
	getContacts() {
		return this.http
			.get(
				`${eventUrl}.contacts&clientId=${clientId}&eventId=${eventId}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getMessages
	**-------------------------------------------------------------------------------------
	*/
	getMessages(regid) {
		return this.http
			.get(
				`${eventUrl}.get-messages&clientId=${clientId}&eventId=${eventId}&item=${btoa(
					regid,
				)}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getMessage
	**-------------------------------------------------------------------------------------
	*/
	getMessage(regid, messageId) {
		return this.http
			.get(
				`${eventUrl}.get-message&clientId=${clientId}&eventId=${eventId}&item=${btoa(
					regid,
				)}&messageId=${messageId}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - saveMessage
	**-------------------------------------------------------------------------------------
	*/
	saveMessage(subject, message, regid, contactid) {
		return this.http
			.get(
				`${eventUrl}.save-message&contact=${contactid}&subject=${subject}&message=${message}&clientId=${clientId}&eventId=${eventId}&item=${btoa(
					regid,
				)}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - saveResponse
	**-------------------------------------------------------------------------------------
	*/
	saveResponse(message, regid, messageId) {
		return this.http
			.get(
				`${eventUrl}.save-response&message=${message}&messageId=${messageId}&clientId=${clientId}&eventId=${eventId}&item=${btoa(
					regid,
				)}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendHelpMessage
	**-------------------------------------------------------------------------------------
	*/
	sendHelpMessage(message, regid) {
		return this.http
			.get(
				`${eventUrl}.send-help-message&message=${message}&clientId=${clientId}&eventId=${eventId}&item=${btoa(
					regid,
				)}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendShareMessage
	**-------------------------------------------------------------------------------------
	*/
	sendShareMessage(email, message, regid) {
		return this.http
			.get(
				`${eventUrl}.send-share-message&email=${email}&message=${message}&clientId=${clientId}&eventId=${eventId}&item=${btoa(
					regid,
				)}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - formatData
	** DESC - This will format the returned data
	**-------------------------------------------------------------------------------------
	*/
	formatData(res: Response) {
		let body = res.json();
		return body || {};
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - throwError
	** DESC - this will catch all errors generically
	**-------------------------------------------------------------------------------------
	*/
	throwError(error: Response | any) {
		return Observable.throw(error);
	}
}
