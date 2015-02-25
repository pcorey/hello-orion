Router.route('/', function() {
    this.render('pages');
});

Router.route('/page/:_id', function() {
    this.render('page');
});