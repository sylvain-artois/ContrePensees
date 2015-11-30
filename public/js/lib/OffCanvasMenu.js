import $    from 'jquery';
import sidr from 'sidr';

export class OffCanvasMenu {
    constructor(o) {
        this.otions = o;
    }

    init(selector) {
        $(selector).sidr(this.otions);
    }
}
