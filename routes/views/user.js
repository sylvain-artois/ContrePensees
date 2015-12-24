var keystone = require('keystone');

exports = module.exports = function(req, res) {

    if (['/dye-pop', '/sylvain-artois'].indexOf(req.url) === -1) {
        return res.notfound();
    }

    res.locals.section = (req.url === '/sylvain-artois') ?  'resume' : 'portfolio';
    res.locals.data = {
        categories: res.locals.categories,
        env: keystone.get('env'),
        isBlogType: false
    };

    res.locals.data.items = [
        [{
            src: '/images/analog-early-reports/14072010-18.jpg',
            small: '/images/analog-early-reports/small/14072010-18.jpg',
            w: 3000,
            h: 2000,
            title: 'Grande-roue. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }, {
            src: '/images/analog-early-reports/12072010-31.jpg',
            small: '/images/analog-early-reports/small/12072010-31.jpg',
            w: 3000,
            h: 2000,
            title: 'Nawak. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }, {
            src: '/images/analog-early-reports/14072010-03-3.jpg',
            small: '/images/analog-early-reports/small/14072010-03-3.jpg',
            w: 3000,
            h: 2000,
            title: 'Turntabler. Organ\'X tour, Nancy. Mer 7/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        },{
            src: '/images/analog-early-reports/14072010-03.jpg',
            small: '/images/analog-early-reports/small/14072010-03.jpg',
            w: 3000,
            h: 2000,
            title: 'On fire. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }], [{
            src: '/images/analog-early-reports/12072010-04-2.jpg',
            small: '/images/analog-early-reports/small/12072010-04-2.jpg',
            w: 2000,
            h: 2000,
            title: 'Aurélie. Ososphère, Strasbourg, La Laiterie. Ven 27/09/2002 - Pentax MZ-M - FUJI SUPERIA 1600'
        }, {
            src: '/images/analog-early-reports/12072010-12-2.jpg',
            small: '/images/analog-early-reports/small/12072010-12-2.jpg',
            w: 3000,
            h: 2000,
            title: 'Fantômes. Ososphère, Strasbourg, La Laiterie. Ven 27/09/2002 - Pentax MZ-M - FUJI SUPERIA 1600'
        }, {
            src: '/images/analog-early-reports/14072010-15-2.jpg',
            small: '/images/analog-early-reports/small/14072010-15-2.jpg',
            w: 3000,
            h: 2000,
            title: 'Smile. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }, {
            src: '/images/analog-early-reports/12072010-25A.jpg',
            small: '/images/analog-early-reports/small/12072010-25A.jpg',
            w: 2000,
            h: 2000,
            title: 'Insaisissables. Ososphère, Strasbourg, La Laiterie. Ven 27/09/2002 - Pentax MZ-M - FUJI SUPERIA 1600'
        }],[{
            src: '/images/analog-early-reports/12072010-08.jpg',
            small: '/images/analog-early-reports/small/12072010-08.jpg',
            w: 3000,
            h: 2000,
            title: 'Alleeeezzzzz ! Teknival du 15 aout, plateau du Larzac. Sam 16/08/2003 - Pentax MZ-M - Superia CZ-5 800'
        }, {
            src: '/images/analog-early-reports/12072010-09.jpg',
            small: '/images/analog-early-reports/small/12072010-09.jpg',
            w: 3000,
            h: 2000,
            title: 'Mads Maxs ! Teknival du 15 aout, plateau du Larzac. Ven 15/08/2003 - Pentax MZ-M - Superia CZ-5 800'
        }, {
            src: '/images/analog-early-reports/12072010-09-2.jpg',
            small: '/images/analog-early-reports/small/12072010-09-2.jpg',
            w: 3000,
            h: 2000,
            title: 'Tous au grand-air. Teknival du 15 aout, plateau du Larzac. Sam 16/08/2003 - Pentax MZ-M - Superia CZ-5 800'
        }, {
            src: '/images/analog-early-reports/14072010-13.jpg',
            small: '/images/analog-early-reports/small/14072010-13.jpg',
            w: 3000,
            h: 2000,
            title: 'Pastaga. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }], [{
            src: '/images/analog-early-reports/14072010-21-2.jpg',
            small: '/images/analog-early-reports/small/14072010-21-2.jpg',
            w: 3000,
            h: 2000,
            title: 'Poutrelles d\'aciers. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }, {
            src: '/images/analog-early-reports/14072010-29.jpg',
            small: '/images/analog-early-reports/small/14072010-29.jpg',
            w: 3000,
            h: 2000,
            title: 'Dionysie. Organ\'X tour, Nancy. Mer 7/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }, {
            src: '/images/analog-early-reports/14072010-36.jpg',
            small: '/images/analog-early-reports/small/14072010-36.jpg',
            w: 3000,
            h: 2000,
            title: 'Chasseur. Organ\'X tour, Nancy. Mer 7/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }, {
            src: '/images/analog-early-reports/21022013-30.jpg',
            small: '/images/analog-early-reports/small/21022013-30.jpg',
            w: 2000,
            h: 3000,
            title: 'Jouer avec le feu. Teknival du 1er mai, Marigny. Sam 03/05/2003 - Pentax MZ-M - Kodak Ektachrome 200'
        }]
    ];

    new keystone.View(req, res).render(res.locals.section);
};
