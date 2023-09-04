$(function(){
	// 1) navigation 관련
	$(".nav > ul > li").hover(
		function(){
			$(this).parent().addClass("over");
		},
		function(){
			$(this).parent().removeClass("over");
		}
	);
	$(".nav > ul > li").focusin(function(){
		$(this).addClass("over");
	});
	$(".nav > ul > li").focusout(function(){
		$(this).removeClass("over");
	});
	$(".nav > ul > li:first-child").focusin(function(){
		$(this).parent().addClass("over");
	});
	$(".nav li:last-child li:last-child").focusout(function(){
		$(this).parent().parent().removeClass("over");
		$(this).parent().parent().parent().removeClass("over");
	});

	// 2) slider 관련
	var w;
	var total=4;
	var amount=0;

	$(window).resize(function(){
		w=$(window).width();

		if(w > 1200){
			distance=w;
		}
		else{
			distance=1200;
		}
		$(".hero .gallery").css({width:distance*total});
	});
	$(window).trigger("resize");

	$(".direction_nav .left").click(function(e){ // 오른쪽으로 이동
		e.preventDefault();

		if($(".gallery").is(":animated")){
			return false;
		}

		$(".gallery").prepend($(".gallery li").last());
		amount-=distance;
		$(".gallery").css({left:amount});
		

		amount+=distance;
		$(".gallery").animate({left:amount}, 500);
	});
	$(".direction_nav .right").click(function(e){ // 왼쪽으로 이동
		e.preventDefault();

		if($(".gallery").is(":animated")){
			return false;
		}

		amount-=distance;
		$(".gallery").animate({left:amount}, 500, function(){
			$(this).append($(".gallery li").first());
			amount+=distance;
			$(this).css({left : amount});
		});
	});
});