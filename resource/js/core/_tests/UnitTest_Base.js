
(function(){

describe('QW', {
	'QW Members': function() {
		value_of("����QWӵ�е�����").log();

		value_of(QW.ObjectH.getType(QW)).should_be('object');
		value_of(QW.ObjectH.getType(QW.VERSION)).should_be('string');
		value_of(QW.ObjectH.getType(QW.RELEASE)).should_be('string');

		value_of("����QWӵ�еķ���").log();

		value_of(QW).should_have_method('provide');
		value_of(QW).should_have_method('noConflict');

		value_of(QW.PATH).log();
		
	},
	'QW.provide': function(){
		value_of("QW.provide��QW provide����").log();

		QW.provide("testtest1",'value1');
		value_of(QW.testtest1).should_be("value1");
		QW.provide({testtest2:'value2'});
		value_of(QW.testtest2).should_be("value2");
	}
});

})();