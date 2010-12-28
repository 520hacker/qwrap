//test
void function () {
	var mix=QW.ObjectH.mix,
		HH = QW.HelperH,
		NodeC = QW.NodeC,
		NodeH = QW.NodeH,
		EventTargetH = QW.EventTargetH,
		JssTargetH = QW.JssTargetH,
		DomU = QW.DomU,
		NodeW = QW.NodeW,
		EventW = QW.EventW;
	/*
	 * EventTarget Helper onfire ������չ
	 * @class EventTargetH
	 * usehelper QW.EventTargetH
	*/

	EventTargetH.fireHandler = function (element, e, handler, name) {
		var we = new EventW(e);
		return handler.call(element, we);
	};



	/**
	*@class NodeW Element��װ����
	* <p>NodeW���˼���NodeH�ķ���֮�⣬Ҳ���Ը���ʵ����Ҫ���ɸ���ķ�����֧���������ֵ��÷�ʽ</p>
	* <p>���췽ʽ��var w=new NodeW(core);</p>
	* <p>������ʽ��var w=NodeW(sSelector,refEl);</p>
	*@namespace QW
	*/

	/** 
	* ���element�����outerHTML����
	* @method	outerHTML
	* @param	{object}				doc		(Optional)document Ĭ��Ϊ ��ǰdocument
	* @return	{string}				����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* �ж�element�Ƿ����ĳ��className
	* @method	hasClass
	* @param	{string}				className	��ʽ��
	* @return	{boolean}				����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element���className
	* @method	addClass
	* @param	{string}				className	��ʽ��
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* �Ƴ�elementĳ��className
	* @method	removeClass
	* @param	{string}				className	��ʽ��
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* �滻element��className
	* @method	replaceClass
	* @param	{string}				oldClassName	Ŀ����ʽ��
	* @param	{string}				newClassName	����ʽ��
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* element��className1��className2�л�
	* @method	toggleClass
	* @param	{string}				className1		��ʽ��1
	* @param	{string}				className2		(Optional)��ʽ��2
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ��ʾelement����
	* @method	show
	* @param	{string}				value		(Optional)display��ֵ Ĭ��Ϊ��
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����element����
	* @method	hide
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����/��ʾelement����
	* @method	toggle
	* @param	{string}				value		(Optional)��ʾʱdisplay��ֵ Ĭ��Ϊ��
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* �ж�element�����Ƿ�ɼ�
	* @method	isVisible
	* @return	{boolean}				����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡelement�������doc��xy����
	* @method	getXY
	* @return	{array}					x, y	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����element�����xy����
	* @method	setXY
	* @param	{int}					x			(Optional)x���� Ĭ�ϲ�����
	* @param	{int}					y			(Optional)y���� Ĭ�ϲ�����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����element�����offset���
	* @method	setSize
	* @param	{int}					w			(Optional)�� Ĭ�ϲ�����
	* @param	{int}					h			(Optional)�� Ĭ�ϲ�����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����element����Ŀ��
	* @method	setInnerSize
	* @param	{int}					w			(Optional)�� Ĭ�ϲ�����
	* @param	{int}					h			(Optional)�� Ĭ�ϲ�����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����element�����offset��ߺ�xy����
	* @method	setRect
	* @param	{int}					x			(Optional)x���� Ĭ�ϲ�����
	* @param	{int}					y			(Optional)y���� Ĭ�ϲ�����
	* @param	{int}					w			(Optional)�� Ĭ�ϲ�����
	* @param	{int}					h			(Optional)�� Ĭ�ϲ�����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����element����Ŀ�ߺ�xy����
	* @method	setRect
	* @param	{int}					x			(Optional)x���� Ĭ�ϲ�����
	* @param	{int}					y			(Optional)y���� Ĭ�ϲ�����
	* @param	{int}					w			(Optional)�� Ĭ�ϲ�����
	* @param	{int}					h			(Optional)�� Ĭ�ϲ�����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ��ȡelement����Ŀ��
	* @method	getSize
	* @return	{object}				width,height	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡelement����Ŀ�ߺ�xy����
	* @method	setRect
	* @return	{object}				width,height,left,top,bottom,right	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����ȡelement���󸴺��������ֵܽڵ�
	* @method	nextSibling
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ǰ��ȡelement���󸴺��������ֵܽڵ�
	* @method	previousSibling
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ���ϻ�ȡelement���󸴺��������ֵܽڵ�
	* @method	previousSibling
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ���ϻ�ȡelement���󸴺��������ֵܽڵ�
	* @method	previousSibling
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodeW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ���ϻ�ȡelement���󸴺��������ֵܽڵ�
	* @method	parentNode
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodeW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element��������ʼλ�û�ȡ���������Ľڵ�
	* @method	firstChild
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodeW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element�����ڽ���λ�û�ȡ���������Ľڵ�
	* @method	lastChild
	* @param	{string}				selector	(Optional)��ѡ���� Ĭ��Ϊ�ռ�������ֵܽڵ�
	* @return	{NodeW}					�ҵ���node��null	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* �ж�Ŀ���Ƿ���element���������ڵ�
	* @method	contains
	* @param	{element|string|wrap}	target		Ŀ�� id,Elementʵ����wrap
	* @return	{boolean}				�жϽ��	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element����ǰ/������ʼ���ڽ�β����html
	* @method	insertAdjacentHTML
	* @param	{string}				type		λ������
	* @param	{element|string|wrap}	html		�����html
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ��element����ǰ/������ʼ���ڽ�β����element����
	* @method	insertAdjacentElement
	* @param	{string}				type		λ������
	* @param	{element|string|wrap}	target		Ŀ��id,Elementʵ����wrap
	* @return	{NodeW}					Ŀ��element����	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element������׷��element����
	* @method	firstChild
	* @param	{element|string|wrap}	target		Ŀ��id,Elementʵ����wrap
	* @return	{NodeW}					Ŀ��element����	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element����ǰ����element����
	* @method	insertSiblingBefore
	* @param	{element|string|wrap}	nelement	Ŀ��id,Elementʵ����wrap
	* @return	{NodeW}					Ŀ��element����	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element��������element����
	* @method	insertSiblingAfter
	* @param	{element|string|wrap}	nelement	Ŀ��id,Elementʵ����wrap
	* @return	{NodeW}					Ŀ��element����	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element�����ڲ���ĳԪ��ǰ����element����
	* @method	insertBefore
	* @param	{element|string|wrap}	nelement	Ŀ��id,Elementʵ����wrap
	* @param	{element|string|wrap}	relement	���뵽id,Elementʵ����wrapǰ
	* @return	{NodeW}					Ŀ��element����	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element�����ڲ���ĳԪ�غ����element����
	* @method	insertAfter
	* @param	{element|string|wrap}	nelement	Ŀ��id,Elementʵ����wrap
	* @param	{element|string|wrap}	nelement	���뵽id,Elementʵ����wrap��
	* @return	{NodeW}					Ŀ��element����	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ���Լ���Ŀ���滻
	* @method	replaceNode
	* @param	{element|string|wrap}	target		Ŀ��id,Elementʵ����wrap
	* @return	{NodeW}					���滻�ɹ����˷����ɷ��ر��滻�Ľڵ㣬���滻ʧ�ܣ��򷵻� NULL	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element���relement�滻��nelement
	* @method	replaceChild
	* @param	{element|string|wrap}	nelement	�½ڵ�id,Elementʵ����wrap
	* @param	{element|string|wrap}	relement	���滻��id,Elementʵ����wrap��
	* @return	{NodeW}					���滻�ɹ����˷����ɷ��ر��滻�Ľڵ㣬���滻ʧ�ܣ��򷵻� NULL	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element�Ƴ���
	* @method	removeNode
	* @return	{NodeW}					��ɾ���ɹ����˷����ɷ��ر�ɾ���Ľڵ㣬��ʧ�ܣ��򷵻� NULL��	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��element���target�Ƴ���
	* @method	removeChild
	* @param	{element|string|wrap}	target		Ŀ��id,Elementʵ����wrap��
	* @return	{NodeW}					��ɾ���ɹ����˷����ɷ��ر�ɾ���Ľڵ㣬��ʧ�ܣ��򷵻� NULL��	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��Ԫ�ص���ObjectH.get
	* @method	get
	* @param	{string}				property	��Ա����
	* @return	{object}				��Ա����	����Ƕ��element�İ�װ�򷵻ؽ������
	* @see ObjectH.getEx
	*/

	/** 
	* ��Ԫ�ص���ObjectH.set
	* @method	set
	* @param	{string}				property	��Ա����
	* @param	{object}				value		��Ա����/����
	* @return	{NodeW}					�Լ�
	* @see ObjectH.setEx
	*/
	
	/** 
	* ��ȡelement���������
	* @method	getAttr
	* @param	{string}				attribute	��������
	* @param	{int}					iFlags		(Optional)ieonly ��ȡ����ֵ�ķ������� ����ֵ0,1,2,4 
	* @return	{string}				����ֵ ie���п��ܲ���object		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����element���������
	* @method	setAttr
	* @param	{string}				attribute	��������
	* @param	{string}				value		���Ե�ֵ
	* @param	{int}					iCaseSensitive	(Optional)
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ɾ��element���������
	* @method	removeAttr
	* @param	{string}				attribute	��������
	* @param	{int}					iCaseSensitive	(Optional)
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ������������element��Ԫ��
	* @method	query
	* @param	{string}				selector	����
	* @return	{array}					elementԪ������		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����element�����а���className�ļ���
	* @method	getElementsByClass
	* @param	{string}				className	��ʽ��
	* @return	{array}					elementԪ������		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡelement��value
	* @method	getValue
	* @return	{string}				Ԫ��value		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����element��value
	* @method	setValue
	* @param	{string}				value		����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ��ȡelement��innerHTML
	* @method	getHTML
	* @return	{string}				����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����element��innerHTML
	* @method	setHtml
	* @param	{string}				value		����
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ���form������elements����valueת������'&'���ӵļ�ֵ�ַ���
	* @method	encodeURIForm
	* @param	{string}	filter	(Optional)	���˺���,�ᱻѭ�����ô��ݸ�item������Ҫ�󷵻ز���ֵ�ж��Ƿ����
	* @return	{string}					��'&'���ӵļ�ֵ�ַ���		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* �ж�form�������Ƿ��иı�
	* @method	isFormChanged
	* @param	{string}	filter	(Optional)	���˺���,�ᱻѭ�����ô��ݸ�item������Ҫ�󷵻ز���ֵ�ж��Ƿ����
	* @return	{bool}					�Ƿ�ı�		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ���element�������ʽ
	* @method	getStyle
	* @param	{string}				attribute	��ʽ��
	* @return	{string}				����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ���element����ǰ����ʽ
	* @method	getCurrentStyle
	* @param	{string}				attribute	��ʽ��
	* @return	{string}				����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ����element�������ʽ
	* @method	setStyle
	* @param	{string}				attribute	��ʽ��
	* @param	{string}				value		ֵ
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ��ȡelement�����border���
	* @method	borderWidth
	* @return	{array}					topWidth, rightWidth, bottomWidth, leftWidth	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡelement�����padding���
	* @method	paddingWidth
	* @return	{array}					topWidth, rightWidth, bottomWidth, leftWidth	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡelement�����margin���
	* @method	marginWidth
	* @return	{array}					topWidth, rightWidth, bottomWidth, leftWidth	����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡ�������ö����value����		��һ��������setValue,����������getValue
	* @method	val
	* @return	{NodeW|string}			����ʱ�������Լ� ��ȡʱ�����ַ�		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡ�������ö����innerHTML����	��һ��������setHTML,����������getHTML
	* @method	html
	* @return	{NodeW|string}			����ʱ�������Լ� ��ȡʱ�����ַ�		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡ�������ö����Attribute����	������������setAttr,һ��������getAttr
	* @method	attr
	* @return	{NodeW|string}			����ʱ�������Լ� ��ȡʱ�����ַ�		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡ�������ö���ǰ��style����	������������setStyle,һ��������getCurrentStyle
	* @method	css
	* @return	{NodeW|string}			����ʱ�������Լ� ��ȡʱ�����ַ�		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡ�������ö���ǰ�Ĵ�С����	��һ��������������setSize,����������getSize
	* @method	size
	* @return	{NodeW|object}			����ʱ�������Լ� ��ȡʱ����{width:...,height:...}		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��ȡ�������ö���ǰ�Ĵ�С����	��һ��������������setXY,����������getXY
	* @method	xy
	* @return	{NodeW|array}			����ʱ�������Լ� ��ȡʱ����[x,y]		����Ƕ��element�İ�װ�򷵻ؽ������
	*/

	/** 
	* ��Ӷ�ָ���¼��ļ���
	* @method	on
	* @param	{string}	oldname		�¼�����
	* @param	{function}	handler		�¼��������
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* �Ƴ���ָ���¼��ļ���
	* @method	un
	* @param	{string}	oldname		(Optional)�¼�����
	* @param	{function}	handler		(Optional)�¼��������
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ����¼�ί��
	* @method	delegate
	* @param	{string}	selector	ί�е�Ŀ��
	* @param	{string}	oldname		�¼�����
	* @param	{function}	handler		�¼��������
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* �Ƴ��¼�ί��
	* @method	undelegate
	* @param	{string}	selector	(Optional)ί�е�Ŀ��
	* @param	{string}	oldname		(Optional)�¼�����
	* @param	{function}	handler		(Optional)�¼��������
	* @return	{NodeW}					�Լ�
	*/

	/** 
	* ���������ָ���¼�
	* @method	fire
	* @param	{string}	oldname	�¼�����
	* @return	{NodeW}		�Լ�
	*/

	/** 
	* �󶨶����click�¼�����ִ��click����
	* @method	click
	* @param	{function}	handler	(Optional)�¼�ί��
	* @return	{NodeW}		�Լ�
	*/

	/** 
	* �󶨶����submit�¼�����ִ��submit����
	* @method	submit
	* @param	{function}	handler	(Optional)�¼�ί��
	* @return	{NodeW}		�Լ�
	*/

	/** 
	* �󶨶����focus�¼�����ִ��focus����
	* @method	focus
	* @param	{element}	element	Ҫ�����¼��Ķ���
	* @param	{function}	handler	(Optional)�¼�ί��
	* @return	{NodeW}		�Լ�
	*/

	/** 
	* �󶨶����blur�¼�����ִ��blur����
	* @method	blur
	* @param	{element}	element	Ҫ�����¼��Ķ���
	* @param	{function}	handler	(Optional)�¼�ί��
	* @return	{NodeW}		�Լ�
	*/

	/** 
	* ��¡Ԫ��
	* @method	cloneNode
	* @param	{bool}		bCloneChildren	(Optional) �Ƿ���ȿ�¡ Ĭ��ֵfalse
	* @return	{element}					��¡���Ԫ��
	*/

	NodeW.pluginHelper(NodeH,NodeC.wrapMethods,NodeC.gsetterMethods);
	NodeW.pluginHelper(EventTargetH,'operator');
	NodeW.pluginHelper(JssTargetH,NodeC.wrapMethods,{jss : ['','getJss', 'setJss']});
	var ah=QW.ObjectH.dump(QW.ArrayH,NodeC.arrayMethods);
	HH.methodizeTo(ah, NodeW.prototype,null,NodeC.wrapMethods);	//ArrayH��ĳЩ����
	for(var i in ah){//�����������⣺filter�����ص�Ӧ���ǰ�װ��ȴ��array
		if(NodeC.wrapMethods[i]=='queryer'){
			NodeW.prototype[i] = (function(fun){
				return function(){
					var args=[this].concat([].slice.call(arguments,0)),
						ret=fun.apply(null,args);
					return new NodeW(ret);
				};
			})(ah[i]);
		}
	}

	/**
	* @class Dom ��QW.DomU��QW.NodeH�ϲ���QW.Dom��Ը��ɵĴ��뱣��һ��
	* @singleton 
	* @namespace QW
	*/
	var Dom = QW.Dom = {};
	mix(Dom, [DomU, NodeH, EventTargetH, JssTargetH]);


QW.$=Dom.$;
QW.W=NodeW;
}();

