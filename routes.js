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