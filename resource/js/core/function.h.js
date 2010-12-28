/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/

/**
 * @class FunctionH ���Ķ���Function����չ
 * @singleton 
 * @namespace QW
 * @helper
 */
(function(){
var QW=window.QW,
	getType=QW.ObjectH.getType,
	map=QW.ArrayH.map;

var FunctionH = {
	/**
	 * ������װ�� curry
	 * <p>��һ����������������̻������ݸ���һ���������������в�Ϊundefined��ֵ���̻������ع̻�����·���</p>
	 * @method curry
	 * @static
	 * @param {function} func ����װ�ĺ���
	 * @param {array} curryArgs ���ﻯ(�̻�)����
	 * @return {function} ��curry�ķ���
	 */
	curry : function(func, curryArgs){
		curryArgs = curryArgs || [];
		return function(){
			var args = [];
			var newArgs = [].slice.call(arguments);

			for(var i = 0, len = curryArgs.length; i < len; i++){
				if(i in curryArgs){
					args.push(curryArgs[i]);
				}else{
					if(newArgs.length){
						args.push(newArgs.shift());
					}
				}
			}

			args = args.concat(newArgs);
			return func.apply(this, args);
		}
	},
	/**
	 * ������װ�� methodize���Ժ�������methodize����ʹ��ĵ�һ������Ϊthis����this[attr]��
	 * @method methodize
	 * @static
	 * @param {function} funcҪ�������ĺ���
	 * @optional {string} attr ����
	 * @optional {boolean} chain �������������������this�����򷵻�ԭ���ĺ�������ֵ 
	 * @return {function} �ѷ������ĺ���
	 */
	methodize: function(func,attr,chain){
		if(attr) return function(){
			alert[attr,this[attr]];
			var ret = func.apply(null,[this[attr]].concat([].slice.call(arguments)));
			return chain?this:ret;
		};
		return function(){
			var ret = func.apply(null,[this].concat([].slice.call(arguments)));
			return chain?this:ret;
		};
	},
	/**
	 * �����������ط��� overload���Ժ�����������ģʽƥ�䡣Ĭ�ϵ�dispatcher֧��*��...�Լ�?��"*"��ʾһ���������͵Ĳ�����"..."��ʾ����������͵Ĳ�����"?"һ������",?..."��ʾ0��������������
	 * @method overload
	 * @static
	 * @param {function} func���ƥ�䲻�ɹ���Ĭ��ִ�еķ���
	 * @param {json} func_maps ����ƥ����ܵ��õĺ����б�
	 * @optional {function} dispatcher����ƥ����������ɷ��ĺ���
	 * @return {function} �����ػ��ĺ���
	 */
	overload: function(func, func_maps, dispatcher){
		if(!dispatcher){
			dispatcher = function(){
				var args = [].slice.call(arguments);
				return map(args, function(o){return getType(o)}).join();
			}
		}

		return function(){
			var key = dispatcher.apply(this, arguments);
			for(var i in func_maps){
				var pattern = new RegExp("^"+i.replace("*","[^,]*").replace("...",".*")+"$");
				if(pattern.test(key)){
					return func_maps[i].apply(this, arguments);
				}
			}
			return func.apply(this, arguments);
		};
	},
   /**
	* �Ժ������м�����ʹ���ڵ�һ������Ϊarrayʱ�����Ҳ����һ������
	* @method mul
	* @static
	* @param {function} func
	* @param {boolean} recursive �Ƿ�ݹ�
	* @param {boolean} onlyGetFirst �Ƿ�ֻ��getFirst
	* @return {Object} �Ѽ����ĺ���
	*/
	mul: function(func, recursive,onlyGetFirst){
		if(onlyGetFirst){
			return function(){
				var list = arguments[0];
				if(!list instanceof Array) return func.apply(this,arguments);
				if(!recursive){ //����Ҫ�ݹ�
					if(list.length) {
						var args=[].slice.call(arguments,0);
						args[0]=list[0];
						return func.apply(this,args);
					}
					else {
						throw 'Fail to run getter. there is no any element.';
					}
				}
				//���´��룬�ݹ����Ѱ�ҵ�һ��Ԫ�أ�����[[[],[]],[[],[el]]] ���ҵ�el����ȥִ��func
				var firstOne;
				function findFirst(list){
					if(!(list instanceof Array)) {
						firstOne=[list];
						return;
					}
					for(var i=0;i<list.length;i++){
						if(firstOne) return;
						findFirst(list[i]);
					}
				};
				findFirst(list);
				if(firstOne) {
					var args=[].slice.call(arguments,0);
					args[0]=firstOne[0];
					return func.apply(this,args);
				}
				throw 'Fail to run getter. there is no any element.';
			}
		}
		var newFunc = function(){
			var list = arguments[0], fn = recursive ? newFunc : func;
			if(list instanceof Array){
				var ret = [];
				var moreArgs = [].slice.call(arguments,0);
				for(var i = 0, len = list.length; i < len; i++){
					moreArgs[0]=list[i];
					var r = fn.apply(this, moreArgs);
					ret.push(r); 	
				}
				return ret;
			}else{
				return func.apply(this, arguments);
			}
		}
		return newFunc;
	},
	/**
	 * ������װ�任
	 * @method rwrap
	 * @static
	 * @param {func} 
	 * @return {Function}
	 */
	rwrap: function(func,wrapper,idx){
		idx=idx|0;
		return function(){
			var ret = func.apply(this, arguments);
			if(idx>=0) ret=arguments[idx];
			return wrapper ? new wrapper(ret) : ret;
		}
	},
	/**
	 * ��
	 * @method bind
	 * @static
	 * @param {func} 
	 * @return {Function}
	 */
	bind: function(func, thisObj){
		return function(){
			return func.apply(thisObj, arguments);
		}
	}
};


QW.FunctionH=FunctionH;

})();