orion.admin.addAdminSubscription(orion.subs.subscribe('entity', 'pages'));

orion.dictionary.addDefinition('categories', 'basic', {
    type: [String],
    label: 'Categories'
});

// orion.dictionary.addDefinition('pages', 'config', {
//     type: [String],
//     optional: false,
//     label: 'Page Order',
//     allowedValues: function() {
//         return orion.dictionary.collection.findOne()['categories'];
//     },
//     autoform: {
//         options: function() {
//             return orion.dictionary.collection.findOne()['categories'].map(function(value) {
//                 return {
//                     value: value,
//                     label: value
//                 };
//             });
//         }
//     }
// });

orion.dictionary.addDefinition('pages.$', 'config', {
    type: String,
    label: 'Page',
    optional: false,
    autoform: {
        type: 'select',
        options: function() {
            return orion.entities.pages.collection.find().fetch().map(function(page) {
                return {
                    value: page._id,
                    label: page.title
                };
            });
        }
    }
});

orion.dictionary.addDefinition('pages', 'config', {
    type: Array,
    minCount: 1,
    maxCount: 4,
    optional: false,
    label: 'Page Order'
});


orion.addEntity('articles', {
    title: {
        type: String,
        label: 'Title'
    },
    category: {
        type: String,
        allowedValues: function() {
            return orion.dictionary.collection.findOne()['categories'];
        },
        autoform: {
            options: function() {
                return orion.dictionary.collection.findOne()['categories'].map(function(value) {
                    return {
                        value: value,
                        label: value
                    };
                });
            }
        },
        optional: false,
        label: 'Category'
    },
    content: {
        type: String,
        label: 'Content',
        autoform: {
            afFieldInput: {
                type: 'froala',
                inlineMode: false,
                buttons: ['undo', 'redo' , 'bold', 'sep', 'alert', 'insertHTML'],

                customButtons: {
                    alert: {
                        title: "Alert",
                        icon: {
                            type: "font",
                            value: "fa fa-info"
                        },
                        callback: function () {
                            //this.insertHTML('{{> tester 1337}}');
                            // var fragment = Meteor.render(function() {
                            //     return Template['tester']();
                            // });
                            // this.insertHTML(fragment);
                            var html = Blaze.toHTML(Blaze.With(1337, function() {
                                return Template.tester;
                            }));
                            this.insertHTML(html);
                            this.sync();
                            this.saveUndoStep();
                        },
                        refresh: function () {
                            // This method is called when the state of the button might have been changed.
                        }
                    }
                }
                // froala options goes here
            }
        }
    }
    // content: orion.attribute('froala', {
    //     label: 'Content',
    //     optional: false,
    //     afFieldInput: {

    //     }
    //     //colors: ["#61BD6D", "#1ABC9C", "#54ACD2"]
    // })
}, {
    icon: 'bookmark',
    sidebarName: 'Articles',
    pluralName: 'Articles',
    singularName: 'Article',
    tableColumns: [
        {
            data: 'title',
            title: 'Title'
        },
        orion.attributeColumn('froala', 'content', 'Preview')
    ]
});


orion.addEntity('pages', {
    title: {
        type: String,
        label: 'Title'
    },
    content: {
        type: String,
        label: 'Content',
        autoform: {
            afFieldInput: {
                type: 'froala',
                inlineMode: false,
            }
        }
    }
}, {
    icon: 'bookmark',
    sidebarName: 'Pages',
    pluralName: 'Pages',
    singularName: 'Page',
    tableColumns: [
        {
            data: 'title',
            title: 'Title'
        },
        orion.attributeColumn('froala', 'content', 'Preview')
    ]
});