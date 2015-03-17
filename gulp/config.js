var path = require('path');
var argv = require('minimist')(process.argv.slice(2));

module.exports = {
  task: {
    ghpages: [
      'concat:vendor',
      'concat:lib',
      'less:dev',
      'copy:images',
      'copy:images:vendor',
      'copy:fonts',
      'copy:polyfills',
      'copy:js:guide',
      'build'
    ]
  },
  collections: function(sortComponents){
        var collection = {};
        collection.pages = {
          sortBy: 'menu',
          reverse: false
        };
        collection.components = {
          pattern: '*-component.html',
          sortBy: function(a, b) {
            return sortComponents.sort.call(sortComponents, a, b);
          }
        };
        collection.javascript = {
          pattern: '*-javascript.html'
        };
        collection.examples = {}; // empty pattern because the pages are tagged with collection attribute in YAML front matter
        return collection;
      },
  args: {
    verbose: !!argv.verbose
  },
  project: {
    path: path.resolve(__dirname, '..')
  },
  regex: {
    select: [/url\('select2/g, "url('../images/vendor/select2"]
  },
  less: {
    src: ['less/availity-uikit.less', 'less/pages/docs.less'],
    targets: ['**/*.less'],
    dest: 'build/guide/css',
    destMaps: './maps', // relative to dest folder
    browsers: ['> 1%', 'last 3 versions', 'ie 8', 'ie 9']
  },
  css: {
    src: 'build/guide/**/*.css',
    targets: ['less/availity-uikit.less', 'less/pages/docs.less'],
    dest: 'dist/css',
    destMaps: './maps' // relative to dest folder
  },
  fonts: {
    src: 'fonts/**/*.{ttf,woff,eot,svg}',
    dest: 'build/guide/fonts',
    destDist: 'dist/fonts'
  },
  images: {
    src: 'images/**/*.{png,jpg,jpeg,gif}',
    dest: 'build/guide/images',
    destDist: 'dist/images'
  },
  sync: {
    src: 'build/guide'
  },
  docs: {
    all: {
      src: [
        'docs/guide/pages/*.html',
        'docs/guide/pages/examples/*.html',
        'less/**/*.html',
        'js/**/*.html'
      ]
    },
    components: {
      src: 'less/*.html'
    },
    partials: {
      src: 'docs/guide/templates/partials/*.hbs',
      targets: 'docs/guide/templates/partials/**/*.hbs'
    },
    templates: {
      src: './docs/guide/templates',
      targets: 'docs/guide/templates/**/*.hbs',
      extension: '.hbs',
      engine: 'handlebars'
    },
    dest: 'build/guide',
    sort: {
      // sort order for components.  if the title changes we are toast!
      components: [
        'Colors',
        'App Icons',
        'Type',
        'Navbar',
        'Navs',
        'Mega Menu',
        'Alerts and Warnings',
        'Badges',
        'Breadcrumbs',
        'Buttons',
        'Contextual Menu',
        'Footer',
        'Form',
        'Labels',
        'List Groups',
        'Pagination',
        'Panels',
        'Tables',
        'Progress Bar',
        'Wizard',
        'Wells'
      ]
    }
  },
  packages: {
    src: ['./package.json', './bower.json']
  },
  readme: {
    src: ['docs/readme/readme.config.md'],
    name: 'README.md',
    dest: './'
  },
  js: {
    src: ['gulpfile.js', 'gulp/**/*.js'],
    dest: 'build/guide/js'
  },
  jsGuide: {
    src: ['docs/guide/js/docs.js'],
    dest: 'build/guide/js'
  },
  lib: {
    name: 'availity-uikit.js',
    src: [
      'js/*.js'
    ],
    targets: 'js/*.js',
    dest: 'build/guide/js',
    destDist: 'dist/js'
  },
  libBundle: { // combine Bootstrap and availity-uikit.js
    name: 'availity-uikit-bundle.js',
    src: [
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'js/*.js'
    ],
    targets: 'js/*.js',
    dest: 'build/guide/js',
    destDist: 'dist/js'
  },
  vendor: {
    name: 'vendor.js',
    src: [
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/moment/moment.js',
      'bower_components/eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js',
      'bower_components/typeahead.js/dist/typeahead.bundle.js',
      'bower_components/select2/select2.js',
      'bower_components/velocity/velocity.js',
      'bower_components/velocity/velocity.ui.js',
      'bower_components/chartjs/Chart.js'
    ],
    dest: 'build/guide/js'
  },
  vendorImages: {
    src: [
      'bower_components/select2/*.{png,jpg,jpeg,gif}'
    ],
    dest: 'images/vendor'
  },
  polyfills: {
    src: [
      'bower_components/ExplorerCanvas/excanvas.js'
    ],
    dest: 'build/guide/js'
  },
  filters: [
    '*',
    '!**/*-ui-demo.html'
  ]
};
