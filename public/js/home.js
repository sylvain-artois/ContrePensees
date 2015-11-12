import {OffCanvasMenu} from 'js/lib/OffCanvasMenu.js'
import {Slider} from 'js/lib/Slider.js'

new OffCanvasMenu({
        name: 'sidr-main',
        source: '.dima-navbar nav'
    })
    .init('.dima-btn-nav');

new Slider()
    .init('.fullscreenOnePage');
