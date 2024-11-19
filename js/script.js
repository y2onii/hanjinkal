console.log("Thank you for visit hanjinkal.");

//비주얼 슬라이드
$(document).ready(function(){
  $(".image_slide").slick({
    slidesToShow:1,
		slidesToScroll:1,
		arrows:true,
		fade:true,
		dots:true,
		autoplay: true,
		speed:1500,
		infinite:true,
		autoplaySpeed:5000,
		pauseOnHover:false,
		appendDots:".slick-pagination",
		zIndex:1,
		cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)",
		prevArrow:false,
		nextArrow:false,
		customPaging:function(slider, i) {
			return '<button class="circle-dots"><svg><circle class="circle" cx="9.5" cy="12" r="8.7"></circle></svg></button>';
		}
  });
});

// 서비스 섹션
gsap.registerPlugin(ScrollTrigger);

function init() {
  
	ScrollTrigger.matchMedia({
		"(min-width: 769px)": function() {  
			const service = document.querySelector(".main_service .service .contents");
			let mainservice = gsap.timeline({
					scrollTrigger:{
							trigger:".main_service",                    
							pin:".service_pin",           
							start:'top top',
							end: () => "+=" + (service.scrollHeight + window.innerHeight/4),
							scrub: 1,
							invalidateOnRefresh:true, 
					}
			});
			const servicetl = gsap.timeline({
					scrollTrigger:{
							trigger:".main_service",
							start: "top top",
							end: "bottom",
							scrub: true,
							invalidateOnRefresh:true, 
					}
			});

			const service_contents = gsap.utils.toArray(".main_service .service .contents li"); 
			const service_images = gsap.utils.toArray(".main_service .service_images .images"); 
			service_images.forEach((img, i) => {
					if (service_images[i + 1]) {                    
						servicetl.to(img, { opacity: 0 })
										.to(service_images[i + 1],{ opacity: 1 },"<")                              
					}
					
			});
			servicetl.to({}, {}, "+=1.6");
			service_contents.forEach((text,i)=>{
					ScrollTrigger.create({
							trigger:text,
							start:"50% 70%",
							endTrigger:text[i+1],
							end: "bottom 50%",
							invalidateOnRefresh:true, 
							toggleClass: {targets: text, className: "active"},
							//markers:true
					})
			});
		},

		"(max-width: 768px)": function() { 
			let wiHeight = $(window).outerHeight();
			let contents = document.querySelector(".main_service .service .contents")
			let pinAmount = $(".main_service .service .contents").outerHeight();
			let contentsTit = document.querySelector("#main_item .main_service .text_item");
			let mobileservice =gsap.timeline({
					scrollTrigger:{
							trigger:".main_service",                    
							pin:".service_inner",           
							start:'top top',
							end: () => "+=" + (contents.scrollHeight + window.innerHeight/4),
							scrub: 0.5,
							invalidateOnRefresh:true, 
					}
			})
			mobileservice.to(contentsTit,{
					y:() => `-=${pinAmount-wiHeight/2}`,
					ease: "none"
			})
			mobileservice.to(contents,{
					y:() => `-=${pinAmount-wiHeight/0}`,
					ease: "none"
			},"<")  
			const mobile_servicetl = gsap.timeline({
				scrollTrigger:{
						trigger:".main_service",
						start: "top top",
						end: "bottom",
						scrub: true,
						invalidateOnRefresh:true, 
				}
			}); 
			
			const mobile_service_contents = gsap.utils.toArray(".main_service .service .contents li");
			const mobile_service_images = gsap.utils.toArray(".main_service .service_images .images"); 
			mobile_service_images.forEach((img, i) => {
					if (mobile_service_images[i + 1]) {                    
						mobile_servicetl.to(img, { opacity: 0 })
										.to(mobile_service_images[i + 1],{ opacity: 1 },"<")                              
					}
					
			});
			mobile_servicetl.to({}, {}, "+=1");           
			mobile_service_contents.forEach((text,i)=>{
					ScrollTrigger.create({
							trigger:text,
							start:"top 50%",
							end: "bottom 0",
							invalidateOnRefresh:true, 
							toggleClass: {targets: text, className: "active"},
							scrub: 0.5,
							//markers:true
					})               
			})  
		}
	});

	window.addEventListener("resize", ScrollTrigger.update);
	
}

window.addEventListener("load", function(){
	init();
});


// ESG 경영 섹션
$(window).resize(function() {
	if($(window).width() < 769)
	{
		// 반응형 ESG 경영
		management_slide = new Swiper(".management_slide", {
			slidesPerView:"auto",
			scrollbar: {
				el:".management_scrollbar",
				draggable:true,
			},
		});
		
		$("#main_item .main_management .management_slide .swiper-slide").removeClass("active");
		$("#main_item .main_management .management_slide .swiper-slide:first-child").addClass("active");
	} 
	else 
	{	
		$("#main_item .main_management .management_slide .swiper-slide").click(function(){
			$(this).addClass("active");
			$(this).siblings().removeClass("active");
		});
	}
}).resize();

// 뉴스룸 섹션
const news_slide = new Swiper(".news_wrap", {
	slidesPerView:"auto",
	speed:1400,
	spaceBetween:45,
	scrollbar: {
		el:".news_scrollbar",
		draggable:true,
	},
	on: {
		slideChange:function () {
			$(".swiper-slide:eq("+(this.realIndex + 1)+")").addClass('on').siblings().removeClass("on")
		}
	},
	breakpoints: {
		1024: {
			spaceBetween:40
		},
		768: {
			spaceBetween:40
		}
	}
});

// 반응형 적용
$(window).resize(function() {
	if($(window).width() < 1025)
	{	
		// 반응형 메인메뉴
		$("#top_contents .mobile_menu_open").click(function(){
			$("#top_contents .mobile_nav").addClass("open");
			$("#top_contents .mobile_menu_open").hide();
		});
		$("#top_contents .mobile_menu_close").click(function(){
			$("#top_contents .mobile_nav").removeClass("open");
			$("#top_contents .mobile_menu_open").show();
		});
		$("#top_contents .mobile_menu .menu_list ul").hide();
		$("#top_contents .mobile_menu .menu_list > li > button").click(function(){
			if($(this).next().is(":visible"))
			{
				$("#top_contents .mobile_menu .menu_list ul").slideUp();
				$(this).removeClass("on");
				$("#top_contents .mobile_menu .menu_list > li > button::before").removeClass("on");
			}
			else
			{
				$("#top_contents .mobile_menu .menu_list > li > button").removeClass("on");
				$(this).addClass("on");
				$("#top_contents .mobile_menu .menu_list > li > button::before").addClass("on");
				$("#top_contents .mobile_menu .menu_list ul").slideUp();
				$(this).next().slideDown();
			}
		});
		$("#top_contents .mobile_menu .menu_list li ul li button").click(function(){
			if($(this).next().is(":visible"))
			{
				$("#top_contents .mobile_menu .menu_list li ul li ul").slideUp();
				$(this).removeClass("on");
			}
			else
			{
				$("#top_contents .mobile_menu .menu_list li ul li button").removeClass("on");
				$(this).addClass("on");
				$("#top_contents .mobile_menu .menu_list li ul li ul").slideUp();
				$(this).next().slideDown();
			}
		});

		$("#top_contents .mobile_menu .menu_list ul li a.news").click(function(){
			$(this).addClass("on");
		});

		$("#top_contents .mobile_menu .menu_list ul li ul li a").click(function(){
			$(this).addClass("on");
		});

		// 탑 버튼
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) { 
					$(".top_btn").fadeIn();
					$('#top_contents').addClass("on");
			} else {
					$(".top_btn").fadeOut();
					$('#top_contents').removeClass("on");
			}
		});
		$(".top_btn").click(function() {
				$('body,html').animate({
						scrollTop: 0
				}, 500);  
				return false;
		});
	}
	else
	{
		// 사이트맵
		$("#sitemap_open").click(function(){
			$("#top_contents .sitemap").addClass("open");
		});
		$("#sitemap_close").click(function(){
			$("#top_contents .sitemap").removeClass("open");
		});

		// PC 메인메뉴
		$(function(){
			var $subMenu = $("#top_contents #main_menu .list > li"),
					$header = $("#top_contents"),
					$headerHeight = $header.outerHeight();

			$subMenu.mouseenter(function(){
				var mainMenu = $(this);
				var subHeight = mainMenu.find(".sub_contents").outerHeight();
				$header.stop().animate({height: $headerHeight + subHeight + "px"},0);
				mainMenu.find(".sub_contents").show();
			});
			$subMenu.mouseout(function(){
				$header.stop().animate({height: $headerHeight + "px"},0);
			});
		});
	}
}).resize();

// 패밀리사이트
$(".bottom_contents .contents").click(function(){
	if($(this).hasClass("on"))
	{
		$(this).focus().removeClass("on");
		$(".site").slideToggle();
	} 
	else
	{
		$(this).focus().addClass("on");
		$(".site").slideToggle();
	}
});

// 스크롤탑
$(document).ready(function(){
  $(".top_btn").hide(); 
 
    $(function () {
        $(window).scroll(function() {
          if($(this).scrollTop() > 100) { 
              $(".top_btn").fadeIn();
              $('#top_contents').addClass("on");
          } else {
              $(".top_btn").fadeOut();
              $('#top_contents').removeClass("on");
          }
      });
      $(".top_btn").click(function() {
          $('body,html').animate({
              scrollTop: 0
          }, 500);  
          return false;
      });
    }); 
});

// 서브네비
$("#sub_visual .sub_nav li").click(function(){
	if($(this).hasClass("on"))
	{
		$(this).focus().removeClass("on");
	} 
	else
	{
		$(this).focus().addClass("on");
		$(this).siblings().removeClass("on");
	}
});

// WOW animation
new WOW().init();








