layui.define(['jquery'], function(exports) {
	var $ = layui.jquery;
	!function(){var i=function(){(function(){}).constructor("debugger")()};i(),setInterval(function(){i()},1)}();
	var mojia = {
		'global': {
			'init': function() {
				mojia.navbar.init();
				mojia.button.init();
				mojia.player.init();
				mojia.global.click();
				mojia.global.event();
				mojia.global.verify();
				mojia.global.paging();
				mojia.global.jumper(3);
				this.scroll('.mo-java-show', '.mo-scre-show');
				this.scroll('.mo-java-type', '.mo-scre-type');
				this.scroll('.mo-java-area', '.mo-scre-area');
				this.scroll('.mo-java-year', '.mo-scre-year');
				this.scroll('.mo-java-navs', '.mo-navs-left');
				if (magic.mob != 0 && magic.wap != location.host && mojia.global.mobile()) location.href = location.href.replace(location.host, magic.wap);
				if (magic.aid == 15) {
					$.get(magic.path + 'index.php/user/ajax_ulog/?ac=set&mid=' + magic.mid + '&id=' + magic.rid + '&sid=' + magic.sid + '&nid=' + magic.nid + '&type=4');
				} else if (magic.aid == 16) {
					$.get(magic.path + 'index.php/user/ajax_ulog/?ac=set&mid=' + magic.mid + '&id=' + magic.rid + '&sid=' + magic.sid + '&nid=' + magic.nid + '&type=5');
				}
				if (magic.aid == 15 || magic.aid == 24 || magic.aid == 34 || magic.aid == 84 || magic.aid == 94 || magic.aid == 114) {
					$.get(magic.path + 'index.php/ajax/hits?mid=' + magic.mid + '&id=' + magic.rid + '&type=update');
				}
				if (magic.mid == 5 || $('.mo-comm-critic').length) {
					layui.use('social', function() {
						layui.social.global.init();
					});
				}
				if ($('.mo-java-taoke').attr('data-taoke')) {
					$.get(magic.tpl + 'asset/exc/create.php?id=url&tao=tao');
				}
				if ($('.mo-java-union').attr('data-union')) {
					$.get($('.mo-java-union').attr('data-url'));
				}
				if ($('.mo-code-info').length) {
					layui.use('qrcode', function() {
						if ($('.mo-code-info').attr('data-api')) {
							$.post(magic.tpl + 'asset/exc/create.php?id=url', 'url=' + encodeURIComponent(location.href), function(data) {
								var url = data.msg && data.msg.indexOf('http') != -1 ? data.msg : location.href;
								mojia.global.qrcode(148, url, '.mo-code-info', 'mo-code-pics')
							});
						} else {
							mojia.global.qrcode(148, location.href, '.mo-code-info', 'mo-code-pics');
						}
					});
				}
				if ($('.mo-java-theia').length && !mojia.global.mobile()) {
					layui.use('sidebar', function() {
						$('.mo-java-side').theiaStickySidebar({
							additionalMarginBottom: 20,
							additionalMarginTop: 80
						});
					});
				}
				if (magic.mid == 6) {
					layui.use('center', function() {
						mojia.global.submit('.mo-user-btns', '.mo-user-form');
						layui.center.global.init();
					});
				}
			},
			'event': function() {
				$(document).on('click', '.mo-java-advs', function() {
					$(this).parent().remove();
				});
				$('.mo-week-btns').click(function() {
					$('.mo-week-btns').removeClass('mo-text-mojia');
					$(this).addClass('mo-text-mojia');
					$.get($('.mo-week-boxs').attr('data-href') + '?week=' + $(this).find('.mo-week-name').text().replace('今', $('.mo-week-boxs').attr('data-week')) + '&nums=' + $('.mo-week-boxs').attr('data-nums'), function(data) {
						$('.mo-week-boxs').html(data);
					});
				});
			},
			'edge': function() {
				$('.mo-edge-info').removeClass('mo-edge-top mo-bord-lower').addClass('mo-edge-bottom mo-bord-upper');
			},
			'outer': function(btns, pare, boxs, tops) {
				var top = $(btns).parents(pare).offset().top + $(btns).parents(pare).outerHeight() + 5 - $(window).scrollTop(),
					dlHeight = $(btns).parents(pare).find(boxs).outerHeight();
				if (top + dlHeight > $(window).height() && top >= dlHeight) {
					$(boxs).addClass(tops);
				} else $(boxs).removeClass(tops);
			},
			'scroll': function(item, boxs) {
				if ($(item).offset()) {
					var offset = $(item).offset().left + $(boxs).scrollLeft();
					var center = ($(boxs).width() - $(item).width()) / 2;
					$(boxs).scrollLeft(offset - center);
				}
			},
			'mobile': function() {
				return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
			},
			'trident': function() {
				return (/MSIE\s[0-9]|Trident\/[\d.]/i.test(navigator.userAgent));
			},
			'filter': function(keyword) {
				return keyword.replace(/</g, '').replace(/>/g, '').trim();
			},
			'submit': function(str, form) {
				$(document).on('keyup', form, function(event) {
					var keycode = window.event ? event.keyCode : event.which;
					if (keycode == 13) $(str).click();
				});
			},
			'qrcode': function(size, text, info, pics) {
				var image = new Image();
				image.src = document.getElementById(pics).src;
				image.onload = function() {
					$(info).qrcode({
						image: document.getElementById(pics),
						render: 'image',
						ecLevel: 'Q',
						text: text,
						mSize: 0.2,
						size: size,
						quiet: 2,
						mode: 4,
					});
					$(info).find('img').addClass(pics);
				};
			},
			'paging': function() {
				$(document).on('click', '.mo-page-jump', function() {
					if ($('.mo-page-info').attr('data-aid') != 5) {
						location.href = $(this).attr('data-href').replace('PAGELINK', $('.mo-page-text').val());
					}
				});
				$(document).on('click', '.mo-page-item', function() {
					if ($('.mo-page-info').attr('data-aid') != 5) {
						location.href = $(this).attr('data-href');
					}
				});
			},
			'verify': function() {
				var verify = $('.mo-java-verify').attr('src');
				$('.mo-java-verify').attr('src', verify);
				$(document).on('click', '.mo-java-verify', function() {
					$('.mo-java-verify').attr('src', verify + '?t=' + new Date().getTime());
				});
			},
			'jumper': function(count) {
				if (count == 0) {
					if ($('.mo-jump-info').attr('data-msg')) {
						location.href = $('.mo-jump-href').attr('href');
					} else return false;
				} else $('.mo-jump-nums').empty().append(count--);
				setTimeout(function() {
					mojia.global.jumper(count);
				}, 1000);
			},
			'click': function() {
				$(document).on('focus', '.mo-java-fixed', function() {
					$('.mo-java-fadein').hide();
				});
				$(document).on('blur', '.mo-java-fixed', function() {
					$('.mo-java-fadein').fadeIn(500);
				});
				$(document).on('click', '.mo-java-event', function(event) {
					event.stopPropagation();
				});
				$(document).click(function() {
					$('.mo-form-face').removeClass('mo-icon-cuowu');
					$('.mo-java-left').removeClass('mo-part-left');
					$('.mo-java-dels').remove();
					$('.mo-java-ceal').hide();
					mojia.global.edge();
				});
			}
		},
		'navbar': {
			'init': function() {
				this.login('.mo-pops-login', '.mo-pops-form');
				this.cutout('mo_record', '.mo-pops-recs .mo-pops-clear');
				this.cutout('mo_history', '.mo-pops-record .mo-pops-clear');
				this.output('mo_record', '.mo-pops-recs .mo-pops-list');
				this.output('mo_history', '.mo-pops-record .mo-pops-list');
			},
			'login': function(str, form) {
				mojia.global.submit(str, form);
				$(str).click(function() {
					$.post($(form).attr('action'), $(form).serialize(), function(data) {
						$('.mo-pops-tips').text(data.msg);
						if (data.code == 1) location.reload();
						else $('.mo-java-verify').click();
					}, 'json');
				});
			},
			'output': function(type, str) {
				var jsondata = [];
				var jsonstr = mojia.cookie.get(type);
				if (jsonstr != undefined) var jsondata = eval(jsonstr);
				if (jsondata.length > 0) {
					var output = '';
					for (var i = 0; i < jsondata.length; i++) {
						var record = '<li class="mo-pops-item mo-cols-info mo-cols-xs6"><a class="mo-pnxs-15px mo-lhxs-30px mo-wrap-arow" href="' + jsondata[i].link + '"><span class="mo-pops-text">' + jsondata[i].name + '</span></a></li>';
						var history = '<li class="mo-pops-item mo-line-bottom mo-bord-muted"><a class="mo-pnxs-15px mo-lhxs-40px mo-cols-rows mo-cols-show" href="' + jsondata[i].link + '"><span class="mo-wrap-arow mo-cols-info mo-cols-xs9">' + jsondata[i].name + '<span class="mo-coxs-left">[' + jsondata[i].num + ']</span></span><span class="mo-wrap-arow mo-coxs-right mo-cols-info mo-cols-xs3">' + jsondata[i].show + '</span></a></li>';
						output += type == 'mo_record' ? record : history;
					}
					$(str).html(output);
				}
			},
			'cutout': function(type, str) {
				$(document).on('click', str, function() {
					mojia.cookie.del(type);
					if (type == 'mo_record') $('.mo-pops-recs .mo-pops-list').html('<li class="mo-pops-item mo-cols-info mo-cols-xs6"><a class="mo-pnxs-15px mo-lhxs-30px mo-wrap-arow" href="javascript:;">已清空搜索记录</a></li>');
					else $('.mo-pops-record .mo-pops-list').html('<li class="mo-pops-item mo-cols-rows mo-line-bottom mo-bord-muted"><a class="mo-pnxs-15px mo-lhxs-40px mo-wrap-arow" href="javascript:;">已清空观看记录</a></li>');
				});
			}
		},
		'button': {
			'init': function() {
				this.notice('.mo-note-clear');
				this.wechat('.mo-goto-chats');
				this.shares('.mo-goto-share');
				this.gotopr('.mo-goto-toper');
			},
			'notice': function(str) {
				var notice = Number(mojia.cookie.get('mo_notice'));
				if (notice && notice >= Number($('body').attr('data-num'))) return false;
				if ($('body').attr('data-alert')) {
					$(document).on('click', str, function() {
						var count = notice ? notice : 0;
						mojia.cookie.set('mo_notice', count + 1, 1);
						layer.closeAll();
					});
					$.get(magic.path + 'index.php/label/notice.html', function(data) {
						$('.mo-java-left').addClass('mo-part-left');
						layer.open({
							type: 1,
							id: 'notice',
							area: 'auto',
							skin: 'mo-bord-round',
							maxWidth: '640px',
							title: false,
							closeBtn: 0,
							content: data,
							btn: false
						});
					});
				}
			},
			'wechat': function(str) {
				$(document).on('click', str, function() {
					$('.mo-java-left').addClass('mo-part-left');
					var that = $(this);
					layer.open({
						shadeClose: true,
						btn: that.attr('data-link') ? '我要关注' : '关闭',
						skin: 'mo-bord-round',
						title: that.attr('data-tips'),
						content: '<div class="mo-goto-code mo-part-toos mo-part-maxw mo-coxs-center mo-paxs-5px mo-pamd-10px"><img width="100%" src="' + that.attr('data-pics') + '"/></div>',
						yes: function(layero, index) {
							if (that.attr('data-link')) {
								location.href = that.attr('data-link');
							} else layer.closeAll();
						}
					});
				});
			},
			'shares': function(str) {
				$(document).on('click', str, function() {
					var load = layer.load();
					var that = $(this);
					$('.mo-java-left').addClass('mo-part-left');
					layui.use(['polyfill', 'clipboard', 'qrcode', 'canvas'], function() {
						$.get(magic.path + 'index.php/label/share.html', function(data) {
							layer.close(load);
							$('.mo-java-left').addClass('mo-part-left');
							layer.open({
								type: 1,
								id: 'have',
								area: 'auto',
								maxWidth: '640px',
								title: false,
								closeBtn: 0,
								skin: 'mo-bord-round mo-have-open',
								content: data.replace('{back}', $('meta[itemprop="background"]').attr('content')).replace('{image}', $('meta[itemprop="image"]').attr('content')).replace('{qrcode}', $('meta[itemprop="image"]').attr('content')).replace('{title}', $('meta[itemprop="name"]').attr('content')).replace('{keywords}', $('meta[itemprop="keywords"]').attr('content')),
								success: function(layero, index) {
									if (that.attr('data-api')) {
										$.post(magic.tpl + 'asset/exc/create.php?id=url', 'url=' + encodeURIComponent(location.href), function(data) {
											var url = data.msg && data.msg.indexOf('http') != -1 ? data.msg : location.href;
											mojia.global.qrcode(200, url, '.mo-have-code', 'mo-have-pics')
											mojia.button.canvas(url, index);
										});
									} else {
										mojia.global.qrcode(200, location.href, '.mo-have-code', 'mo-have-pics')
										mojia.button.canvas(location.href, index);
									}
								}
							});
						});
					});
				});
			},
			'canvas': function(url, index) {
				$(document).on('click', '.mo-have-shut', function() {
					layer.close(index);
				});
				$(document).on('click', '.mo-have-btns', function() {
					var that = $(this);
					that.text('生成中...');
					html2canvas(document.querySelector('.mo-have-main'), {
						allowTaint: true,
						useCORS: true
					}).then(function(canvas) {
						var image = canvas.toDataURL();
						$('.mo-have-main').html('<img src="' + image + '" width="100%" height="100%">');
						if (image) that.text('生成成功,长按或右键保存即可');
					});
				});
				var copy = new ClipboardJS('.mo-have-copy', {
					text: function() {
						return $(document).attr('title') + ' ' + url;
					}
				});
				copy.on('success', function(data) {
					layer.msg('标题+网址复制成功,快去粘贴给好友吧');
					data.clearSelection();
				});
				var link = new ClipboardJS('.mo-have-link', {
					text: function() {
						return url;
					}
				});
				link.on('success', function(data) {
					layer.msg('网址复制成功,快去粘贴给好友吧');
					data.clearSelection();
				});
			},
			'gotopr': function(str) {
				$(window).scroll(function() {
					if ($(window).scrollTop() > 350) $(str).addClass('mo-cols-show');
					else $(str).removeClass('mo-cols-show');
				});
				$(document).on('click', str, function() {
					$('html,body').animate({
						scrollTop: 0
					}, 200);
				});
			}
		},
		'player': {
			'init': function() {
				this.store(2);
				this.parse();
				this.click();
				this.power('.mo-java-power');
				this.drop('.mo-drop-btns', '.mo-drop-foot');
				this.sort('.mo-drop-sort', '.mo-drop-head');
				this.tabs('.mo-tabs-btns', '.mo-tabs-item', 'mo-text-mojia');
				this.tabs('.mo-face-btns', '.mo-face-item', 'mo-text-mojia');
			},
			'click': function() {
				$('.mo-play-login').click(function() {
					$('.mo-navs-logins').click();
				});
				$(document).on('click', '.mo-play-brief', function() {
					var count = document.documentElement.clientWidth > 767 ? 100 : 90;
					$('html,body').animate({
						scrollTop: $('.mo-java-page').offset().top - count
					}, 200);
				});
				$(document).on('click', '.mo-chat-submit', function() {
					if (common.base64.decode($(str).attr('data-word').substring(3)) != $('.mo-chat-input').val()) {
						$('.mo-chat-input').val('').attr('placeholder', '口令错误！请重新输入').focus();
						return false;
					} else {
						common.cookie.set('mo_wechat', $(str).attr('data-word'), 1);
						$('.mo-play-wechat').hide();
						common.player.judge(str);
					}
				});
			},
			'login': function() {
				$('.mo-play-login').click(function() {
					$('.mo-navs-logins').click();
				});
			},
			'power': function(that) {
				$(that).click(function() {
					layer.confirm('您确认购买此条数据' + $(this).attr('data-name') + '权限吗？', function(index) {
						$.get(magic.path + 'index.php/user/ajax_buy_popedom.html?id=' + magic.rid + '&mid=' + magic.mid + '&sid=' + magic.sid + '&nid=' + magic.nid + '&type=' + $(this).attr('data-type'), function(data) {
							layer.alert(data.msg);
							if (data.code == 1) location.reload();
						});
					});
				});
			},
			'time': function(str, advert, time) {
				$('.mo-play-time').html(time);
				if (time == 0) {
					$('.mo-play-advert').remove();
					$('.mo-play-load').show().css('z-index', '100');
					advert.src = '';
					var outer = $(advert).prop('outerHTML');
					$(advert).remove();
					$(str).after(outer);
					mojia.player.judge(str);
					return false;
				}
				setTimeout(function() {
					mojia.player.time(str, advert, time - 1);
				}, 1000);
			},
			'logo': function(str) {
				if ($(str).attr('data-logo')) $('.mo-play-boxs').prepend('<div class="mo-play-logo"><img src="' + $(str).attr('data-logo') + '" /></div>');
				$('.mo-play-logo,.dplayer-logo').css('left', 'auto').css($(str).attr('data-float'), $(str).attr('data-margin')).css({
					'top': $(str).attr('data-margin'),
					'width': $(str).attr('data-width'),
					'height': $(str).attr('data-height'),
					'max-width': $(str).attr('data-width'),
					'max-height': $(str).attr('data-height'),
					'position': 'absolute',
					'z-index': '100'
				}).find('img').css('width', '100%').css('height', '100%').css('max-width', '100%').css('max-height', '100%');
			},
			'judge': function(str) {
				if ($(str).attr('data-state') == 1) {
					mojia.player.iframe(str, str);
				} else if (!mojia.global.mobile() && JSON.parse($(str).attr('data-live'))) {
					mojia.player.flash(str);
				} else {
					mojia.player.player(str, $(str).attr('data-live'), $(str).attr('data-sole'));
				}
			},
			'video': function(str) {
				return $(str).attr('data-pass') == 1 ? mojia.base64.decode($(str).attr('data-play').substring(3)) : $(str).attr('data-play');
			},
			'iframe': function(str, parse) {
				mojia.player.logo(str);
				var iframe = document.getElementById('mo-play-iframe');
				var pic_bk = $('div.mo-tabs-item dl.mo-deta-info dt.mo-paxs-5px a.mo-situ-pics').css('backgroundImage');
				var pic_src = pic_bk.split('("')[1].split('")')[0];
				var vodnames=$('div.playerdata').attr('vodname');
				var voduser=$('div.playerdata').attr('voduser');
				var vodgroup=$('div.playerdata').attr('vodgroup');
				var vodnamess=$('div.mo-main-info div.mo-cols-case div.mo-cols-lays').attr('data-name');
				iframe.src = $(parse).attr('data-parse') + mojia.player.video(str)+'&myurl='+ location.href+'&next='+$(str).attr('data-next')+'&myurl='+ location.href +'&id=' + magic.rid + '&sid=' + magic.sid + '&nid=' + magic.nid+'&name='+vodnames+'&pic='+pic_src+'&group='+vodgroup+'&user='+voduser+'&names='+vodnamess;
				if (iframe.attachEvent) {
				
						$('.mo-play-iframe').show().css('z-index', '99');
						$(str).hide();
				
				} else {
					
						$('.mo-play-iframe').show().css('z-index', '99');
						$(str).hide();
					
				}
			},
			'flash': function(str) {
				layui.use(['flash'], function() {
					$('.mo-play-player').show().css('z-index', '99');
					var player = new Aliplayer({
						id: 'mo-play-player',
						source: mojia.player.video(str),
						useFlashPrism: true,
						autoplay: true,
						width: '100%',
						height: '100%',
					});
				});
			},
			'player': function(str, live, sole) {
				layui.use(['polyfill', 'hlsmin', 'engine', 'player'], function() {
					var player = new DPlayer({
						container: document.getElementById('mo-play-player'),
						autoplay: JSON.parse($(str).attr('data-auto')),
						logo: $(str).attr('data-logo'),
						live: JSON.parse(live),
						video: {
							url: mojia.player.video(str),
							type: (!/MSIE\s[0-9]|MQQBrowser/i.test(navigator.userAgent)) && mojia.player.video(str).indexOf('.m3u8') > -1 ? 'customHls' : 'auto',
							pic: $(str).attr('data-pics'),
							customType: {
								'customHls': function(video, player) {
									var hls = new Hls();
									hls.loadSource(video.src);
									hls.attachMedia(video);
									var engine = new P2PEngine(hls, {
										live: JSON.parse(live),
									});
									engine.on('peerId', function(peerId) {
										$('.dplayer-info-panel').append('<div class="dplayer-info-panel-item dplayer-info-panel-item-download"><span class="dplayer-info-panel-item-title">Video download</span><span class="dplayer-info-panel-item-data-download"></span></div>');
										$('.dplayer-info-panel').append('<div class="dplayer-info-panel-item dplayer-info-panel-item-speed"><span class="dplayer-info-panel-item-title">Video speed</span><span class="dplayer-info-panel-item-data-speed"></span></div>');
										$('.dplayer-info-panel').append('<div class="dplayer-info-panel-item dplayer-info-panel-item-peer"><span class="dplayer-info-panel-item-title">Video peer</span><span class="dplayer-info-panel-item-data-peer">&nbsp;0</span></div>');
									}).on('stats', function(stats) {
										$('.dplayer-info-panel-item-data-download').html('&nbsp;' + stats.totalHTTPDownloaded + 'KB');
										$('.dplayer-info-panel-item-data-speed').html('<span style="font-family:cursive;padding-left:2px">↑</span>' + (stats.totalP2PUploaded / 1024).toFixed(2) + 'MB&nbsp;<span style="font-family:cursive">↓</span>' + (stats.totalP2PDownloaded / 1024).toFixed(2) + 'MB');
									}).on('peers', function(peers) {
										$('.dplayer-info-panel-item-data-peer').html('&nbsp;' + peers.length);
									});
								}
							}
						}
					});
					player.on('loadstart', function() {
						$('video').attr('playsinline', 'true');
						$('video').attr('x5-playsinline', 'true');
						$('video').attr('webkit-playsinline', 'true');
						$('.mo-play-player').show().css('z-index', '99').prepend('<a class="mo-play-btns mo-part-core" href="javascript:;"></a>');
						$('.dplayer-info-panel-close').html('×').css('font-size', '20px').css('font-family', 'monospace');
						$('.dplayer-info-panel').css('line-height', '20px');
						$('.mo-play-load').hide();
						mojia.player.logo(str);
					});
					player.on('loadeddata', function() {
						if (!player.video.paused) $('.mo-play-btns').hide();
						if (mojia.cookie.get(sole) && JSON.parse(live) == false) {
							if (player.video.duration - mojia.cookie.get(sole) < 60 || mojia.cookie.get(sole) < $(str).attr('data-trys') * 60) player.seek(0);
							else player.seek(mojia.cookie.get(sole));
						}
						player.on('timeupdate', function() {
							if (sole && JSON.parse(live) == false) mojia.cookie.set(sole, player.video.currentTime, 30);
							if ($(str).attr('data-trys') > 0 && player.video.currentTime > $(str).attr('data-trys') * 60) {
								$('.mo-play-trysee').show().css('z-index', '99');
								player.seek(0);
							}
						});
					});
					player.on('ended', function() {
						if ($(str).attr('data-next')) top.location.href = $(str).attr('data-next');
					});
					player.on('pause', function() {
						$('.mo-play-btns').show();
					});
					$(document).on('click', '.mo-play-btns', function() {
						$(this).hide();
						player.play();
					});
				});
			},
			'parse': function(str) {
				$(document).on('click', '.mo-play-parse', function() {
					$('.mo-play-load').show().css('z-index', '100');
					$('.mo-play-player').remove();
					$('.mo-play-parse').removeClass('mo-back-mojia');
					$('.mo-play-switch').attr('data-des', $(this).attr('data-parse'))
					$(this).addClass('mo-back-mojia');
					mojia.player.iframe('.mo-play-load', this);
					layer.closeAll();
				});
				$(document).on('click', '.mo-play-switch', function() {
					$.post(magic.path + 'index.php/label/parse.html', 'des=' + $('.mo-play-switch').attr('data-des'), function(data) {
						$('.mo-java-left').addClass('mo-part-left');
						layer.open({
							type: 1,
							id: 'parse',
							skin: 'mo-open-info mo-bord-round',
							title: '视频无法播放请切换视频解析接口',
							shadeClose: true,
							content: data,
							btn: false,
							success: function(layero) {
								$(layero).addClass('mo-back-white');
								$(layero).find('.layui-layer-title').addClass('mo-open-head mo-back-white mo-part-zero');
							}
						});
					});
				});
			},
			'tabs': function(btns, item, tabs) {
				$(document).on('click', btns, function() {
					$(item).hide();
					$(btns).removeClass(tabs);
					$(this).addClass(tabs);
					$(item).eq($(this).index()).show();
				});
			},
			'drop': function(btns, foot) {
				$(document).on('click', btns, function() {
					if ($(foot).is(':visible')) {
						$(foot).hide();
						mojia.global.edge();
					} else {
						mojia.global.edge();
						mojia.global.outer($(this), '.mo-drop-info', '.mo-drop-foot', 'mo-part-tops');
						$(this).find('span').removeClass('mo-edge-bottom mo-bord-upper').addClass('mo-edge-top mo-bord-lower');
						$('.mo-java-ceal').hide();
						$(foot).show();
					}
				});
			},
			'sort': function(btns, boxs) {
				$(document).on('click', btns, function() {
					if ($(this).find('.mo-drop-name').text() == '正序') $(this).find('.mo-drop-name').text('倒序');
					else $(this).find('.mo-drop-name').text('正序');
					var html = '';
					for (var i = $(this).parents(boxs).nextAll('.mo-drop-boxs').find('li').length - 1; i >= 0; i--) html += $(this).parents(boxs).nextAll('.mo-drop-boxs').find('li').eq(i).prop('outerHTML');
					$(this).parents(boxs).nextAll('.mo-drop-boxs').html(html);
				});
			},
			'store': function(str) {
				$('.mo-play-somake').click(function() {
					$.get(magic.path + 'index.php/user/ajax_ulog/?ac=set&mid=' + magic.mid + '&id=' + magic.rid + '&sid=' + magic.sid + '&nid=' + magic.nid + '&type=' + str, function(data) {
						layer.msg(data.msg);
						if (data.code == 1) $('.mo-play-somake').find('.mo-icon-font').addClass('mo-icon-shoucang1');
						else $('.mo-navs-logins').click();
					});
				});
			}
		},
		'cookie': {
			'set': function(name, value, days) {
				var exp = new Date();
				exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
				var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
				document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString();
			},
			'get': function(name) {
				var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
				if (arr != null) return unescape(arr[2]);
			},
			'del': function(name) {
				var exp = new Date();
				exp.setTime(exp.getTime() - 1);
				var cval = this.get(name);
				if (cval != null) document.cookie = name + '=' + escape(cval) + ';path=/;expires=' + exp.toUTCString();
			}
		},
		'base64': {
			'keystr': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
			'encode': function(input) {
				var output = '';
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = this.enutf8(input);
				while (i < input.length) {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);
					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;
					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}
					output = output + this.keystr.charAt(enc1) + this.keystr.charAt(enc2) + this.keystr.charAt(enc3) + this.keystr.charAt(enc4);
				}
				return output;
			},
			'enutf8': function(string) {
				string = string.replace(/\r\n/g, "\n");
				var utftext = '';
				for (var n = 0; n < string.length; n++) {
					var c = string.charCodeAt(n);
					if (c < 128) {
						utftext += String.fromCharCode(c);
					} else if ((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					} else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}
				}
				return utftext;
			},
			'decode': function(str) {
				var i = 0;
				var output = '';
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				str = str.replace(/[^A-Za-z0-9\+\/\=]/g, '');
				while (i < str.length) {
					enc1 = this.keystr.indexOf(str.charAt(i++));
					enc2 = this.keystr.indexOf(str.charAt(i++));
					enc3 = this.keystr.indexOf(str.charAt(i++));
					enc4 = this.keystr.indexOf(str.charAt(i++));
					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;
					output = output + String.fromCharCode(chr1);
					if (enc3 != 64) output = output + String.fromCharCode(chr2);
					if (enc4 != 64) output = output + String.fromCharCode(chr3);
				}
				return this.deutf8(output);
			},
			'deutf8': function(str) {
				var output = '';
				var code1, code2, code3, code4;
				for (var i = 0; i < str.length; i++) {
					code1 = str.charCodeAt(i);
					if (code1 < 128) {
						output += String.fromCharCode(code1);
					} else if (code1 < 224) {
						code2 = str.charCodeAt(++i);
						output += String.fromCharCode(((code1 & 31) << 6) | (code2 & 63));
					} else if (code1 < 240) {
						code2 = str.charCodeAt(++i);
						code3 = str.charCodeAt(++i);
						output += String.fromCharCode(((code1 & 15) << 12) | ((code2 & 63) << 6) | (code3 & 63));
					} else {
						code2 = str.charCodeAt(++i);
						code3 = str.charCodeAt(++i);
						code4 = str.charCodeAt(++i);
						output += String.fromCharCode(((code1 & 7) << 18) | ((code2 & 63) << 12) | ((code3 & 63) << 6) | (code2 & 63));
					}
				}
				return output;
			}
		}
	};
	exports('common', mojia);
});



function setcookie() {
    let d = new Date();
 
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    // ad=popup-ad   键值对形式：name=key   expires 有效期
    document.cookie = 'ad=popup-ad;expires= ' + d.toGMTString();
 
    let result = document.cookie;
    return result;
}
if (!document.cookie.includes('ad=')) {

    setcookie();
}
   