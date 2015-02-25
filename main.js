if (Meteor.isClient) {
    Template.nav.helpers({
        sortedPages: function() {
            var order = orion.dictionary.get('pages', []);
            var orderMap = order.reduce(function(map, id, idx) {
                map[id] = idx;
                return map;
            }, {});
            var fetch = orion.entities.pages.collection.find({_id: {$in: order}}).fetch();
            fetch.sort(function(a, b) {
                return orderMap[a._id] - orderMap[b._id];
            });
            return fetch;
        },
        current: function(path) {
            console.log('current', Iron.Location.get().path, '/page/'+this._id);
            return Iron.Location.get().path === '/page/'+this._id;
        }
    });
}