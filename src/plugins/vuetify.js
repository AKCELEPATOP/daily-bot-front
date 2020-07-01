import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.deepPurple.accent4
            }
        }
    },
    icons: {
        iconfont: 'mdi',
    },
});
