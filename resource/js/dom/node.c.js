
(function(){
var queryer = 'queryer',
	getter = 'getter',
	getter_first = 'getter_first',
	operator = 'operator',
	operator__queryer = 'operator,queryer';
QW.NodeC = {
	getterType : getter_first,
	arrayMethods : 'map,forEach,filter,toArray'.split(','),//����Array�ķ���Ҳ�Ἧ�ɵ�NodeW��
	wrapMethods : { 
		//queryer ������ֵ���İ�װ���
		//getter ��ʵ����
		//getter_first �����array���򷵻ص�һ��ִ�еķ���ֵ
		//operator ����Ǿ�̬���������ص�һ�������İ�װ�������ԭ�ͷ��������ر���
		//operator,queryer ��һ��operator����������ֵ��Ԫ�أ�����ͬquery

		//NodeHϵ��
		$ : queryer ,
		one : queryer ,
		query : queryer ,
		getElementsByClass : queryer ,
		outerHTML : getter_first ,
		hasClass : getter_first ,
		addClass : operator ,
		removeClass : operator ,
		replaceClass : operator ,
		toggleClass : operator ,
		show : operator ,
		hide : operator ,
		toggle : operator ,
		isVisible : getter_first ,
		getXY : getter_first ,
		setXY : operator ,
		setSize : operator ,
		setInnerSize : operator ,
		setRect : operator ,
		setInnerRect : operator ,
		getSize : getter_first ,
		getRect : getter_first ,
		nextSibling : queryer ,
		previousSibling : queryer ,
		ancestorNode : queryer ,
		parentNode : queryer ,
		firstChild : queryer ,
		lastChild : queryer ,
		contains : getter_first ,
		insertAdjacentHTML : operator ,
		insertAdjacentElement : operator__queryer ,
		appendChild : operator__queryer ,
		insertSiblingBefore : operator__queryer ,
		insertSiblingAfter : operator__queryer ,
		insertBefore : operator__queryer ,
		insertAfter : operator__queryer ,
		replaceNode : operator__queryer ,
		replaceChild : operator__queryer ,
		removeNode : operator__queryer ,
		removeChild : operator__queryer ,
		get : getter_first ,
		set : operator ,
		getAttr : getter_first ,
		setAttr : operator ,
		removeAttr : operator ,
		getValue : getter_first ,
		setValue : operator ,
		getHtml : getter_first ,
		setHtml : operator ,
		encodeURIForm : getter_first ,
		isFormChanged : getter_first ,
		cloneNode : operator__queryer ,
		getStyle : getter_first ,
		getCurrentStyle : getter_first ,
		setStyle : operator ,
		borderWidth : getter_first ,
		paddingWidth : getter_first ,
		marginWidth : getter_first,

		//TargetHϵ��
		//����

		//JssTargetHϵ��
		getOwnJss : getter_first,
		getJss : getter_first,
		setJss : operator,
		removeJss : operator,

		//ArrayHϵ��
		map : '',
		forEach : 'operator' ,
		map : '',
		filter : 'queryer',
		toArray :''
	},
	gsetterMethods : { //�ڴ�json��ķ���������һ��getter��setter�Ļ����
		val : ['getValue','setValue'],
		html : ['getHtml','setHtml'],
		attr : ['','getAttr','setAttr'],
		css : ['','getCurrentStyle','setStyle'],
		size : ['getSize', 'setSize'],
		xy : ['getXY', 'setXY']
	}
};

})();