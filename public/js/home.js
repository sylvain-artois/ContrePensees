import {OffCanvasMenu} from 'lib/OffCanvasMenu.js'
import {TopbarShrink} from 'lib/TopbarShrink.js'

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
