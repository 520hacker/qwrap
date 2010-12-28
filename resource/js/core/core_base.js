/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/


/**
 * @singleton 
 * @class QW QW��QWrap��Ĭ�������еĺ���Class��Ӧ������QW������
 */
(function(){
var _previousQW=window.QW;

var QW = {
	/**
	 * @property {string} VERSION �ű���İ汾��
	 * @default $version$
	 */
	VERSION: "$version$",
	/**
	 * @property {string} RELEASE �ű���ķ����ţ�С�汾��
	 * @default $release$
	 */
	RELEASE: "$release$",
	/**
	 * @property {string} PATH �ű��������·��
	 * @type string
	 */
	PATH: (function(){
		var sTags=document.getElementsByTagName("script");
		return  sTags[sTags.length-1].src.replace(/\/[^\/]+\/[^\/]+$/,"/");
	})(),
	/**
	 * QW�޳�ͻ������ԭ���ܱ����õ�window.QW����
	 * @method noConflict
	 * @static
	 * @return {json} ����QW�������ռ� 
	 */		
	noConflict: function() {
		window.QW=_previousQW;
		return QW;
	},
	/**
	 * ��QW��������ռ��������
	 * @method provide
	 * @static
	 * @param {string|Json} key �������Ϊstring����Ϊkey������ΪJson����ʾ����Json���ֵdump��QW�����ռ�
	 * @param {any} value (Optional)ֵ
	 * @return {void} 
	 */		
	provide: function(key, value){
		if(arguments.length==1 && typeof key=='object'){
			for(var i in key){
				QW.provide(i,key[i]);
			}
			return;
		}
		var domains=QW.provideDomains;
		for(var i=0;i<domains.length;i++){
			if(!domains[i][key]) domains[i][key]=value;
		}
	},
	/**
	 * �첽���ؽű�
	 * @method getScript
	 * @static
	 * @param { String } url Javascript�ļ�·��
	 * @param { Function } onsuccess (Optional) Javascript���غ�Ļص�����
	 * @param { Option } options (Optional) ����ѡ�����charset
	 */
	getScript: function(url,onsuccess,options){
		options = options || {};
		var head = document.getElementsByTagName('head')[0],
			script = document.createElement('script'),
			done = false;
		script.src = url;
		if( options.charset )
			script.charset = options.charset;
		script.onerror = script.onload = script.onreadystatechange = function(){
			if ( !done && (!this.readyState ||
					this.readyState == "loaded" || this.readyState == "complete") ) {
				done = true;
				onsuccess && onsuccess();
				script.onerror = script.onload = script.onreadystatechange = null;
				head.removeChild( script );
			}
		};
		head.appendChild(script);

	},
	/**
	 * �׳��쳣
	 * @method error
	 * @static
	 * @param { obj } �쳣����
	 * @param { type } Error (Optional) �������ͣ�Ĭ��ΪError
	 */
	error: function(obj, type){
		type = type || Error;
		throw new type(obj);
	}
};
/**
 * @property {Array} provideDomains provide������Ե������ռ�
 * @type string
 */
QW.provideDomains=[QW];

/**
* @class Wrap Wrap��װ�����ڶ���������һ����Ƥ
* @namespace QW
* @param {any} core ����װ����  
* @return {Wrap} 
*/
QW.Wrap=function(core) {
	this.core=core;
};


window.QW = QW;
})();