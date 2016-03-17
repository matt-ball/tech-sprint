function home (req, res, next) {
  res.render('index', { page: 'Qtracker', className: 'home' });
}

module.exports = home;
