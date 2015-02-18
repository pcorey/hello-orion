Options = new Meteor.Collection('options');

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
        allowedValues: Options.find().fetch().map(function(o){return o.name;}),
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