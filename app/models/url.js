import DS from 'ember-data';

export default DS.Model.extend({
	address: DS.attr(),
    description: DS.attr(),
	shortLink: DS.attr(),
    date: DS.attr(),
	stat: DS.attr(),
	user: DS.attr(),
    tags: DS.attr()
});





	//tags: {tag1: 'string', tag2: 'string', tag3: 'string', tag4: 'string', tag5: 'string'}