import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { eventUrl, serverToken, eventId, database } from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyNotesService {
	private schedule_url: string = `${eventUrl}.my-notes&eventId=${eventId}`;
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});

	constructor(private http: Http) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getNotes
	** DESC - This will get the notes
	**-------------------------------------------------------------------------------------
	*/
	getNotes(reg_id): Observable<any> {
		this.schedule_url = `${this.schedule_url}&item=${btoa(reg_id)}`;
		return this.http
			.get(this.schedule_url, this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getNotes
	** DESC - This will get the notes
	**-------------------------------------------------------------------------------------
	*/
	sendNotes(regId): Observable<any> {
		let url = `${eventUrl}.send-notes&eventId=${eventId}&item=${btoa(
			regId,
		)}`;
		return this.http
			.get(url, this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getNotes
	** DESC - This will get the notes
	**-------------------------------------------------------------------------------------
	*/
	deleteNote(noteId, regId): Observable<any> {
		let url = `${eventUrl}.delete-note&eventId=${eventId}&noteid=${noteId}&item=${btoa(
			regId,
		)}`;
		console.log(url);
		return this.http
			.get(url, this.options)
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
