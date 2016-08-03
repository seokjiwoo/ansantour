$(document).ready(function(){
	//gnbMenu();
	//lnbMenu();
	//mainSlider();
	bannerSlider();
	lanuage();
	nowZoom();
	printOutput()
	winpop();
	tabMenu($(".section05 > h2"), $(".section05 > .notice"));
	mSelect();
	searchOption();
	mobileHeader();
	$(".galleryBox").galleryBox();
});

$(window).load(function(){
	//mobileGnb();
	//mGnb();
	$(".gnb > li").gnbMenu();
	$(".lnb > ul > li").lnbMenu();
	$(".sliderArea1").mainSlider();
	$(".sliderArea1").mainSlider({
		banner : "#sliderArea2 .imageSlider > a",
		btn_set : "#sliderArea2 .buttonSet ul > li",
		btn_stop : "#sliderArea2 .buttonSet .stop",
	});
});


(function($, undefined){

	"use strict";

	/* GNB */
	$.fn.gnbMenu = function(option){
		var gnbDefault = {
			gnb1ds : ".gnb > li",
			gnb2ds : ".gnb > li > div > div > ul > li"
		},
		o = $.extend({}, gnbDefault, option),
		Action = {
			bindEvents : function(){
				$("body").on("mouseenter", o.gnb1ds, this.bindMouseenter1d );
				$("body").on("mouseleave", o.gnb1ds, this.bindMouseleave1d );
				$("body").on("mouseenter", o.gnb2ds, this.bindMouseenter2d );
				$("body").on("mouseleave", o.gnb2ds, this.bindMouseleave2d );
			},
			bindMouseenter1d : function(){
				var tg = $(this);
				tg.find("> div").addClass("on");
				tg.addClass("on");
			},
			bindMouseleave1d : function(){
				var tg = $(this);
				tg.find("> div").removeClass("on");
		  		tg.removeClass("on");
			},
			bindMouseenter2d : function(){
				var tg = $(this);
				tg.addClass("on");
			},
			bindMouseleave2d : function(){
				var tg = $(this);
				tg.removeClass("on");
			}
		}
		Action.bindEvents();
	};

	/* LNB */
	$.fn.lnbMenu = function(option){
		var lnbDefault = {
			lnb1ds : ".lnb > ul > li",
			lnb2ds : ".lnb > ul > li > ul > li"
		},
		o = $.extend( {}, lnbDefault, option ),
		Action = {
			bindEvents : function(){
				$("body").on('click', o.lnb1ds, this.bindClick1);
				$("body").on('click', o.lnb2ds, this.bindClick2);
			},
			bindClick1 : function(){
				var tg = $(this);
				$(o.lnb1ds).removeClass("on");
				tg.addClass("on");
			},
			bindClick2 : function(e){
				e.stopPropagation();
				var tg = $(this);
				if(!tg.hasClass("on")){
					$(o.lnb2ds).removeClass("on");
					tg.addClass("on");
				}
			}
		}
		Action.bindEvents();
	};

	/* mainSlider */
	$.fn.mainSlider = function(option){
		var sliderDefault = {
			timer : null,
			current : 0,
			banner : "#sliderArea1 .imageSlider > a",
			btn_set : "#sliderArea1 .buttonSet ul > li",
			btn_stop : "#sliderArea1 .buttonSet .stop",
			duration : 1200
		},
		o = $.extend( {}, sliderDefault , option ),
		Action = {
			bindEvents : function(){
				$("body").on("click", o.btn_set, this.bindClick);
				$("body").on("click", o.btn_stop, this.stopAuto);
				$("body").on("mouseenter", o.banner, this.mouseenterAuto);
				$("body").on("mouseleave", o.banner, this.mouseleaveAuto);
			},
			bindClick : function(e){
				e.preventDefault();
				var tg = $(this)
				var i = tg.index();
				Action.fadeIn(i)
			},
			fadeIn : function(i){
				if(o.current > $(o.banner).length-1){
					o.current = 0;
					i = o.current
				}
				if(o.current < 0){
					o.current = $(o.banner).length-1;
					i = o.current
				}
				$(o.banner).stop().fadeOut(o.duration);
				$(o.banner).eq(i).stop().fadeIn(o.duration);
				$(o.btn_set).removeClass("on");
				$(o.btn_set).eq(i).addClass("on");
				o.current = i;
			},
			mouseenterAuto : function(){
				clearInterval(o.timer);
			},
			mouseleaveAuto : function(){
				Action.Auto();
			},
			stopAuto : function(e){
				e.preventDefault();
				clearInterval(o.timer);
			},
			Auto : function(){
				o.timer = setInterval(function(){
					var n = o.current + 1
					if(n == $(o.banner).length){
						n = 0;
					}
					$(o.btn_set).eq(n).trigger("click");
				}, 5000);
			}
		}
		Action.bindEvents();
		Action.Auto();
	};

}) (jQuery);

/* GNB */
function gnbMenu(){ 
	var gnb = $(".gnb > li");
	gnb.each(function(index){
	  	var tg = $(this);
		  tg.on({
		  	mouseenter : function(){
		  		tg.find("> div").addClass("on");
		  		tg.addClass("on");
		  	},
		  	mouseleave : function(){
		  		tg.find("> div").removeClass("on");
		  		tg.removeClass("on");
		  	},
		  	focusin : function(){
		  		tg.find("> div").addClass("on");
		  		tg.addClass("on");
		  	},
		  	focusout : function(){
		  		tg.removeClass("on");
		  		tg.find("> div").removeClass("on");
		  	}
		  });
	 });
	gnb.find("> div > div > ul > li").each(function(index){
	 	var tg = $(this);
	 	tg.on({
		 	mouseenter : function(){
		  		tg.addClass("on");
		  	},
			  mouseleave : function(){
			  	tg.removeClass("on");
			},
			focusin : function(){
				tg.addClass("on");
			},
			focusout : function(){
				tg.removeClass("on");
			}
	 	})
	 });
};

/* LNB */
function lnbMenu(){
	var lnb1ds = $(".lnb > ul > li");
	var lnb2ds = $(".lnb > ul > li > ul > li");
	/* 1뎁스 */
	lnb1ds.on({
		click : function(){
			var tg = $(this);
			lnb1ds.removeClass("on");
			tg.addClass("on");
		},
		focusin : function(){
			var tg = $(this);
			lnb1ds.removeClass("on")
			tg.addClass("on")
		}
	});
	/* 2뎁스 */
	lnb2ds.on({
		click : function(e){
			var tg = $(this);
			e.stopPropagation();
			if(!tg.hasClass("on")){
				lnb2ds.removeClass("on");
				tg.addClass("on");
			}
		},
		focusin : function(){
			var tg = $(this);
			tg.addClass("on");
		},
		focusout : function(){
			var tg = $(this);
			tg.removeClass("on");
		}
	});
};

/* mainSlider  */
function mainSlider(){
	var timer;
	var current = 0;
	var banner = $(".imageSlider > a");
	var btn_set = $(".buttonSet ul > li");
	var duration = 1200;

	btn_set.on({
		click : function(e){
			e.preventDefault();
			var tg = $(this)
			var i = tg.index();
			fadeIn(i);
		},
		focusin : function(){
			var tg = $(this)
			var i = tg.index();
			fadeIn(i)
		}
	});

	function sideBtn(){
		$(".buttonSet .stop").on("click", function(e){
			e.preventDefault();
			clearInterval(timer);
		})
		banner.on({
			mouseenter : function(){
				clearInterval(timer)
			},
			mouseleave : function(){
				start();
			}
		});
	};

	function start(){
		timer = setInterval(function(){
			var n = current + 1
			if(n == banner.length){
				n = 0;
			}
			btn_set.eq(n).trigger("click");
		}, 5000);
	}

	function fadeIn(i){
		if(current > banner.length-1){
			current = 0;
			i = current
		}
		if(current < 0){
			current = banner.length-1;
			i = current
		}
		banner.stop().fadeOut(duration);
		banner.eq(i).stop().fadeIn(duration);
		btn_set.removeClass("on");
		btn_set.eq(i).addClass("on");
		current = i;
	};
	sideBtn();
	start();
};

/* bannerSlider */
function bannerSlider(){
	var public_count = true;
	var $publicL = $('.public_link_wrap li').length;
	var $publicW = $('.public_link_wrap li').outerWidth(true);
	var $clears;

	$('.public_stop').on('click',function(e){
		e.preventDefault();
		public_stops();
		public_count = false;
	});

	$('.public_play').on('click',function(e){
		e.preventDefault();
		public_start();
		public_count = true;
	});

	$('.bannerSlider .prev').on('click',function(e){
		e.preventDefault();
		var $sup2 = parseInt($('.public_link_wrap ul').css('left')) + $publicW
		$('.public_link_wrap ul:not(:animated)').stop().animate({left:$sup2} , function(){
			$('.public_link_wrap li:last').prependTo(this);
			$('.public_link_wrap ul').css({left:-($publicW)});
		});
	});

	$('.bannerSlider .next').on('click',function(e){
		e.preventDefault();
		var $sup2 = parseInt($('.public_link_wrap ul').css('left')) - $publicW
		$('.public_link_wrap ul:not(:animated)').animate({left:$sup2} ,  function(){
			$('.public_link_wrap li:first').appendTo(this);
			$('.public_link_wrap ul').css({left:-($publicW)});
		});
	});

	$('.public_link_wrap').mouseenter(function(){
		if(public_count == true){
			public_stops();
		}
	}).mouseleave(function(){
		if(public_count == true){
			public_start();
		}
	});

	$('.public_link_wrap li:first').before($('.public_link_wrap li:last'));
	$('.public_link_wrap ul').css({width:$publicL*$publicW});
	$('.public_link_wrap ul').css({left:-($publicW)});

	function public_rolling(){
		var $sup2 = parseInt($('.public_link_wrap ul').css('left')) - $publicW
		$('.public_link_wrap ul').animate({left:$sup2} ,  function(){
			$('.public_link_wrap li:first').appendTo(this);
			$('.public_link_wrap ul').css({left:-($publicW)});
		});
	}
	function public_start(){
		public_count == true;
		$clears = setInterval(public_rolling,5000);
	}

	function public_stops(){
		public_count == true;
		clearInterval($clears);
	}
	public_start();
};

/* 공지사항 텝메뉴 */
function tabMenu(selecter, contents){
	selecter.on({
		click : function(e){
			e.preventDefault();
			var tg = $(this);
			selecter.removeClass("on");
			tg.addClass("on");
			contents.removeClass("on");
			tg.next().addClass("on");
		}
	});
};

/* 언어선택 */
function lanuage(){
	var lanuageResult = $(".lanuage > .result");
	var baselanuage;
	var baselink;
	lanuageResult.on({
		click : function(e){
			e.preventDefault();
			baselanuage = lanuageResult.text();
			baselink = lanuageResult.attr("href");
			$(this).next().toggleClass("on");
		}
	});
	$(".lanuage > ul > li").on({
		click : function(){
			var txt = $(this).find("> a").text();
			var link = $(this).find("> a").attr("href");
			lanuageResult.text(txt);
			lanuageResult.attr("href", link)
			$(this).find("> a").text(baselanuage);
			$(this).find("> a").attr("href", baselink);
			$(this).parent().removeClass("on");
			// location.href = link; 실제서비스시 주석제거
		}
	});
};

/* 화면확대 / 축소 */
function nowZoom(){
	var defaultZoom = 100;
	var result = $(".zoomArea .zoomResult");
	$(".zoomArea > .zoomIn").on({
		click : function(e){
			e.preventDefault();
			zoomIn();
		}
	});
	$(".zoomArea > .zoomOut").on({
		click : function(e){
			e.preventDefault();
			zoomOut();
		}
	});
	function zoomIn(){
		defaultZoom = defaultZoom + 10;
		zoom();
	};
	function zoomOut(){
		defaultZoom = defaultZoom - 10;
		zoom();
	};
	function zoom(){
		document.body.style.zoom = defaultZoom + "%";
		result.text(defaultZoom + "%")
		if(defaultZoom == 70){
			alert("30% 축소되었습니다. 더이상 축소할 수 없습니다.")
		}
		if(defaultZoom == 500){
			alert("500% 확대되었습니다. 더이상 확대할 수 없습니다.")
		}
	};
};

/* 프린트 (현재 보이는 화면 전체 출력) */
function printOutput(){
	 $(".printAll").on({
	 	click : function(e){
	 		e.preventDefault();
	 		window.print();
	 	}
	 });
};

/* 서브페이지 겔러리 */
(function($){
	$.fn.galleryBox = function(){
		var current = 0;
		var obj = this;
		var galleryBtn = obj.find("> .galleryBtn > li");
		var bigImg = obj.find("> .bigImg > img");
		var next = obj.find("> .g_next");
		var prev = obj.find("> .g_prev");
		galleryBtn.on({
			click : function(e){
				e.preventDefault();
				var i = $(this).index();
				current = i;
				showImg(current);
			}
		});
		next.on("click",function(e){
			e.preventDefault();
			current++
			if(current > galleryBtn.length-1){
				current = 0;
			}
			showImg(current);
		});
		prev.on("click",function(e){
			e.preventDefault();
			current--
			if(current < 0){
				current = galleryBtn.length-1
			}
			showImg(current);
		});
		function showImg(current){
			bigImg.removeClass("on");
			bigImg.eq(current).addClass("on");
		};
	}
})(jQuery);


/* 윈도우팝업 */
function winpop(){
	$(".majorEvents  > ul > li").on({
		click : function(){
			popupOpen();
		}
	});
	$(".popClose").on({
		click : function(){
			window.close();
		}
	});
	$(".calendarTables > table > tbody > tr > td > div").on({
		click : function(){
			popupOpen();
		}
	});
	function popupOpen(){
		var popUrl = "/project/festivities/as_festivities002.html";	//팝업창에 출력될 페이지 URL
		var popOption = "width=650, height=582, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
		window.open(popUrl,"",popOption);
	}
};

/* 상세검색 */
function searchOption(){
	$(".searchShow").on("click",function(e){
		e.preventDefault();
		$(this).toggleClass("on");
		$(".searchOption").toggleClass("on");
	});
	$(".closeSoption").on("click", function(e){
		e.preventDefault();
		$(".searchOption").removeClass("on");
	});
};

/* 모바일 헤더 */
function mobileHeader(){
	var bool = true;
	$(".headerM .msearchBtn").on("click", function(e){
		if(bool == true){
			$(this).find("> img").attr("src","/project/images/btn/msearch_off.jpg");
			$(".headerM").css("height","64px");
			$(".msearchBox").addClass("on");
			bool = false;
		}else{
			$(this).find("> img").attr("src","/project/images/btn/msearch_on.jpg");
			$(".headerM").css("height","33px");
			$(".msearchBox").removeClass("on");
			bool = true;
		}
		
	});
};

/* 모바일 GNB */
function mobileGnb(){
	var side_area = $(".mobileGnb");
	var container = $(".contentWapper");
	var speed = 100;
	var promise = true;
	var wHeight = $(window).height();
	side_area.css("min-height",wHeight);
	
	$(".sidemenuBtn").on("click", function(e){
		e.preventDefault();
		if(promise){
			openGnb();
		}else{
			closeGnb();
		}
	});
	/* 모바일 GNB 열기 */
	function openGnb(){
		side_area.css({display:"block",position:"absolute",left:"-250px",top:0}).stop().animate({left:0},speed);
		container.css({position:"fixed",top:0}).stop().animate({marginLeft:"250px"},speed)
		promise = false;
	};
	/* 모바일 GNB 닫기*/
	function closeGnb(){
		side_area.css({position:"absolute"}).stop().animate({left:"-250px"},speed,function(){
			$(this).css({display:'none'});
		});
		container.css({position:"relative",top:0}).stop().animate({marginLeft:0},speed);
		promise = true;
	};
};

/* 모바일 GNB 아코디언 */
function mGnb(){
	var mGnb1ds = $(".mGnb > li");
	var mGnb2ds = $(".mGnb > li > ul > li");
	var mGnb3ds = $(".mGnb > li > ul > li > ul > li");
	mGnb1ds.on("click", function(){
		var tg = $(this);
		var i = tg.index();
		if(!tg.hasClass("on")){
			mGnb1ds.removeClass("on");
			tg.addClass("on");
		}else{
			tg.removeClass("on");
		}
	});
	mGnb2ds.on("click", function(e){
		e.stopPropagation();
		var tg = $(this);
		var i = tg.index();
		if(!tg.hasClass("on")){
			mGnb2ds.removeClass("on");
			tg.addClass("on");
		}else{
			tg.removeClass("on");
		}
	});
	mGnb3ds.on("click", function(e){e.stopPropagation();})
};

/* 모바일 푸터 */
function mSelect(){
	$(".footer .mobileSelect > a").on("click", function(e){
		e.preventDefault();
		$(this).toggleClass("on");
		$(this).next("ul").toggleClass("on");
	})
};

