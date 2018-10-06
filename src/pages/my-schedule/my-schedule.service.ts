import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
	eventUrl,
	serverToken,
	eventId,
	locationId,
	database,
} from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyScheduleService {
	private schedule_url: string = `${eventUrl}.my-schedule&locationId=${locationId}&eventId=${eventId}`;
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
	** METHOD NAME - getSchedule
	** DESC - This will get the schedule
	**-------------------------------------------------------------------------------------
	*/
	getSchedule(reg_id): Observable<any> {
		return this.http
			.get(`${this.schedule_url}&item=${btoa(reg_id)}`, this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - delete
	** DESC - This will get the schedule
	**-------------------------------------------------------------------------------------
	*/
	delete(id: number, reg_id): Observable<any> {
		let url = `${eventUrl}.remove-schedule&id=${id}&eventId=${eventId}&item=${btoa(
			reg_id,
		)}`;
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
