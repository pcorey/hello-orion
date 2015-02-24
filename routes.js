Router.route('/', {
    name: 'main',
    layoutTemplate: 'main',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [
            orion.subs.subscribe('dictionary'),
            orion.subs.subscribe('entity', 'articles')
        ];
    },
    data: function() {
        return {
            articles: orion.entities.articles.collection.find({}, { sort: { createdAt: -1 } })
        };
    }
});

Router.route('/pages', {
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