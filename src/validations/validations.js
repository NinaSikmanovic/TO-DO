import Vue from 'vue';
import {ValidationObserver, ValidationProvider, extend, localize} from "vee-validate";

import {
  max,
  required,
} from 'vee-validate/dist/rules';

localize({
  en: {
    messages: {
      required: 'This field is required',
      max: 'The maximum number of characters is {length} '
    }
  }
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', required);
extend('max', max);


