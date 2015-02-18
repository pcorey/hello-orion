Options = new Meteor.Collection('options');

orion.dictionary.addDefinition('optionValues', 'basic', {
    type: [String],
    label: 'Options'
});

orion.addEntity('pages', {
    title: {
        type: String,
        label: 'Title'
    },
    public: {
        type: Boolean,
        defaultValue: false,
        label: 'Visible to non-members?'
    },
    type: {
        type: String,
        allowedValues: function() {
            return orion.dictionary.collection.find().fetch()[0]['optionValues'];
        },
        autoform: {
            options: function() {
                return orion.dictionary.collection.find().fetch()[0]['optionValues'].map(function(value) {
                    return {
                        value: value,
                        label: value
                    };
                });
            }
        },
        optional: false,
        label: 'What type of page is this?'
    },
    body: orion.attribute('froala', {
        label: 'Page Contents',
        optional: false
    })
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
        {
            data: 'public',
            title: 'Public'
        },
        orion.attributeColumn('froala', 'body', 'Preview')
    ]
});

if (Meteor.isClient) {
    Meteor.subscribe('options');
}

if (Meteor.isServer) {
    Meteor.publish('options', function() {
        return Options.find();
    });
}
