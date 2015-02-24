// Template.main.helpers({
    
// })

if (Meteor.isClient) {
    Template.main.helpers({
        test: function() {
            return '{{> tester 666}}';
        }
    });

    Template.pages.helpers({
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
        }
    })

    Template.tester.helpers({
        test: function() {
            return Session.get('test');
        }
    });
}