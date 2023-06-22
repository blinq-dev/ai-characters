import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { useCharacterStore } from './stores/character'
import { useSettingsStore } from './stores/settings'

const app = createApp(App)

app.directive('click-outside', {
    beforeMount: function (element, binding) {
        console.log({
            element,
            binding
        });

        //  check that click was outside the el and his children
        element.clickOutsideEvent = function (event) {
            // and if it did, call method provided in attribute value
            if (!(element === event.target || element.contains(event.target))) {
                binding.value(event);
            }
        };
        document.body.addEventListener('click', element.clickOutsideEvent)
    },
    unmounted: function (element) {
        document.body.removeEventListener('click', element.clickOutsideEvent)
    }
});

app.use(createPinia())
app.use(router)

app.mount('#app')

useSettingsStore().loadSettings()
useCharacterStore().loadCharactersFromLocalStorage()