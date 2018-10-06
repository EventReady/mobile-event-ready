export class Base {
	private child;
	constructor(self) {
		this.child = self;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - toggleSearch
	**-------------------------------------------------------------------------------------
	*/
	toggleSearch() {
		this.child.showSearch = !this.child.showSearch;
	}
}
