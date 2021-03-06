import $                from 'jquery';
import TweenLite        from 'greensock';
import Hammer           from 'hammer';
import waitforimages    from 'waitforimages';
import sliderrevolution from 'sliderrevolution';

/**
 * Class Slider
 */
export class Slider {

    static getDefaultSettings() {
        return {
            dottedOverlay: "none",
            delay: 9000,
            startwidth: 1170,
            startheight: 700,
            hideThumbs: 200,
            thumbWidth: 100,
            thumbHeight: 50,
            thumbAmount: 5,
            navigationType: "bullet",
            navigationArrows: "solo",
            navigationStyle: "none",

            touchenabled: "on",
            onHoverStop: "on",

            parallax: "mouse",
            parallaxBgFreeze: "on",

            swipe_velocity: 0.7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,

            keyboardNavigation: "on",

            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,

            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,

            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,

            shadow: 0,
            fullWidth: "off",
            fullScreen: "on",

            spinner: "spinner0",

            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,

            shuffle: "off",

            forceFullWidth: "off",
            fullScreenAlignForce: "off",
            minFullScreenHeight: "400",

            hideThumbsOnMobile: "off",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "off",
            hideArrowsOnMobile: "off",
            hideThumbsUnderResolution: 0,

            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0,
            fullScreenOffsetContainer: ""
        }
    }

    /**
     * @param {object|null} settingsOverride
     */
    constructor(settingsOverride = null) {

        this.sliderSettings = Slider.getDefaultSettings();

        if (settingsOverride != null) {
            this.setOptions(settingsOverride);
        }
    }

    get sliderInstance() {
        return this._sliderInstance;
    }

    set sliderInstance(sliderInstance){
        this._sliderInstance = sliderInstance;
    }

    /**
     * @param {object} settings
     */
    setOptions(settings = {}) {

        if (typeof settings !== 'object' || Array.isArray(settings)) {
            throw new Error("Bad function call exception. Slider.setOptions only accept option hash");
        }

        for (let key in settings) {
            if (settings.hasOwnProperty(key)) {
                this.sliderSettings[key] = settings[key];
            }
        }

        return this;
    }

    /**
     * @param {string} selector
     */
    init(selector) {
        return this.sliderInstance = $(selector).show().revolution(this.sliderSettings);
    }
}