new Vue({
  el: '#app',
  data: {
    state: {
      privacy: false,
      contact: false,
      maintenance: true,
      monitoring: false,
      products: false,
      about: false
    },
    content: {
      welcome:     'Loading..',
      about:       'Loading..',
      blurbs:      'Loading..',
      products:    'Loading..',
      support:     'Loading..',
      maintenance: 'Loading..',
      privacy:     'Loading..',
      contact:     'Loading..'
    },
    isPlot: false,
    backgroundDirectory: 'assets/images/background/',
    layout: [
      {
        backgroundImage: 'astronaut.jpg',
      },
      {
        backgroundImage: 'businessman.jpg',
      },
      {
        backgroundImage: 'cloud-city.jpg',
      },
      {
        backgroundImage: 'code.jpg',
      },
      {
        backgroundImage: 'coinage.jpg',
      },
      {
        backgroundImage: 'ledger.jpg',
      },
      {
        backgroundImage: 'lime.jpg',
      },
      {
        backgroundImage: 'mountain.jpg',
      },
      {
        backgroundImage: 'nightscape.jpg',
      },
      {
        backgroundImage: 'sunroom.jpg',
      },
      {
        backgroundImage: 'watch.jpg',
      },
      {
        backgroundImage: 'workflow.jpg',
      }
    ]
  },
  methods: {
    switchState: function(next) {
      if(this.state[next]===undefined) {
        throw 'Undefined state';
        return;
      } else if(!this.state[next]) {
        this.seedLayout(next);
      }
    },
    hydrate: function ( id, textFile ) {
      if(!textFile) {
        textFile = id+'.txt';
      }
      var vueInstance = this;
      $.get('assets/txt/'+textFile, function(text) {
        vueInstance.content[id] = text;
      }, 'text');
    },
    hydrateMaintenance: function () {
      var vueInstance = this;
      $.get('api/api-maintenance.json', function(response) {
        vueInstance.content.maintenance = '<h4>Upcoming Maintenance</h4><p>'+response.upcoming+'</p><h4>RecentMaintenance</h4><p>'+response.recent+'</p>';
      });
    },
    getBackground: function(index) {
      return this.backgroundDirectory + this.layout[index].backgroundImage;
    },
    seedContent: function() {
      this.hydrate( 'welcome' );
      this.hydrate( 'about' );
      this.hydrate( 'blurbs');
      this.hydrate( 'products' );

      this.hydrate( 'support' );
      this.hydrateMaintenance();
      this.hydrate( 'privacy' );
      this.hydrate( 'contact', 'contact.html' );
      this.hydrate( 'monitoring' );
    },
    seedLayout: function(nextState) {
      var nextLayout = Math.floor(Math.random()*this.layout.length);
      var transitionNode = $('<div class="transition"></div>');
      var vueInstance = this;
      transitionNode.css('background-image', 'url(' + this.getBackground(nextLayout) + ')');

      $('#contentContainer').append(transitionNode);
      $('.transition').animate({
        top: "110px"
      }, 1000, function() {
        if(nextState=='monitoring' && !this.isPlot) {
          this.isPlot = true;
          plotUptime();
        }
        Object.keys(vueInstance.state).forEach( x => { vueInstance.state[x] = x == nextState });
        $('#content').css('background-image', 'url(' + vueInstance.getBackground(nextLayout) + ')');
        transitionNode.fadeOut(400, transitionNode.remove);
      });
    },
    initBackground: function() {
      $('#content').css('background-image', 'url(' + this.backgroundDirectory + this.layout[Math.floor(Math.random()*this.layout.length)].backgroundImage + ')');
    },
  },
  mounted: function() {
    this.seedContent();
    this.initBackground();
  }
});

function plotUptime(data) {
  $.get('api/api-monitoring.json', function(response) {
    Plotly.plot( 
      document.getElementById('tester'), 
      [response], 
      { margin: { t: 0 } } 
    );
  });    
};    

function reloadCaptcha() {
  document.getElementById('CaptchaImage').src='api/captcha.jpg?'+Date();
  document.contactForm.CaptchaCode.focus();
};