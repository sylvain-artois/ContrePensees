//import {OffCanvasMenu}  from 'lib/OffCanvasMenu.js';
import {GalleryHandler} from 'lib/GalleryHandler.js';

/*new OffCanvasMenu({
        name: 'sidr-main',
        source: '.dima-navbar nav'
    })
    .init('.dima-btn-nav');*/

new GalleryHandler({
        selector: '.gallery',
        root: window
    })
    .init(window.location.hash);
