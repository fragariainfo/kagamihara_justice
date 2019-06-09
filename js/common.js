$(function(){
	/*
	var movePos = [100, 174, 160, 84, 61];

	$("img.sub").hide();
	$("ul li").hover(function() {
		$("img.sub:not(:animated)", this).slideDown("fast");
	}, function() {
		$("img.sub", this).slideUp("fast");
	});

	$(".return_top a").click(function() {
		$('html,body').animate({ scrollTop : 0 }, "fast", "swing");
		return false;
	});
	*/

	//contact_form
	(function configureContactForm(){
		var error_disp_msg = {
			required: '入力してください',
			invalid: '形式が正しくありません',
			maxlen: '最大文字数(?)を越えています',
			minlen: '最小文字数(?)を満たしていません'
		};
	    $('form#contact_form').submit(function(){
	    	if(!confirm('この内容で送信します。よろしいですか？')) return false;

	    	var $form = $(this);
	    	$form.ajaxSubmit({
		        dataType: 'json',
		        data: { _ajax_call : 1 },
		        success : function(data){
					var disp_msg = '';
		            if(data.processed == true){
		                // successed
		                $('#form_area form').slideUp(300,function(){
		                	$('#form_area .complete_area').slideDown(500);
		                });
		                return true;
		            }else{
		                // failed
		                $.each(data.error_message,function(name,msg){
		                	if(typeof msg == 'string'){
		                		disp_msg = error_disp_msg[msg];
		                	}else{
		                		disp_msg = error_disp_msg[msg[0]];
		                		disp_msg = disp_msg.replace('?',msg[1]);
		                	}
		                	if(disp_msg){
			                	$form.find('[name=cf-'+name+']').addClass('error').next('.error_msg').text(disp_msg).slideDown(200);
			                }
		                });
		                return false;
		            }
		        },
		        error: function(){
		        	alert('通信エラーが発生しました。時間を置いてから再度お試しいただくか、メールにてご連絡ください。');
		        	return false;
		        }
		    });
		    return false;
	    });
		$('form#contact_form :input').click(function(){
			$(this).removeClass('error').next('.error_msg').slideUp(200);
		});
    })();

	//imghover
	$('img.imghover').each(function(){
		var imgUrl = $(this).attr('src');
		var imgHoverUrl = imgUrl.replace(/^(.*)\.([^\.]*)$/,'$1_o.$2');
		var imgObj = new Image();
		imgObj.src = imgUrl;
		$(this).hover(function(){
			$(this).attr('src',imgHoverUrl);
		},function(){
			$(this).attr('src',imgUrl);
		});
	});

	//chara_list
	(function configureCharacterMap() {
		var charTop = $("#chara_top"), lastGroup, timers = [], hitRects = [
			{group: "hero", x: [0, 383, 468, 0], y: [69, 69, 320, 356]},
			{group: "hero", x: [-43, 211, 211, -43], y: [276, 276, 308, 308]},
			{group: "council", x: [399, 899, 899, 481], y: [60, 60, 278, 312]},
			{group: "council", x: [773, 994, 994, 773], y: [198, 198, 229, 229]},
			{group: "etc", x: [0, 287, 247, 0], y: [379, 357, 512, 512]},
			{group: "media", x: [300, 899, 899, 260], y: [369, 324, 524, 524]}
		];

		function hitTest(x, y, rx, ry) {
			var i, j, c = 0;
			for (i = 0; i < 4; ++i) {
				j = (i + 1) % 4;
				c += (rx[j] - rx[i]) * (y - ry[i]) - (x - rx[i]) * (ry[j] - ry[i]) < 0 ?
				     1 : -1;
			}
			return Math.abs(c) === 4;
		}
		function hit(event) {
			var x = event.pageX - Math.round(($("#chara_top").width() - 900) / 2) - 170,
				y = event.pageY - 73-32-10, i;
			//var x = (event.offsetX || event.layerX || event.clientX) - Math.round(($("#chara_top").width() - 900) / 2),
			//    y = (event.offsetY || event.layerY || event.clientY), i;

			for (i = 0; i < hitRects.length; ++i) {
				if (hitTest(x, y, hitRects[i].x, hitRects[i].y)) {
					return hitRects[i].group;
				}
			}
			return;
		}
		function hover(group) {
			var file = "./img/part1/character/top_on_" + group + ".png",
			    charTopHover = $("#chara_top_hover");
			if (!charTopHover.length) {
				$("<div></div>").appendTo(charTop)
				        .attr("id", "chara_top_hover")
				        .hide();
			}
			if (group !== lastGroup) {
				if (group) {
					charTopHover.show().css("background-image", "url('" + file + "')");
				} else {
					charTopHover.hide();
				}
				lastGroup = group;
			}
		}
		function charSlideIn(group) {
			if (!group) return;
			$(".chara_list:visible").stop().hide();

			for (var i = 0; i < timers.length; ++i) {
				clearTimeout(timers[i]);
			}
			timers = [];

			$("." + group).each(function(i, e) {
				timers.push(setTimeout(function() {
					var x = $(e).height() + parseInt($(e).css("margin-bottom"));
					$(e).show().css({
					        opacity: 0,
					        top: "-" + x + "px",
					        zIndex: -i
					    }).animate({
					        opacity: 1,
					        top: "0px",
					        opacity: 1
					    }, 150, "linear", function() {
					    	$(e).css("z-index", 0);
					    });
				}, i * 150));
			});
		}

		charSlideIn("media");

		charTop.click(function(e) {
			charSlideIn(hit(e));
		}).mousemove(function(e) {
			hover(hit(e));
		}).mousedown(function(e) {
			$("#chara_top_hover").animate({marginLeft: "4px", paddingTop: "4px"}, 60, "swing");
		}).mouseup(function(e) {
			$("#chara_top_hover").animate({marginLeft: "0px", paddingTop: "0px"}, 60, "swing")
		});
	})();

	//chara_list
	$('#chara_part2 .chara_list2 li:not(.selected)').click(function(){
		var chara_list = $('#chara_part2 .chara_list2 li');
		var num = chara_list.index(this);
		var zoomOuts = [], tempParam;
		switch(num % 3){
			case 0: zoomOuts = [num + 1, num + 2]; break;
			case 1: zoomOuts = [num - 1, num + 1]; break;
			case 2: zoomOuts = [num - 1, num - 2]; break;
		}
		chara_list.removeClass('selected');
		chara_list.each(function(i){
			if(i == num){
				$(this).animate({width:'699px',height:'400px'},{duration:"normal", easing:"easeInOutQuint"}).addClass('selected');
				$(this).children('div').animate({left:'0',top:'0'},{duration:"normal", easing:"easeInOutQuint"});
			}else if($.inArray(i,zoomOuts) != -1){
				$(this).animate({width:'99px',height:'400px'},{duration:"normal", easing:"easeInOutQuint"});
				$(this).children('div').animate({left:'-480px',top:'0'},{duration:"normal", easing:"easeInOutQuint"});
			}else{
				tempParam = -80;
				if($(this).hasClass('mikan')) tempParam += -55;
				else if ($(this).hasClass('dekai')) tempParam += +50;

				$(this).animate({width:'299px',height:'120px'},{duration:"normal", easing:"easeInOutQuint"});
				$(this).children('div').animate({left:'-400px',top:tempParam},{duration:"normal", easing:"easeInOutQuint"});
			}
		});
	});
});
function snsWin(url,name) {
    var w=550,h=420,l,t;
    l = Math.round(screen.width/2 - w/2);
    t = screen.height > h ? Math.round(screen.height/2 - h/2) : 0;

    return window.open(url, name, "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width="+w+",height="+h+",left="+l+",top="+t);;
}

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28044995-1']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
