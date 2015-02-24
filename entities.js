orion.dictionary.addDefinition('categories', 'basic', {
    type: [String],
    label: 'Categories'
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
