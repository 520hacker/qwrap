/** 
 * @class EventTargetH EventTarget Helper，处理和事件触发目标有关的兼容问题
 * @singleton
 * @helper
 * @namespace QW
 */
(function() {

	var EventTargetH = {};
	var g = QW.NodeH.g,
		cache = {},
		delegateCache = {},
		PROPERTY_NAME = '__EventTargetH_ID',
		index = 0;


	/** 
	 * 获取key
	 * @method	getKey
	 * @private
	 * @param	{element}	element		被观察的目标
	 * @param	{string}	type		(Optional)事件名称
	 * @param	{function}	handler		(Optional)事件处理程序
	 * @return	{string}	key
	 */

	function getKey(element, type, handler) {
		var result = '';
		if (!element[PROPERTY_NAME]) {
			element[PROPERTY_NAME] = ++index;
		}
		result += element[PROPERTY_NAME];
		if (type) {
			result += '_' + type;
			if (handler) {
				if (!handler[PROPERTY_NAME]) {
					handler[PROPERTY_NAME] = ++index;
				}
				result += '_' + handler[PROPERTY_NAME];
			}
		}
		return result;
	}

	/** 
	 * 获取key
	 * @method	getDelegateKey
	 * @private
	 * @param	{element}	element		被委托的目标
	 * @param	{string}	selector	(Optional)委托的目标
	 * @param	{string}	type		(Optional)事件名称
	 * @param	{function}	handler		(Optional)事件处理程序
	 * @return	{string}	key
	 */

	function getDelegateKey(element, selector, type, handler) {
		var result = '';
		if (!element[PROPERTY_NAME]) {
			element[PROPERTY_NAME] = ++index;
		}
		result += element[PROPERTY_NAME];
		if (selector) {
			result += '_' + selector.replace(/_/g, '\x01');
			if (type) {
				result += '_' + type;
				if (handler) {
					if (!handler[PROPERTY_NAME]) {
						handler[PROPERTY_NAME] = ++index;
					}
					result += '_' + handler[PROPERTY_NAME];
				}
			}
		}

		return result;
	}

	/** 
	 * 通过key获取事件名
	 * @method	keyToName
	 * @private
	 * @param	{string}	key		键值
	 * @return	{string}	事件名称
	 */

	function keyToName(key) {
		return key.split('_')[1];
	}

	/** 
	 * 通过key获取事件名
	 * @method	delegateKeyToName
	 * @private
	 * @param	{string}	key		键值
	 * @return	{string}	事件名称
	 */

	function delegateKeyToName(key) {
		return key.split('_')[2];
	}

	/** 
	 * 监听方法
	 * @method	listener
	 * @private
	 * @param	{element}	element	监听目标
	 * @param	{string}	name	事件名称
	 * @param	{function}	handler	事件处理程序
	 * @return	{object}	委托方法执行结果
	 */

	function listener(element, name, handler) {
		return function(e) {
			return fireHandler(element, e, handler, name);
		};
	}

	/** 
	 * 监听方法
	 * @method	delegateListener
	 * @private
	 * @param	{element}	element		监听目标
	 * @param	{string}	selector	选择器
	 * @param	{string}	name		事件名称
	 * @param	{function}	handler		事件处理程序
	 * @return	{object}	委托方法执行结果
	 */

	function delegateListener(element, selector, name, handler) {
		return function(e) {
			var elements = [],
				node = e.srcElement || e.target;
			if (!node) {
				return;
			}
			if (node.nodeType == 3) {
				node = node.parentNode;
			}
			while (node && node != element) {
				elements.push(node);
				node = node.parentNode;
			}
			elements = QW.Selector.filter(elements, selector, element);
			for (var i = 0, l = elements.length; i < l; ++i) {
				fireHandler(elements[i], e, handler, name);
				if (elements[i].parentNode && elements[i].parentNode.nodeType == 11) { //fix remove element[i] bubble bug
					if (e.stopPropagation) {
						e.stopPropagation();
					} else {
						e.cancelBubble = true;
					}
					break;
				}
			}
		};
	}

	/**
	 * 添加事件监听
	 * @method	addEventListener
	 * @param	{element}	element	监听目标
	 * @param	{string}	name	事件名称
	 * @param	{function}	handler	事件处理程序
	 * @param	{bool}		capture	(Optional)是否捕获非ie才有效
	 * @return	{void}
	 */
	EventTargetH.addEventListener = (function() {
		if (document.addEventListener) {
			return function(element, name, handler, capture) {
				element.addEventListener(name, handler, capture || false);
			};
		} else if (document.attachEvent) {
			return function(element, name, handler) {
				element.attachEvent('on' + name, handler);
			};
		} else {
			return function() {};
		}
	}());

	/**
	 * 移除事件监听
	 * @method	removeEventListener
	 * @private
	 * @param	{element}	element	监听目标
	 * @param	{string}	name	事件名称
	 * @param	{function}	handler	事件处理程序
	 * @param	{bool}		capture	(Optional)是否捕获非ie才有效
	 * @return	{void}
	 */
	EventTargetH.removeEventListener = (function() {
		if (document.removeEventListener) {
			return function(element, name, handler, capture) {
				element.removeEventListener(name, handler, capture || false);
			};
		} else if (document.detachEvent) {
			return function(element, name, handler) {
				element.detachEvent('on' + name, handler);
			};
		} else {
			return function() {};
		}
	}());


	/**
	 * 定义新事件
	 * @method	typedef
	 * @param	{string}	name	被定义的类型
	 * @param	{string}	newname	新定义的类型
	 * @param	{function}	handler	(Optional)事件处理程序 处理程序接受两个参数e和handler. 其中e为event对象,handler为使用者多投的委托.
	 * @return	{void}
	 */
	var Types = {};
	EventTargetH.typedef = function(name, newname, handler) {
		Types[newname] = {
			name: name,
			handler: handler
		};
	};

	/** 
	 * 标准化事件名称
	 * @method	getName
	 * @private
	 * @param	{string}	name	事件名称
	 * @return	{string}	转换后的事件名称
	 */

	var getName = function(name) {
		return Types[name] ? Types[name].name : name;
	};

	/** 
	 * 事件执行入口
	 * @method	fireHandler
	 * @private
	 * @param	{element}	element		触发事件对象
	 * @param	{event}		event		事件对象
	 * @param	{function}	handler		事件委托
	 * @param	{string}	name		处理前事件名称
	 * @return	{object}	事件委托执行结果
	 */
	var fireHandler = function(element, e, handler, name) {
		if (Types[name] && Types[name].handler) {
			return EventTargetH.fireHandler(element, e, function(e) {
				return Types[name].handler.call(this, e, handler);
			}, name);
		} else {
			return EventTargetH.fireHandler(element, e, handler, name);
		}
	};

	/** 
	 * 事件执行入口
	 * @method	fireHandler
	 * @param	{element}	element		触发事件对象
	 * @param	{event}		event		事件对象
	 * @param	{function}	handler		事件委托
	 * @param	{string}	name		处理前事件名称
	 * @return	{object}	事件委托执行结果
	 */
	EventTargetH.fireHandler = function(element, e, handler, name) {
		return handler.call(element, e);
	};

	/** 
	 * 添加对指定事件的监听
	 * @method	on
	 * @param	{element}	element	监听目标
	 * @param	{string}	sEvent	事件名称
	 * @param	{function}	handler	事件处理程序
	 * @return	{boolean}	事件是否监听成功
	 */
	EventTargetH.on = function(element, sEvent, handler) {
		element = g(element);
		var name = getName(sEvent),
			key = getKey(element, sEvent, handler);
		if (cache[key]) {
			return false;
		} else {
			var _listener = listener(element, sEvent, handler);
			EventTargetH.addEventListener(element, name, _listener);
			cache[key] = _listener;
			return true;
		}
	};

	/** 
	 * 移除对指定事件的监听
	 * @method	un
	 * @param	{element}	element	移除目标
	 * @param	{string}	sEvent	(Optional)事件名称
	 * @param	{function}	handler	(Optional)事件处理程序
	 * @return	{boolean}	事件监听是否移除成功
	 */
	EventTargetH.un = function(element, sEvent, handler) {
		element = g(element);
		var name;
		if (handler) {
			name = getName(sEvent);
			var key = getKey(element, sEvent, handler),
				_listener = cache[key];
			if (_listener) {
				EventTargetH.removeEventListener(element, name, _listener);
				delete cache[key];
				return true;
			} else {
				return false;
			}
		} else {
			var leftKey = '^' + getKey(element, sEvent, handler),
				i;
			for (i in cache) {
				if (new RegExp(leftKey, 'i').test(i)) {
					name = keyToName(i);
					EventTargetH.removeEventListener(element, getName(name), cache[i]);
					delete cache[i];
				}
			}
			return true;
		}
	};

	/** 
	 * 添加事件委托
	 * @method	delegate
	 * @param	{element}	element		被委托的目标
	 * @param	{string}	selector	委托的目标
	 * @param	{string}	sEvent		事件名称
	 * @param	{function}	handler		事件处理程序
	 * @return	{boolean}	事件监听是否移除成功
	 */
	EventTargetH.delegate = function(element, selector, sEvent, handler) {
		element = g(element);
		var name = getName(sEvent),
			key = getDelegateKey(element, selector, sEvent, handler);
		if (delegateCache[key]) {
			return false;
		} else {
			var _listener = delegateListener(element, selector, sEvent, handler);
			EventTargetH.addEventListener(element, name, _listener);
			delegateCache[key] = _listener;
			return true;
		}
	};

	/** 
	 * 移除事件委托
	 * @method	undelegate
	 * @param	{element}	element		被委托的目标
	 * @param	{string}	selector	(Optional)委托的目标
	 * @param	{string}	sEvent		(Optional)事件名称
	 * @param	{function}	handler		(Optional)事件处理程序
	 * @return	{boolean}	事件监听是否移除成功
	 */
	EventTargetH.undelegate = function(element, selector, sEvent, handler) {
		element = g(element);
		var name;
		if (handler) {
			name = getName(sEvent);
			var key = getDelegateKey(element, selector, sEvent, handler),
				_listener = delegateCache[key];
			if (_listener) {
				EventTargetH.removeEventListener(element, name, _listener);
				delete delegateCache[key];
				return true;
			} else {
				return false;
			}
		} else {
			var leftKey = '^' + getDelegateKey(element, selector, sEvent, handler).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1'),
				i;
			for (i in delegateCache) {
				if (new RegExp(leftKey, 'i').test(i)) {
					name = delegateKeyToName(i);
					EventTargetH.removeEventListener(element, getName(name), delegateCache[i]);
					delete delegateCache[i];
				}
			}
			return true;
		}
	};

	/** 
	 * 触发对象的指定事件
	 * @method	fire
	 * @param	{element}	element	要触发事件的对象
	 * @param	{string}	sEvent	事件名称
	 * @return	{void}
	 */
	EventTargetH.fire = function(element, sEvent) {
		element = g(element);
		var name = getName(sEvent);
		if (element.fireEvent) {
			return element.fireEvent('on' + name);
		} else {
			var evt = null,
				doc = element.ownerDocument || element;
			if (/mouse|click/i.test(sEvent)) {
				evt = doc.createEvent('MouseEvents');
				evt.initMouseEvent(name, true, true, doc.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			} else {
				evt = doc.createEvent('Events');
				evt.initEvent(name, true, true, doc.defaultView);
			}
			return element.dispatchEvent(evt);
		}
	};

	var extend = function(types) {
		function extendType(type) {
			EventTargetH[type] = function(element, handler) {
				if (handler) {
					EventTargetH.on(element, type, handler);
				} else {
					(element[type] && element[type]()) || EventTargetH.fire(element, type);
				}
			};
		}
		for (var i = 0, l = types.length; i < l; ++i) {
			extendType(types[i]);
		}
	};

	/** 
	 * 绑定对象的click事件或者执行click方法
	 * @method	click
	 * @param	{element}	element	要触发事件的对象
	 * @param	{function}	handler	(Optional)事件委托
	 * @return	{void}
	 */


	/** 
	 * 绑定对象的submit事件或者执行submit方法
	 * @method	submit
	 * @param	{element}	element	要触发事件的对象
	 * @param	{function}	handler	(Optional)事件委托
	 * @return	{void}
	 */

	/** 
	 * 绑定对象的focus事件或者执行focus方法
	 * @method	focus
	 * @param	{element}	element	要触发事件的对象
	 * @param	{function}	handler	(Optional)事件委托
	 * @return	{void}
	 */

	/** 
	 * 绑定对象的blur事件或者执行blur方法
	 * @method	blur
	 * @param	{element}	element	要触发事件的对象
	 * @param	{function}	handler	(Optional)事件委托
	 * @return	{void}
	 */

	extend('submit,click,focus,blur'.split(','));

	EventTargetH.typedef('mouseover', 'mouseenter', function(e, handler) {
		var element = this,
			target = e.relatedTarget || e.fromElement || null;
		if (!target || target == element || (element.contains ? element.contains(target) : !!(element.compareDocumentPosition(target) & 16))) {
			return;
		}
		handler.call(element, e);
	});

	EventTargetH.typedef('mouseout', 'mouseleave', function(e, handler) {
		var element = this,
			target = e.relatedTarget || e.toElement || null;
		if (!target || target == element || (element.contains ? element.contains(target) : !!(element.compareDocumentPosition(target) & 16))) {
			return;
		}
		handler.call(element, e);
	});

	(function() {
		var UA = navigator.userAgent;
		if (/firefox/i.test(UA)) {
			EventTargetH.typedef('DOMMouseScroll', 'mousewheel');
		}

	}());

	QW.EventTargetH = EventTargetH;

}());