Router.route('/', function() {
    this.render('main');
});

Router.route('/page/:_id', function() {
    this.render('page');
});