(function(){
var QW=window.QW,
	mix=QW.ObjectH.mix;

var CustEventTarget=QW.CustEventTarget=function(){
	this.__custListeners={};
};

QW.HelperH.methodizeTo(QW.CustEventTargetH, CustEventTarget.prototype,null, {on:'operator',un:'operator'}); //��Helper�������prototype������ͬʱ�޸�on/un�ķ���ֵ

QW.CustEvent.createEvents = CustEventTarget.createEvents = function(target,types){
	QW.CustEventTargetH.createEvents(target, types);
	return mix(target,CustEventTarget.prototype);//���ض������on��
};
})();