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
    content: orion.attribute('froala', {
        label: 'Content',
        optional: false
    })
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
