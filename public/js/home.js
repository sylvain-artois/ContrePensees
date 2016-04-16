import {OffCanvasMenu} from './lib/OffCanvasMenu'
import {TopbarShrink} from './lib/TopbarShrink'

new OffCanvasMenu({
        name: 'sidr-main',
        source: '.dima-navbar nav'
    })
    .init('.dima-btn-nav');

new TopbarShrink({
        el: ".logo",
        root: window,
        doc: document,
        height: 110,
    })
    .shrink();
