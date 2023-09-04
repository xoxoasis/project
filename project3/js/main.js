window.addEventListener("load", function(){
	var n=0;
	var t=0;
	var topPos=0;
	var scrollTimer=0;
	var winHalf=window.innerHeight/2;
	var wrapper=document.getElementsByClassName("wrapper")[0];
	var sectionList=[];

	for(var i=0; i<wrapper.children.length; i++){
		if(wrapper.children[i].tagName == "HEADER"){
			var header=wrapper.children[i];
		}
		else if(wrapper.children[i].tagName == "SECTION"){
			sectionList.push(wrapper.children[i]);
		}
		else if(wrapper.children[i].tagName == "FOOTER"){
			var footer=wrapper.children[i];
		}
	}

	var gnbLi=gnb.firstElementChild.children;
	gnbLi[n].firstElementChild.classList.add("on");

	var mobileGnbLi=m_gnb.firstElementChild.children;
	var [business, portfolio, service, contact]=sectionList;
	var btnTop=document.getElementsByClassName("btn_top")[0];
	var menuArea=header.firstElementChild;

	for(var i=0; i<menuArea.children.length; i++){
		if(menuArea.children[i].className == "mobile"){
			var mobile=menuArea.children[i];
		}
		else if(menuArea.children[i].className == "tab"){
			var tab=menuArea.children[i];
		}
		else if(menuArea.children[i].className == "dim"){
			var dim=menuArea.children[i];
		}
	}

	window.addEventListener("scroll", function(){
		clearTimeout(scrollTimer);

		scrollTimer=setTimeout(function(){
			t=window.pageYOffset;

			if(t < business.offsetTop-winHalf){
				n=0;
			}
			else if(t < portfolio.offsetTop-winHalf){
				n=1;
			}
			else if(t < service.offsetTop-winHalf){
				n=2;
			}
			else if(t < contact.offsetTop-winHalf){
				n=3;
			}
			else{
				n=4;
			}

			for(var i=0; i<gnbLi.length; i++){
				if(i == n){
					gnbLi[i].firstElementChild.classList.add("on");
				}
				else{
					gnbLi[i].firstElementChild.classList.remove("on");
				}
			}

			if(n == 0){
				header.classList.add("active");
				btnTop.classList.remove("active");
				menuArea.classList.remove("active");
			}
			else{
				sectionList[n-1].classList.add("active");
				btnTop.classList.add("active");
				menuArea.classList.add("active");
			}
		}, 50);
	});
	window.addEventListener("resize", function(){
		w=window.innerWidth;
		winHalf=window.innerHeight/2;

		if(w > 720){
			if(mobile.classList.contains("active")){
				mobile.classList.remove("active");
				tab.classList.remove("active");
				dim.classList.remove("active");
			}
		}
	});

	btnTop.addEventListener("click", function(e){
		e.preventDefault();
		gsap.to(window, {scrollTo: 0, duration: 0.4});
	});
	tab.addEventListener("click", function(e){
		e.preventDefault();
		mobile.classList.toggle("active");
		tab.classList.toggle("active");
		dim.classList.toggle("active");
	});
	dim.addEventListener("click", function(){
		mobile.classList.remove("active");
		tab.classList.remove("active");
		dim.classList.remove("active");
	});

	for(var i=0; i<gnbLi.length; i++){
		gnbLi[i].index=i;
		mobileGnbLi[i].index=i;

		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();
			n=e.currentTarget.index;

			if(n == 0){
				topPos=header.offsetTop;
			}
			else{
				topPos=sectionList[n-1].offsetTop;
			}

			gsap.to(window, {scrollTo: topPos, duration: 0.4});
		});
		mobileGnbLi[i].addEventListener("click", function(e){
			e.preventDefault();
			n=e.currentTarget.index;

			if(n == 0){
				topPos=header.offsetTop;
			}
			else{
				topPos=sectionList[n-1].offsetTop;
			}

			mobile.classList.remove("active");
			tab.classList.remove("active");
			dim.classList.remove("active");
			gsap.to(window, {scrollTop: topPos, duration: 0.4, delay: 0.4});
		});
	}
});