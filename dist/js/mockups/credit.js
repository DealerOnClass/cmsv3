(function(){
	var _page_selector = ".credit-app ";
	var _progressBar   = $(_page_selector + "[data-credit-progress-bar]");
	var _tab           = $(_page_selector + "[data-credit-progress]");
	var _tabs          = _tab.find("[data-toggle='tab']");
	var _pagerPrev	  = $(_page_selector + "[data-credit-prev]");
	var _pagerNext	  = $(_page_selector + "[data-credit-next]");

	//
	//	Init
	UpdateProgressBar(TabProgress());
	TabStyle();

	//
	//	Click Navigation
	$(_page_selector + "[data-toggle='tab']").on("shown.bs.tab", function (e) {
		UpdateProgressBar(TabProgress());
		TabStyle(e.target);
	})
	_pagerPrev.on("click", function (e) {
		var activeTab = _tab.find(".active");
		var prevTab = activeTab.prev().find("[data-toggle='tab']");
		$(prevTab).tab('show');
	})
	_pagerNext.on("click", function (e) {
		var activeTab = _tab.find(".active");
		var nextTab = activeTab.next().find("[data-toggle='tab']");
		$(nextTab).tab('show');
	})

	//
	//	Add classes to tabs based on which are inactive/next
	function TabStyle(self) {
		var activeTab = _tab.find(".active");
		var nextTabs  = activeTab.nextAll();
		var prevTabs  = activeTab.prevAll();
		nextTabs.each(function() {
			$(this).addClass("is-next");
		});
		prevTabs.removeClass("is-next");
		$(self).parent().removeClass("is-next");
	}

	//
	//	Get tab percentage based on number of items in nav
	function TabProgress() {
		var activeTab        = _tab.find(".active");
		var totalTab         = _tabs.length;
		var currentTab	     = activeTab.prevAll().length + 1;

		var progress = (currentTab / totalTab) * 100 + "%";

		return progress;
	};

	//
	//	Add width to progress bar based returned from "TabProgress" funct
	function UpdateProgressBar(progress) {
		_progressBar.css("width", progress).attr("aria-valuenow", progress);
	}
})()
