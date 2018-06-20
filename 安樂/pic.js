$(function(){
		// �w�]�Ϥ��H�X�H�J���ʵe�ɶ�
		var _fadeSpeed = 600;

		// ��C�@�� .slideshow ���X�Ӱ��B�z
		$('.slideshow').each(function(){
			// �����o������ ul , li
			// �ò��ͱ��
			var $this = $(this), 
				$ul = $this.find('ul'), 
				$li = $ul.find('li'), 
				$controller = $('<div class="slideshowController"><a href="#"></a><a href="#" class="play"></a><a href="#" class="next"></a></div>').css('opacity', 0), 
				_len = $li.length, 
				_index = 0, timer, _speed = 2000;
			
			// ����Ĥ@�i�Ϥ����~�����z���׳]�� 0
			$li.eq(_index).css('z-index', 2).siblings().css('opacity', 0);
			
			// �[�J����÷�ƹ����J�����; �ƹ����X������
			$this.append($controller).hover(function(){
				$controller.stop().animate({
					opacity: 1
				});
			}, function(){
				$controller.stop().animate({
					opacity: 0
				});
			});
			
			// ���I���챱��W�������s��
			$controller.delegate('a', 'click', function(){
				// �����o���s�� class
				var $a = $(this), 
					_className = $a.attr('class');
				
				// �p�G�����O play �άO pause �s
				if(('play pause').indexOf(_className) > -1){
					// �����ثe���s�Ϯ�
					// �è̪��A�ӱҰʩΰ���p�ɾ�
					$a.toggleClass('pause').hasClass('pause') ? timer = setTimeout(autoClickNext, _fadeSpeed + _speed) : clearTimeout(timer);
					return false;
				}
				
				// ����p�ɾ�
				clearTimeout(timer);
				// ���� pause �s
				$a.siblings('.pause').removeClass('pause');
				// �̫��s�\��ӨM�w�W�U�i�Ϥ�����
				_index = ('next' == _className ? _index + 1 : _index - 1 + _len) % _len;
				// �����Ϥ�
				show();

				return false;
			});
			
			// �۰ʼ���U�@�i
			function autoClickNext() {
				_index = (_index + 1) % _len;
				show();
				timer = setTimeout(autoClickNext, _fadeSpeed + _speed);
			}
			
			// �H�J�H�X�Ϥ�
			function show() {
				$li.eq(_index).animate({
					opacity: 1, 
					zIndex: 2
				}, _fadeSpeed).siblings(':visible').animate({
					opacity: 0, 
					zIndex: 1
				}, _fadeSpeed);
			}
			
			// �p�G���]�w�w�]�۰ʼ��񪺸�
			if($this.hasClass('autoPlay')){
				$controller.find('.play').click();
			}
		});
	});