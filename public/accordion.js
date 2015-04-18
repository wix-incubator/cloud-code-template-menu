$(document).ready(function () {
	var templateSource = $("#accordion-template").html();
	var template = Handlebars.compile(templateSource);
	
	/* =============== Menu Building ========= */
	Wix.getSitePages(function renderMenu(sitePages) {
		buildMenu(sitePages);
		attachListeners();
		setCurrentPage();
	});
	
	// Function that builds the menu given the site pages
	function buildMenu(sitePages) {
		//Add elements to menu
		$('.accordion').append(template({pages: sitePages}));
	}

	/* ============== Menu Building End  ============= */
	
	/* ============== Accordion Efects =============== */
	function attachListeners() {
		$(".main-menu-item").mouseover(slideDownSubmenu);
		$(".accordion").mouseleave(slideUpSubMenus);
		$(".main-menu-item, .sub-menu-item").click(menuItemClicked);
	}

	function slideDownSubmenu() {
		//slide down the sub menu below the main menu item (only if its closed)
		if (!$(this).find('.sub-menu').is(":visible")) {
			//slide up all the link lists
			$(".sub-menu").slideUp();
			//now slide down the one closest to this.
			$(this).find('.sub-menu').slideDown();
		}
	}

	function slideUpSubMenus() {
		//slide up all the link lists
		$(".sub-menu:not(.active)").slideUp();
		//make sure the active one is open
		$(".sub-menu.active").slideDown();
	}
	//Override the accordion links default behaviour.
	function menuItemClicked(event) {
		//We dont want the mainMenuItem to catch the same event.
		event.stopPropagation();
		//Remove the current active one
		$(".active").removeClass("active");
		var itemClicked = $(this);
		setActiveMenuItem(itemClicked);
		Wix.navigateToPage(itemClicked.attr('id'));
	}

	function setActiveMenuItem(item) {
		//Make the current item active.
		item.addClass("active");
		//Select closest submenu and mark it also as active.
		item.closest(".sub-menu").addClass("active");
	}

	function setCurrentPage() {
		Wix.getCurrentPageId(function (pageId) {
			setActiveMenuItem($("#" + pageId));
			slideUpSubMenus();
			updateAccordionHeight();
		});
	}

	function updateAccordionHeight() {
		Wix.setHeight($('.accordion').height() + 10);
	}
});