var callApiTimeout = null;

/* Logics*/
var vm = new Vue({
  el: '#wrapper',
  data: {
    images: [],
    query: ''
  },
  watch: {
    query: function (value) {
      clearTimeout(callApiTimeout);
      callApiTimeout = setTimeout(function () {
        var reqURL = "https://api.flickr.com/services/feeds/photos_public.gne";
        var options = {
          params: {
            format: 'json',
            tags: this.query
          }
        };

        this.$http.jsonp(reqURL, options);
      }.bind(this), 1250);
    }
  }
});

/* JSON callback */
function jsonFlickrFeed(response) {
  vm.$data.images = response.items;
}

/* Vue.js utilites */
Vue.directive('img', {
  inserted: function (el, binding) {
    lazyload(el, binding);
  },
  update: function (el, binding) {
    lazyload(el, binding);
  }
});

    // showing only first 10 tags
Vue.prototype.filters = {
  splitTags: function (value) {
    return value.split(' ').slice(0,10);
  }
}

/* General utility */
function lazyload(el, binding) {
  var img = new Image();
  img.src = binding.value;

  img.onload = function() {
    el.src = binding.value;
  };
}