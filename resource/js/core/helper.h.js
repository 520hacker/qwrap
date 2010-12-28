/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: yingjiakuan@baidu.com
*/

/**
 * Helper������������ģ������������Helper����ģ��
 * @module core
 * @beta
 * @submodule core_HelperH
 */

/**
 * @class HelperH
 * <p>һ��Helper��ָͬʱ��������������һ������</p>
 * <ol><li>Helper��һ�������п�ö��proto���Եļ򵥶�������ζ���������for...in...ö��һ��Helper�е��������Ժͷ�����</li>
 * <li>Helper����ӵ�����Ժͷ�������Helper�Է����Ķ��������������������</li>
 * <div> 1). Helper�ķ��������Ǿ�̬���������ڲ�����ʹ��this��</div>
 * <div> 2). ͬһ��Helper�еķ����ĵ�һ��������������ͬ���ͻ���ͬ���͡�</div>
 * <li> Helper���͵����ֱ�����Helper���д��ĸH��β�� </li>
 * <li> ����ֻ�����һ����JSON��Ҳ���Ƿ�Helper��ͨ���ԡ�U����util����β�� </li>
 * <li> ����Util��HelperӦ���Ǽ̳й�ϵ������JavaScript�����ǰѼ̳й�ϵ���ˡ�</li>
 * </ol>
 * @singleton
 * @namespace QW
 * @helper
 */

(function(){

var FunctionH = QW.FunctionH,
	mix = QW.ObjectH.mix;

var HelperH = {
	/**
	* ������Ҫ����wrap�����helper���������н����װ
	* @method rwrap
	* @static
	* @param {Helper} helper Helper����
	* @param {Class} wrapper ������ֵ���а�װʱ�İ�װ��(WrapClass)
	* @param {Object} wrapConfig ��Ҫ����Wrap����ķ���������
	* @return {Object} ������rwrap����<strong>�µ�</strong>Helper
	*/
	rwrap: function(helper, wrapper, wrapConfig){
		var ret = {};
		if(null == wrapConfig) wrapConfig = {};

		for(var i in helper){
			var wrapType=wrapConfig;
			if (typeof wrapType != 'string') {
				wrapType=wrapConfig[i] || '';
			}
			if(/queryer/.test(wrapType)){
				ret[i] = FunctionH.rwrap(helper[i], wrapper, -1);//�Է���ֵ���а�װ
			}
			else if('operator'==wrapType){
				ret[i] = FunctionH.rwrap(helper[i], wrapper, 0);//�Ե�һ���������а�װ
			}
			else ret[i] = helper[i]; //�������
		}
		return ret;
	},

	/**
	* �������ã�����gsetter�·���������駲����ĳ�������������getter����setter
	* @method gsetter
	* @static
	* @param {Helper} helper Helper����
	* @param {Object} gsetterConfig ��Ҫ����Wrap����ķ���������
	* @return {Object} ������gsetter����<strong>�µ�</strong>helper
	*/
	gsetter: function(helper,gsetterConfig){
		var ret = mix({}, helper);
		gsetterConfig=gsetterConfig||{};
		for(var i in gsetterConfig){
			ret[i]=function(config){
				return function(){return ret[config[Math.min(arguments.length,config.length)-1]].apply(null,arguments);}
			}(gsetterConfig[i]);
		}
		return ret;
	},
	
	/**
	* ��helper�ķ���������mul����ʹ���ڵ�һ������Ϊarrayʱ�����Ҳ����һ������
	* @method mul
	* @static
	* @param {Helper} helper Helper����
	* @param {boolean} recursive (Optional)�Ƿ�ݹ�
	* @param {json|string} mulConfig mulConfig��
	* @return {Object} ������mul����<strong>�µ�</strong>Helper
	*/
	mul: function (helper, recursive,wrapConfig){ 
		wrapConfig =wrapConfig ||{};
		var ret = {};
		for(var i in helper){
			if(typeof helper[i] == "function"){
				var wrapType=wrapConfig;
				if (typeof wrapType != 'string') {
					wrapType=wrapConfig[i] || '';
				}
				ret[i] = FunctionH.mul(helper[i], recursive, wrapType=='getter_first');
			}
			else
				ret[i] = helper[i];
		}
		return ret;
	},
	/**
	* ��һ��HelperӦ�õ�ĳ��Object�ϣ�Helper�ϵķ�����Ϊ��̬����������extend(obj,helper)
	* @method applyTo
	* @static
	* @param {Helper} helper Helper������DateH
	* @param {Object} obj Ŀ�����.
	* @return {Object} Ӧ��Helper��Ķ��� 
	*/
	applyTo: function(helper,obj){
		return mix(obj, helper);  //��������
	},
	/**
	* ��helper�ķ���������methodize����ʹ��ĵ�һ������Ϊthis����this[attr]��
	* <strong>methodize������������helper�ϵķ�function���Ա�Լ��������»��߿�ͷ�ĳ�Ա��˽�г�Ա��</strong>
	* @method methodize
	* @static
	* @param {Helper} helper Helper������DateH
	* @param {optional} attr (Optional)����
	* @param {optional} wrapConfig (Optional) ������������
	* @return {Object} ������methodize���Ķ���
	*/
	methodize: function(helper, attr, wrapConfig){
		wrapConfig=wrapConfig||{};
		var ret = {};
		for(var i in helper){
			var wrapType=wrapConfig;
			if (typeof wrapType != 'string') {
				wrapType=wrapConfig[i] || '';
			}
			if(typeof helper[i] == "function" && !/^_/.test(i)){
				ret[i] = FunctionH.methodize(helper[i], attr, wrapType=='operator'); 
			}
		}
		return ret;
	},
	/**
	* <p>��һ��HelperӦ�õ�ĳ��Object�ϣ�Helper�ϵķ�����Ϊ���󷽷�</p>
	* @method methodizeTo
	* @static
	* @param {Helper} helper Helper������DateH
	* @param {Object} obj  Ŀ�����.
	* @param {string} attr (Optional)��װ�����core�������ơ����Ϊ�գ�����this��������this[attr]������Helper�����ĵ�һ������
	* @param {json|string} wrapConfig (Optional) ������������
	* @return {Object} Ӧ��Helper��Ķ���
	*/
	methodizeTo: function(helper, obj, attr, wrapConfig){
		helper = HelperH.methodize(helper,attr, wrapConfig);	//������
		return mix(obj, helper);  //��������		 
	}
	//,
	/*
	* �õ�һ��HelperWrap
	* @method wrap
	* @static
	* @param {Helper} h1 Helper������DateH
	* @param {Helper} h2 (Optional) �����ж��Helper.
	* @return {HelperW} ����һ��Helper��Wrap����
	*/
	/*wrap: function(){
		var helper = mix({},[].slice.call(arguments));
		function HWrap(helper){
			this.core = helper;
		};
		var h = HelperH.rwrap(HelperH, HWrap, 'operator,queryer');
		HelperH.methodizeTo(h, HWrap.prototype, "core");
		return new HWrap(helper);
	}*/

};

QW.HelperH = HelperH;
})();

