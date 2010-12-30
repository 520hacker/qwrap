/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
*/

/*
 * @class ArrayH ���Ķ���Array����չ
 * @singleton 
 * @namespace QW
 * @helper
 */
(function(){
var ArrayH = {
	/*
	 * ���ٳ��أ������ArrayH.unique��Ϊ��Ч�ʣ����˴��������Ͻ��ԡ�����������в���������ԵĶ�������״�.
	 * @method quicklyUnique
	 * @static
	 * @param {array} arr ����������
	 * @return {array} ���س��غ��������
	 */
	quicklyUnique : function (arr){
		var strs={},numAndBls={},objs=[],hasNull,hasUndefined,ret=[];
		for(var i =0,len=arr.length;i<len;i++){
			var oI=arr[i];
			if(oI === null ){
				if(!hasNull){
					hasNull=true;
					ret.push(oI);
				}
				continue;
			}
			if(oI === undefined){
				if(!hasUndefined){
					hasUndefined=true;
					ret.push(oI);
				}
				continue;
			}
			var type=typeof oI;
			switch(type){
				case 'object':
				case 'function':
					if(!oI.__4QuicklyUnique){
						oI.__4QuicklyUnique=true;
						ret.push(oI);
						objs.push(oI);
					}
					break;
				case 'string':
					if(!strs[oI]){
						ret.push(oI);
						strs[oI]=true;
					}
				default :
					if(!numAndBls[oI]){
						ret.push(oI);
						numAndBls[oI]=true;
					}
					break;
			}
		}
		for(i=0;oI=objs[i++];){
			if(oI instanceof Object) {delete oI.__4QuicklyUnique;}
			else {oI.__4QuicklyUnique=undefined;}
		}
		return ret;
	},
		/*
	 * �������򣬰�ĳ�����ԣ��򰴡���ȡ�������ݵĺ�������������.
	 * @method soryBy
	 * @static
	 * @param {array} arr ����������
	 * @param {string|function} prop �����������ԣ���ȡ
	 * @param {boolean} desc ����
	 * @return {array} ����������������
	 */
	sortBy : function (arr, prop, desc){
		var props=[],
			ret=[],
			i=0,
			len=arr.length;
		if(typeof prop=='string') {
			for(; i<len; i++){
				var oI = arr[i];
				(props[i] = new String(oI && oI[prop] || ''))._obj = oI;
			}
		}
		else if(typeof prop=='function') {
			for(; i<len; i++){
				var oI = arr[i];
				(props[i] = new String(oI && prop(oI) || ''))._obj = oI;
			}
		}
		else {
			throw '�������ʹ���';
		}
		props.sort();
		for(i=0; i<len; i++) {
			ret[i] = props[i]._obj;
		}
		if(desc) ret.reverse();
		return ret;
	}
};

QW.ObjectH.mix(QW.ArrayH,ArrayH);

})();