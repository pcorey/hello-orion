orion.admin.addAdminSubscription(orion.subs.subscribe('entity', 'pages'));

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
    optional: false,
    label: 'Page Order'
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