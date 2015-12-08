import $                    from 'jquery';
import PhotoSwipe           from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipeui';

export class GalleryHandler {

    constructor(o) {
        this.options  = o;
        this.selector = this.options.selector;
        this.root     = this.options.root;
    }

    /**
     *
     */
    initPortfolio() {
        const items = [
            {
                src: '/images/analog-early-reports/12072010-04-2.jpg',
                w: 2000,
                h: 2000,
                title: 'Aurélie. Ososphère, Strasbourg, La Laiterie. Ven 27/09/2002 - Pentax MZ-M - FUJI SUPERIA 1600'
            },
            {
                src: '/images/analog-early-reports/12072010-08.jpg',
                w: 3000,
                h: 2000,
                title: 'Alleeeezzzzz ! Teknival du 15 aout, plateau du Larzac. Sam 16/08/2003 - Pentax MZ-M - Superia CZ-5 800'
            },
            {
                src: '/images/analog-early-reports/12072010-09.jpg',
                w: 3000,
                h: 2000,
                title: 'Mads Maxs ! Teknival du 15 aout, plateau du Larzac. Ven 15/08/2003 - Pentax MZ-M - Superia CZ-5 800'
            },
            {
                src: '/images/analog-early-reports/12072010-09-2.jpg',
                w: 3000,
                h: 2000,
                title: 'Tous au grand-air. Teknival du 15 aout, plateau du Larzac. Sam 16/08/2003 - Pentax MZ-M - Superia CZ-5 800'
            },
            {
                src: '/images/analog-early-reports/12072010-12-2.jpg',
                w: 3000,
                h: 2000,
                title: 'Fantômes. Ososphère, Strasbourg, La Laiterie. Ven 27/09/2002 - Pentax MZ-M - FUJI SUPERIA 1600'
            },
            {
                src: '/images/analog-early-reports/12072010-25A.jpg',
                w: 2000,
                h: 2000,
                title: 'Siffler, danser. Ososphère, Strasbourg, La Laiterie. Ven 27/09/2002 - Pentax MZ-M - FUJI SUPERIA 1600'
            },
            {
                src: '/images/analog-early-reports/12072010-31.jpg',
                w: 3000,
                h: 2000,
                title: 'Nawak. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-03.jpg',
                w: 3000,
                h: 2000,
                title: 'On fire. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-03-3.jpg',
                w: 3000,
                h: 2000,
                title: 'Turntabler. Organ\'X tour, Nancy. Mer 7/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-13.jpg',
                w: 3000,
                h: 2000,
                title: 'Pastaga. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-15-2.jpg',
                w: 3000,
                h: 2000,
                title: 'Smile. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-18.jpg',
                w: 3000,
                h: 2000,
                title: 'Grande-roue. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-21-2.jpg',
                w: 3000,
                h: 2000,
                title: 'Poutrelles d\'aciers. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-29.jpg',
                w: 3000,
                h: 2000,
                title: 'Dionysie. Organ\'X tour, Nancy. Mer 7/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/14072010-36.jpg',
                w: 3000,
                h: 2000,
                title: 'Chasseur. Organ\'X tour, Nancy. Mer 7/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            },
            {
                src: '/images/analog-early-reports/21022013-30.jpg',
                w: 3000,
                h: 2000,
                title: 'Jouer avec le feu. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
            }
        ];

        new PhotoSwipe(
            document.querySelectorAll('.pswp')[0],
            PhotoSwipeUI_Default,
            items,
            {}
        ).init();
    }


    /**
     * @param string urlHash
     */
    init(urlHash) {

        this.$galleries = $(this.selector);
        console.log(this.$galleries);
        let self = this;

        this.$galleries.each(function(i, gallery) {
            let $gallery = $(gallery);

            $gallery.attr('data-pswp-uid', i+1);
            $gallery.on('click', 'a', $.proxy(self.click, self));
        });

        let hashData = this.parseHash(urlHash);
        console.log(hashData);

        if (hashData.pid && hashData.gid) {

            console.log(hashData.gid - 1);
            let gallery = this.$galleries.eq(hashData.gid - 1);

            if (gallery.length > 1) {
                this.open(
                    hashData.pid,
                    gallery,
                    true,
                    true
                );
            }
        }
    }

    /**
     * @param {jQuery.Event} e
     * @returns {boolean}
     */
    click(e) {

        e.preventDefault();
        console.log(e.currentTarget);

        let $figure = $(e.currentTarget).parent('figure');

        if ($figure.length == 0) {
            console.log('no figure');
            return false;
        }

        let $gallery        = $figure.parents(this.selector),
            $galleryItems   = $gallery.find('figure'),
            index           = $galleryItems.index($figure);

        console.log($figure);
        console.log($gallery);
        console.log($galleryItems);
        console.log(index);

        if (index >= 0 && $gallery.length >= 1) {
            this.open(index, $gallery, false, false);
        }

        return false;
    }

    /**
     * @param {int} Galleries item index
     * @param {$} $gallery
     * @param {bool} disableAnimation
     * @param {bool} fromURL
     */
    open(index, $gallery, disableAnimation, fromURL) {

        console.log('open');
        console.log(index, $gallery);

        if ($gallery.length == 0) {
            return;
        }

        let items = this.parseHtml($gallery),
            options = {
                uid: $gallery.attr('data-pswp-uid'),
                bounds: this.bound($gallery)
            };

        options.index = parseInt(index, 10);
        if (fromURL) {
            options.index--;
        }

        console.log(options);

        // exit if index not found
        if (isNaN(options.index)) {
            console.log('isNaN');
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        this.gallery = new PhotoSwipe(
            document.querySelectorAll('.pswp')[0],
            PhotoSwipeUI_Default,
            items,
            options
        );
        this.gallery.init();

        return false;
    }

    /**
     * Parse picture index and gallery index from URL (#&pid=1&gid=2)
     *
     * @param rawHash
     * @returns {{}}
     */
    parseHash(rawHash) {
        let hash   = rawHash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        hash.split('&').filter(el => el != false).forEach(function(el, i){
            let pair = el.split('=');
            if (pair.length = 2) {
                params[pair[0]] = pair[1];
            }
        });

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    }

    /**
     * Parse slide data (url, title, size ...) from DOM elements
     *
     * @param {$} $gallery
     * @returns {Array}
     */
    parseHtml($gallery) {

        let $figures = $gallery.find("figure"),
            items   = [];

        console.log($figures);

        $figures.each(function(i, figure) {
            let $figure     = $(figure),
                $a          = $figure.find("a"),
                $caption    = $figure.find("figcaption"),
                $img        = $figure.find("img"),
                item;

            console.log(figure);

            if ($a.length > 0) {
                let size = $a.attr('data-size').split('x');
                item = {
                        src: $a.prop('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10),
                        el: $figure
                };
            } else {
                throw new Error("Missing a");
            }

            if ($caption.length > 1) {
                item.title = $caption.html();
            }

            if ($img.length > 1) {
                item.msrc = $img.prop('src');
            }

            items.push(item);
        });

        console.log('items',items);
        return items;
    }

    /**
     * @param {jQuery instance} $figure
     * @returns {{x: Number, y: Number, w: Number}}
     */
    bound($figure) {

        let thumbnail   = $figure.find('img')[0],
            pageYScroll = this.root.pageYOffset || this.root.document.documentElement.scrollTop,
            rect = thumbnail.getBoundingClientRect();

        return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
        };
    }
}
