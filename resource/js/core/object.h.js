/*
	Copyright (c) 2009, Baidu Inc. All rights reserved.
	http://www.youa.com
	version: $version$ $release$ released
	author: wuliang@baidu.com
*/


/**
 * @class ObjectH ���Ķ���Object�ľ�̬��չ
 * @singleton
 * @namespace QW
 * @helper
 */

(function(){
var encode4Js=QW.StringH.encode4Js;
var ObjectH = {
	/**
	* �õ�һ������������ַ���
	* @method getType
	* @static
	* @param {any} o Ŀ������ֵ
	* @returns {string} �ö��������
	* @example
		getType(null); //null
		getType(undefined); //undefined
		getType(""); //string
		getType([]); //array
		getType(true); //boolean
		getType({}); //object
		getType(new Date()); //date
		getType(/a/); //regexp
		getType({}.constructor); //function
		getType(window); //window
		getType(document); //document
		getType(document.body); //BODY
	*/
	getType: function(o){
		var type = typeof o;
		if(type == 'object'){
			if(o==null) type='null';
			else if("__type__" in o) type=o.__type__;
			else if("core" in o) type='wrap';
			else if("items" in o) type='collection';
			else if(o.window==o) type='window'; //window
			else if(o.nodeName) type=(o.nodeName+'').replace('#',''); //document/element
			else if(!o.constructor) type='unknown object';
			else type=Object.prototype.toString.call(o).slice(8,-1).toLowerCase();
		}
		return type;
	},
	/** 
	* Ϊһ��������������
	* @method set
	* @static
	* @param {Object} obj Ŀ�����
	* @param {string} prop ������
	* @param {any} value ����ֵ
	* @returns {void} 
	*/
	set:function (obj,prop,value){
		obj[prop]=value;
	},

	/** 
	* ��ȡһ�����������ֵ:
	* @method set
	* @static
	* @param {Object} obj Ŀ�����
	* @param {string} prop ������
	* @returns {any} 
	*/
	get:function (obj,prop){
		return obj[prop];
	},

	/** 
	* Ϊһ�������������ԣ�֧���������ֵ��÷�ʽ:
		setEx(obj, prop, value)
		setEx(obj, propJson)
		setEx(obj, props, values)
		---�ر�˵��propName����ĵ㣬�ᱻ�������ԵĲ��
	* @method setEx
	* @static
	* @param {Object} obj Ŀ�����
	* @param {string|Json|Array} prop �����string,��������(�������������������ַ���,��"style.display")�������Json����prop/value�ԡ���������飬��prop���飬�ڶ���������Ӧ��Ҳ��value����
	* @param {any | Array} value ����ֵ
	* @returns {Object} obj 
	* @example 
		var el={style:{},firstChild:{}};
		setEx(el,"id","aaaa");
		setEx(el,{className:"cn1", 
			"style.display":"block",
			"style.width":"8px"
		});
	*/
	setEx:function (obj,prop,value){
		var propType=ObjectH.getType(prop);
		if(propType == 'array') {
			//setEx(obj, props, values)
			for(var i=0;i<prop.length;i++){
				ObjectH.setEx(obj,prop[i],value[i]);
			}
		}
		else if(propType == 'object') {
			//setEx(obj, propJson)
			for(var i in prop)
				ObjectH.setEx(obj,i,prop[i]);
		}
		else {
			//setEx(obj, prop, value);
			var keys=(prop+"").split(".");
			for(var i=0, obj2=obj, len=keys.length-1;i<len;i++){
				obj2=obj2[keys[i]];
			}
			obj2[keys[i]]=value;
		}
		return obj;
	},

	/** 
	* �õ�һ�������������ԣ�֧���������ֵ��÷�ʽ:
		getEx(obj, prop) -> obj[prop]
		getEx(obj, props) -> propValues
		getEx(obj, propJson) -> propJson
	* @method getEx
	* @static
	* @param {Object} obj Ŀ�����
	* @param {string | Array} prop �����string,��������(�������������������ַ���,��"style.display")��
		�����Array����props����
	* @param {boolean} returnJson �Ƿ���Ҫ����Json����
	* @returns {any|Array|Json} ��������ֵ
	* @example 
		getEx(obj,"style"); //����obj["style"];
		getEx(obj,"style.color"); //���� obj.style.color;
		getEx(obj,"style.color",true); //���� {"style.color":obj.style.color};
		getEx(obj,["id","style.color"]); //���� [obj.id, obj.style.color];
		getEx(obj,["id","style.color"],true); //���� {id:obj.id, "style.color":obj.style.color};
	*/
	getEx:function (obj,prop,returnJson){
		var ret,propType=ObjectH.getType(prop);
		if(propType == 'array'){
			if(returnJson){
				ret={};
				for(var i =0; i<prop.length;i++){
					ret[prop[i]]=ObjectH.getEx(obj,prop[i]);
				}
			}
			else{
				//getEx(obj, props)
				ret=[];
				for(var i =0; i<prop.length;i++){
					ret[i]=ObjectH.getEx(obj,prop[i]);
				}
			}
		}
		else {
			//getEx(obj, prop)
			var keys=(prop+"").split(".");
			ret=obj;
			for(var i=0;i<keys.length;i++){
				ret=ret[keys[i]];
			}
			if(returnJson) {
				var json={};
				json[prop]=ret;
				return json;
			}
		}
		return ret;
	},

	/** 
	* ��Դ��������Բ��뵽Ŀ�����
	* @method mix
	* @static
	* @param {Object} des Ŀ�����
	* @param {Object|Array} src Դ������������飬�����β���
	* @param {boolean} override (Optional) �Ƿ񸲸���������
	* @returns {Object} des
	*/
	mix: function(des, src, override){
		if("array" == ObjectH.getType(src)){
			for(var i = 0, len = src.length; i<len; i++){
				ObjectH.mix(des, src[i], override);
			}
			return des;
		}
		for(var i in src){
			if(override || !(des[i]) && !(i in des) ){
				des[i] = src[i];
			}
		}
		return des;
	},
	/**
	* ��һ����ƽ���Ķ���չ���۵���һ�����ζ������а���"."�����Գ�Ϊ�������
	* @method fold
	* @static
	* @param obj {Object} Ҫ�۵��Ķ���
	* @return {Object} �۵���Ķ���
	*/
	fold: function(obj){
		var ret = {};
		for(var prop in obj){
			var keys = prop.split(".");
			
			for(var i = 0, o = ret, len = keys.length-1; i < len; i++){
				if(!(keys[i] in o)) o[keys[i]] = {};
				o = o[keys[i]];
			}
			o[keys[i]] = obj[prop];
		}
		return ret;
	},
	/**
	* ��һ�������ƽ������fold�ķ������
	* @method expand
	* @static
	* @param obj {Object} Ҫ��ƽ���Ķ���
	* @return {Object} ��ƽ����Ķ���
	*/
	expand: function(obj){
		var ret = {};
		var f = function(obj, profix){
			for(var each in obj){
				var o = obj[each];
				var p = profix.concat([each]);
				if('object' == ObjectH.getType(o)){
					f(o, p);
				}else{
					ret[p.join(".")] = o;
				}
			}
		};
		f(obj, []);
		return ret;
	},
	/**
	* <p>���һ���������������</p>
	* <p><strong>������Ա�"."�ָ�����ȡ�����ε�����</strong>������:</p>
	* <p>ObjectH.dump(o, "a.b"); //�õ� {"a.b": o.a.b}</p>
	* @method dump
	* @static
	* @param {Object} obj �������Ķ���
	* @param {Array} props ����Ҫ�����Ƶ��������Ƶ�����
	* @return {Object} ������dump�������ԵĶ��� 
	*/
	dump: function(obj, props){
		var ret = {};
		for(var i = 0, len = props.length; i < len; i++){
			if(i in props){
				var key = props[i];
				ret[key] = ObjectH.get(obj, key);
			}
		}
		return ret;
	},
	/**
	* �ڶ����е�ÿ��������������һ��������������������ֵ��Ϊ���Ե�ֵ��
	* @method map
	* @static
	* @param {Object} obj �������Ķ���
	* @param {function} fn ��������ÿ�����Ե����ӣ������ӵ���������������value-����ֵ��key-��������obj����ǰ����
	* @param {Object} thisObj (Optional)��������ʱ��this
	* @return {Object} ���ذ�������������������Լ������Ķ���
	*/
	map : function(obj, fn, thisObj){
		var ret = {};
		for(var key in obj){
			ret[key] = fn.call(thisObj, obj[key], key, obj);
		}
		return ret;
	},
	/**
	* �õ�һ�����������п��Ա�ö�ٳ������Ե��б�
	* @method keys
	* @static
	* @param {Object} obj �������Ķ���
	* @return {Array} ���ذ�������������������Ե�����
	*/
	keys : function(obj){
		var ret = [];
		for(var key in obj){
			ret.push(key);
		}
		return ret;
	},

	/**
	* ��keys/values����ķ�ʽ������Ե�һ������<br/>
	* <strong>���values�ĳ��ȴ���keys�ĳ��ȣ������Ԫ�ؽ�������</strong>
	* @method fromArray
	* @static
	* @param {Object} obj �������Ķ���
	* @param {Array} keys ���key������
	* @param {Array} values ���value������
	* @return {Object} ������������ԵĶ���
	*/
	fromArray : function(obj, keys, values){
		values = values || [];
		for(var i = 0, len = keys.length; i < len; i++){
			obj[keys[i]] = values[i];
		}
		return obj;
	},

	/**
	* �õ�һ�����������п��Ա�ö�ٳ�������ֵ���б�
	* @method values
	* @static
	* @param {Object} obj �������Ķ���
	* @return {Array} ���ذ��������������������ֵ������
	*/
	values : function(obj){
		var ret = [];
		for(var key in obj){
			ret.push(obj[key]);
		}
		return ret;
	},

	/**
	* ����һ��������������ԡ�
	* @method flatCopy
	* @static
	* @param {Object} obj �����ƵĶ���
	* @return {JSON} ���غͰ�������������пɸ������Ե�JSON
	*/
	flatCopy : function(obj){
		return ObjectH.mix({}, obj);
	},
	/** 
	* ���л�һ������(ֻ���л�String,Number,Boolean,Date,Array,Json�������toJSON�����Ķ���,�����Ķ��󶼻ᱻ���л���null)
	* @method stringify
	* @static
	* @param {Object} obj ��Ҫ���л���Json��Array�������������
	* @returns {String} : �������л����
	* @example 
		var card={cardNo:"bbbb1234",history:[{date:"2008-09-16",count:120.0,isOut:true},1]};
		alert(stringify(card));
	*/
	stringify:function (obj){
		if(obj==null) return null;
		if(obj.toJSON) {
			obj= obj.toJSON();
		}
		var type=ObjectH.getType(obj);
		switch(type){
			case 'string': return '"'+encode4Js(obj)+'"';
			case 'number': 
			case 'boolean': return obj+'';
			case 'date': return 'new Date(' + obj.getTime() + ')';
			case 'array' :
				var ar=[];
				for(var i=0;i<obj.length;i++) ar[i]=ObjectH.stringify(obj[i]);
				return '['+ar.join(',')+']';
			case 'object' :
				ar=[];
				for(i in obj){
					ar.push('"'+encode4Js(i+'')+'":'+ObjectH.stringify(obj[i]));
				}
				return '{'+ar.join(',')+'}';
		}
		return null;//�޷����л��ģ�����null;
	}

};

QW.ObjectH=ObjectH;
})();