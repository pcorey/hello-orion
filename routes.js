Router.route('/', {
    name: 'pages',
    layoutTemplate: 'pages',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [
            orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'pages')
        ];
    },
    data: function() {
        var pages = [];
        var order = orion.dictionary.get('pages', []);
        return {
            pages: orion.entities.pages.collection.find({_id: {$in: order}})
        };
    }
});

Router.route('/page/:_id', {
    name: 'page',
    layoutTemplate: 'page',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [
            orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'pages')
        ];
    },
    data: function() {
        var pages = [];
        var order = orion.dictionary.get('pages', []);
        return {
            pages: orion.entities.pages.collection.find({_id: {$in: order}}),
            page: orion.entities.pages.collection.find(this.params._id)
        };
    }
});