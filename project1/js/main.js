$(function(){
	// ismobile
	if(!isMobile){
		$("body").addClass("fixed");
	}

	// header
	let winW;
	let deviceStatus="";

	$("#gnb > ul").hover(
		function(){
			if(deviceStatus == "pc") $("#header").addClass("active");
		},
		function(){
			if(deviceStatus == "pc") $("#header").removeClass("active");
		}
	);
	$("#gnb > ul > li > a").focusin(function(){
		if(deviceStatus == "pc") $("#header").addClass("active");
	});
	$("#gnb li:last-child li:last-child a").focusout(function(){
		if(deviceStatus == "pc") $("#header").removeClass("active");
	});
	$("#gnb > ul > li > a").click(function(e){
		e.preventDefault();

		if(deviceStatus == "mobile"){
			if($(this).next("ul").is(":visible") == false){
				$("#gnb > ul > li > a").next("ul").slideUp(300);
				$(this).next("ul").slideDown(300);
			}
			else{
				$(this).next("ul").slideUp(300);
			}

			if($(this).parent().hasClass("active") == false){
				$("#gnb > ul > li").removeClass("active");
				$(this).parent().addClass("active");
			}
			else{
				$(this).parent().removeClass("active");
			}
		}
	});

	// mobile tab
	$("#header .utils a.tab").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$("#gnb").toggleClass("active");
		$("#header").toggleClass("active2");
		$(".dim").toggleClass("active");
	});

	// main_Swiper
	var video1=document.getElementById("video1");
	var video2=document.getElementById("video2");
	var video3=document.getElementById("video3");

	video1.muted=true;
	video1.play();
	video1.addEventListener("ended", function(){
		video1.play();
	});
	video2.addEventListener("ended", function(){
		video2.play();
	});
	video3.addEventListener("ended", function(){
		video3.play();
	});

	var activeNum=0;

	var mainswiper = new Swiper(".mainSwiper", {
		speed: 1000,
		pagination: {
			el: ".mainSwiper .swiper-pagination",
			clickable: true
		},
		on: {
			transitionEnd: function(){
				activeNum=this.activeIndex;

				if(activeNum == 0){
					video1.play();
					video2.pause();
					video3.pause();
				}
				else if(activeNum == 1) {
					video2.play();
					video1.pause();
					video3.pause();
				}
				else{
					video3.play();
					video1.pause();
					video2.pause();
				}
			}
		}
	});

	// edge_swiper
	var edgeswiper=new Swiper(".edgeSwiper", {
		direction: "vertical",
		speed: 700,
		loop: true,
		autoplay: {
			disableOnInteraction: false,
			delay: 4000
		},
		on: {
			slideChange: function(){
				$("#bar").stop()
						.removeAttr("style")
						.css({width: 0})
						.animate({width: 120}, 4700);
			}
		}
	});
	$("#pause_play").click(function(e){
		e.preventDefault();

		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			edgeswiper.autoplay.start();
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			edgeswiper.autoplay.stop();
		}
	});

	// page1
	var sub1swiper=new Swiper(".sub1Swiper", {
		slidesPerView: 4,
		spaceBetween: 0,
		navigation: {
			nextEl: ".sub1Swiper .swiper-button-next",
			prevEl: ".sub1Swiper .swiper-button-prev",
		},
		breakpoints: {
			1700: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 2,
			},
			0: {
				slidesPerView: 1
			}
		}
	});

	var swapN;

	$("#page1 .product_inner .swiper-slide").hover(
		function(){
			$(this).addClass("on");
			swapN=$(this).index();
			$(".bg").removeClass("active");
			$(".bg").eq(swapN).addClass("active");
		},
		function(){
			$(this).removeClass("on")
			swapN=null;
			$(".bg").removeClass("active");
		}
	)

	// family site
	$(".family_site .title").click(function(e){
		e.preventDefault();

		$(this).toggleClass("active");

		if($(".family_site .content").hasClass("active") == false){
			$(".family_site .content").show();
			setTimeout(function(){
				$(".family_site .content").addClass("active");
			}, 500);
		}
		else{
			$(".family_site .content").removeClass("active");
		}
	});
	$(".family_site .content").on("transitionend", function(){
		if($(this).hasClass("active") == false){
			$(this).removeAttr("style");
		}
	});

	// mousewheel event
	var n=0; 
	var h; 
	var pos=0; 
	var timer=0; 
	var total=3; 

	function init(){
		$("#index").addClass("active");
	}
	init();

	$(document).mousewheel(function(e, delta){
		if($("html").is(":animated")) return;
		if($("#gnb").hasClass("active")) return;
		if($("html").is(":animated") || isMobile) return;

		if(delta > 0){
			if(n > 0){
				n-=1
			}

			if($("#header").hasClass("fixed") == false){
				$("#header").addClass("fixed");
				$("#header").css({top: -136})
						.delay(500)
						.animate({top: 0}, 300);
			}
		}
		else{
			if(n < total){
				n+=1;
			}

			if($("#header").hasClass("fixed") == true){
				$("#header").removeAttr("class");
				$("#header").removeAttr("style");
			}
		}

		if(n != total){
			pos=n*h;
		}
		else {
			pos=$(document).height()-$(window).height();
		}

		pos=n*h;

		$("html").animate({scrollTop: pos}, 500, function(){
			if(n == 0){
				$("#index").addClass("active");
			}
			else if(n == total){
			}
			else{
				$("#page"+n).addClass("active");
			}
		});

		if(n == 2){
			$("#header").addClass("color");
		}
		else{
			$("#header").removeClass("color");
		}
	});

	$(window).resize(function(){
		clearTimeout(timer);
		winW=window.innerWidth;

		if(winW > 1024){
			deviceStatus="pc";
		}
		else{
			deviceStatus="mobile";
		}

		if(deviceStatus == "pc"){
			$("#header .utils a.tab").removeClass("active");
			$("#gnb").removeClass("active");
			$("#header").removeClass("active2");
			$(".dim").removeClass("active");
			$("#gnb ul ul").slideDown(300);
		}
		else{
			$("#gnb ul ul").slideUp(300);
			$("#gnb > ul > li").removeClass("active");
		}

		if(isMobile) return;

		timer=setTimeout(function(){
			h=$(window).height();
			pos=n*h;
			$("html").animate({scrollTop: pos}, 800);
		}, 100);
	});
	$(window).trigger("resize")
});