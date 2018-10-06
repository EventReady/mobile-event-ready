import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	AlertController,
	LoadingController,
	ModalController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { ImageViewerController } from 'ionic-img-viewer';
import { venueMaps } from '@app/dashboard.config';
//import { VenuesService } from './venues.service';

@IonicPage()
@Component({
	selector: 'venues',
	templateUrl: 'venues.html',
	providers: [ImageViewerController],
})
export class VenuesPage {
	public loaded: boolean = true;
	public venues: object;
	public loadingPopup;
	public venueMaps = [];

	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		public AlertCtrl: AlertController,
		public modalCtrl: ModalController,
		private appService: AppService,
		private _imageViewerCtrl: ImageViewerController,
	) {
		this.venueMaps = venueMaps;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewCanEnter(): Promise<any> {
		return this.appService.getLoggedIn();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void {
		this.viewCtrl.showBackButton(true);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToDetail
	** DESC - this will take the user to the detail page
	**-------------------------------------------------------------------------------------
	*/
	goToDetail(venueId: number) {
		this.navCtrl.push('VenueDetailPage', { venueId: venueId });
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addNote
	** DESC - This will add a note
	**-------------------------------------------------------------------------------------
	*/
	addNote() {
		let modal = this.modalCtrl.create('NotesModalPage', {
			noteType: 'Venue',
		});
		modal.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToMap
	**-------------------------------------------------------------------------------------
	*/
	goToMap(myImage) {
		const imageViewer = this._imageViewerCtrl.create(myImage);
		imageViewer.present();
	}
}
