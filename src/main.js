import axios from 'axios';

export let host='http://zlaksa.ru:9000';
//export let host='http://localhost:9000';

export let ax=(axios.create({  baseURL: host}))

export function myClone(arg) {
  let a = JSON.stringify(arg);
  return (JSON.parse(a));
}

import Vue from 'vue'


import NewPage from './NewPage'
import SiteHeader from './SiteHeader'
import TabBar from './TabBar'
import SearchBar from './SearchBar'
import UserBar from './UserBar'



Vue.component('new-page', NewPage);
Vue.component('site-header', SiteHeader);
Vue.component('tab-bar', TabBar);
Vue.component('search-bar', SearchBar);
Vue.component('user-bar', UserBar);

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

new Vue({
  el: '#app',
  render: h => h(NewPage),
  /*methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 50) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      return window.scrollY > 100
    }
  }*/
});

//-----------------------------


