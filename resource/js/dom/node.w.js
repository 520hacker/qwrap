/*
	Copyright (c) 2010, Baidu Inc.  http://www.youa.com; http://www.QWrap.com
	author: JK
	author: wangchen
*/
/** 
* @class NodeW HTMLElement�����װ��
* @namespace QW
*/
(function () {
	var ObjectH = QW.ObjectH,
		mix = ObjectH.mix,
		getType = ObjectH.getType,
		push = Array.prototype.push,
		NodeH = QW.NodeH,
		$ = NodeH.$,
		query = NodeH.query,
		one = NodeH.one;


	var NodeW=function(core) {
		if(!core) return null;//�÷���var w=NodeW(null);	����null
		var arg1=arguments[1];
		if(getType(core)=='string'){//�÷���var w=NodeW(sSelector); 
			return new NodeW(query(arg1,core));
		}
		else {
			core=$(core,arg1);
			if(this instanceof NodeW){
				this.core=core;
				if(getType(core)=='array'){//�÷���var w=NodeW(elementsArray); 
					this.length=0;
					push.apply( this, core );
				}
				else{//�÷���var w=new NodeW(element)//���Ƽ�; 
					this.length=1;
					this[0]=core;
				}
			}
			else return new NodeW([core]);//�÷���var w=NodeW(element); 
		}
	};

	NodeW.one=function(core){
		if(!core) return null;//�÷���var w=NodeW.one(null);	����null
		var arg1=arguments[1];
		if(getType(core)=='string'){//�÷���var w=NodeW.one(sSelector); 
			return new NodeW(query(arg1,core)[0]);
		}
		else {
			core=$(core,arg1);
			if(getType(core)=='array'){//�÷���var w=NodeW.one(array); 
				return new NodeW(core[0]);
			}
			else{
				return new NodeW(core);//�÷���var w=NodeW.one(element); 
			}
		}
	}

	/** 
	* ��NodeW��ֲ��һ�����Node��Helper
	* @method	pluginHelper
	* @static
	* @param	{helper} helper ������һ�����Node��Ԫ�أ���Helper	
	* @param	{string|json} wrapConfig	wrap����
	* @param	{json} gsetterConfig	(Optional) gsetter ����
	* @return	{NodeW}	
	*/

	NodeW.pluginHelper =function (helper, wrapConfig, gsetterConfig) {
		var HelperH=QW.HelperH;
		helper=HelperH.mul(helper,true,wrapConfig);	//֧�ֵ�һ������Ϊarray
		helper=HelperH.rwrap(helper,NodeW,wrapConfig);	//�Է���ֵ���а�װ����
		var helper2= gsetterConfig ? HelperH.gsetter(helper,gsetterConfig) : helper; //�����gsetter����Ҫ�Ա�̬����gsetter��
		HelperH.applyTo(helper2,NodeW);	//Ӧ����NodeW�ľ�̬����

		var pro=HelperH.methodize(helper,'core',wrapConfig);
		if(gsetterConfig){
			for(var i in gsetterConfig){
				pro[i]=function(config){
					return function(){
						return pro[config[Math.min(arguments.length,config.length)]].apply(this,arguments);
					}
				}(gsetterConfig[i]);
			}
		}
		mix(NodeW.prototype,pro);
		//HelperH.methodizeTo(helper,NodeW.prototype,'core',wrapConfig);	//Ӧ����NodeW��ԭ�ͷ���
	};

	mix(NodeW.prototype,{
		/** 
		* ����NodeW�ĵ�0��Ԫ�صİ�װ
		* @method	first
		* @return	{NodeW}	
		*/
		first:function(){
			return NodeW(this[0]);
		},
		/** 
		* ����NodeW�����һ��Ԫ�صİ�װ
		* @method	last
		* @return	{NodeW}	
		*/
		last:function(){
			return NodeW(this[this.length-1]);
		},
		/** 
		* ����NodeW�ĵ�i��Ԫ�صİ�װ
		* @method	last
		* @param {int}	i ��i��Ԫ��
		* @return	{NodeW}	
		*/
		item:function(i){
			return NodeW(this[i]);
		}
	});

	QW.NodeW=NodeW;
})();

