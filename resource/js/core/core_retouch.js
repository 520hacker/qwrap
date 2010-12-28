(function(){
	var methodizeTo=QW.HelperH.methodizeTo,
		applyTo=QW.HelperH.applyTo,
		mix=QW.ObjectH.mix;
	/**
	 * @class Object ��չObject����ObjectH������Object���ر�˵����δ��Object.prototype����Ⱦ���Ա�֤Object.prototype�Ĵ�����
	 * @usehelper QW.ObjectH
	 */
	mix(Object,QW.ObjectH);

	/**
	 * @class Array ��չArray����ArrayH/HashsetH������Array
	 * @usehelper QW.ArrayH,QW.HashsetH
	 */
	mix(QW.ArrayH, QW.HashSetH);
	applyTo(QW.ArrayH,Array);
	methodizeTo(QW.ArrayH,Array.prototype)

	/**
	 * @class Function ��չFunction����FunctionH/ClassH������Function
	 * @usehelper QW.FunctionH
	 */
	mix(QW.FunctionH, QW.ClassH);
	applyTo(QW.FunctionH,Function);
	methodizeTo(QW.FunctionH,Function.prototype)

	/**
	 * @class Date ��չDate����DateH������Date
	 * @usehelper QW.DateH
	 */
	applyTo(QW.DateH,Date);
	methodizeTo(QW.DateH,Date.prototype)


	/**
	 * @class String ��չString����StringH������String
	 * @usehelper QW.StringH
	 */
	applyTo(QW.StringH,String);
	methodizeTo(QW.StringH,String.prototype);
})();