//import $    from 'jquery';
//import sidr from 'sidr';

/**
 * Handle Sidr off canvas menu behavior
 */
export class OffCanvasMenu {

    /**
     * Store sidr options
     *
     * @param {object} o
     */
    constructor(o) {
        this.options = o;
    }

    /**
     * Get micro template for home link
     *
     * @returns {string}
     */
    get homeLink() {
        return `
<a href="/">Home</a>`;
    }

    /**
     * Get micro template for search form
     *
     * @returns {string}
     */
    get searchLink() {
        return `
<form action="/search" method="get" name="searchFormMobile">
    <input type="search" placeholder="Rechercher" name="freeTextSearch" />
</form>`;
    }

    /**
     * Get micro template for links not stored in nav bar
     *
     * @returns {string}
     */
    get minorLinks() {
        return `
<li><a href="/dye-pop">Portfolio</a></li>
<li><a href="/sylvain-artois">CV</a></li>
<li><a href="/contact">Contact</a></li>`;
    }

    /**
     * Handle the special source callback, and call sidr
     *
     * @param {string} selector The sidr toggle button
     */
    init(selector) {
        this.options.source = this.handleSource(this.options.source);
        $(selector).sidr(this.options);
    }

    /**
     * Customize navbar to include all links
     *
     * @param {string} source
     * @returns {string}
     */
    handleSource(source) {
        return $.proxy(function(name) {
            let $source = $(source).clone().attr('id', name);
            let $homeLink = $source.find('[data-nav="home"]');
            let $searchLink = $source.find('[data-nav="search"]');

            $homeLink.empty().html(this.homeLink);
            $searchLink.empty().html(this.searchLink);
            $source.find("ul").append(this.minorLinks);

            return $source.html();
        }, this);
    }

    /**
     * Handle search form behavior
     *
     * @param {jQuery} $searchLink
     */
    handleSearchClick($searchLink) {
        $searchLink.find('form').on('submit', function(e){
            let $input = $(e.currentTarget).find('input');
            let searchString = encodeURI($input.val());

            $(this).attr('action', '/search/' + searchString);
            //avoid query string
            $input.remove();
        });
    }
}
