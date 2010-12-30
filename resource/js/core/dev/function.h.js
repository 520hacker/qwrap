/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/

/*
 * @class FunctionH ���Ķ���Function����չ
 * @singleton 
 * @namespace QW
 * @helper
 */
(function(){
var FunctionH = {
	/*
	 * ������װ�� defer
	 * <p>�ñ���װ�������Ǳ��첽����</p>
	 * <p>��������װ�󣬵���ʱ����һ����������һ����ʱ��������Ĭ��Ϊ0��������ԭ�����Ĳ���������ֵ��setTimeout��id</p>
	 * @method defer
	 * @static
	 * @param {function} func ����װ�ĺ���
	 * @return {function} ����װdefer�ķ���
	 */
	defer : function(func){
		return function(ims){
			ims = ims || 0;
			var args = [].slice.call(arguments,1);
			var me = this;

			var tid = setTimeout(
				function(){
					func.apply(me, args)
				},ims
			);
			return tid;
		}
	},
	/*
	* ����ִ��ĳ������һֱ�����ò�ִ�е�ʱ���ִ�С�
	* @method lazyApply
	* @static
	* @param {Function} fun  ���ú���
	* @param {Object} thisObj  �൱��apply������thisObj����
	* @param {Array} argArray  �൱��apply������argArray����
	* @param {int} ims  interval����������window.setInterval�ĵڶ�������.
	* @param {Function} checker  �������е��жϺ������������Ĳ���Ϊ��checker.call(thisObj,argArray,ims,checker)��<br/>
		���ڲ�ͬ�ķ���ֵ���õ���ͬ�Ľ����<br/>
			����true��1����ʾ��Ҫ����ִ��<br/>
			����-1����ʾ�ɹ�͵����������ִ��<br/>
			��������ֵ����ʾ��ʱ��ִ��<br/>
	@return {int}  ����interval��timerId
	*/
	lazyApply:function(fun,thisObj,argArray,ims,checker){
		var timer=function(){
			var verdict=checker.call(thisObj,argArray,ims,timerId);
			if(verdict==1){
				fun.apply(thisObj,argArray||[]);
			}
			if(verdict==1 || verdict==-1){
				clearInterval(timerId);
			}
		};
		var timerId=setInterval(timer,ims);
		return timerId;
	}
};

QW.ObjectH.mix(QW.FunctionH,FunctionH);

})();