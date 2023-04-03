import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faStarSolid)
library.add(faStarRegular)
library.add(faSpinner)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')