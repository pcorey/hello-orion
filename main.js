// Template.main.helpers({
    
// })

if (Meteor.isClient) {
    Template.main.helpers({
        test: function() {
            return '{{> tester 666}}';
        }
    });

    Template.tester.helpers({
        test: function() {
            return Session.get('test');
        }
    });
}