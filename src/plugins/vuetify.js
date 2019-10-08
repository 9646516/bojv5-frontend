import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHans from 'vuetify/es5/locale/zh-Hans';
import { VAlert, VApp, VAutocomplete, VAvatar, VBtn, VCard, VCheckbox, VChip, VDataIterator, VDataTable, VDatePicker, VDialog, VDivider, VForm, VGrid, VHover, VIcon, VImg, VItemGroup, VList, VMenu, VNavigationDrawer, VPagination, VProgressCircular, VProgressLinear, VSelect, VSlider, VSnackbar, VSubheader, VSwitch, VTabs, VTextarea, VTextField, VTimePicker, VToolbar, VTooltip, VWindow } from 'vuetify/es5/components';
import Resize from 'vuetify/es5/directives';
import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);
Vue.use(colors)
Vue.use({
	components: {
		VWindow,
		VItemGroup,
		VSlider,
		VTimePicker,
		VDatePicker,
		VDialog,
		VCheckbox,
		VChip,
		VAlert,
		VImg,
		VProgressCircular,
		VHover,
		VTooltip,
		VTextarea,
		VSubheader,
		VSwitch,
		VApp,
		VNavigationDrawer,
		VGrid,
		VToolbar,
		VList,
		VBtn,
		VAvatar,
		VCard,
		VMenu,
		VIcon,
		VAutocomplete,
		VDataTable,
		VPagination,
		VTabs,
		VSelect,
		VTextField,
		VForm,
		VDivider,
		VProgressLinear,
		VSnackbar,
		VDataIterator,
	},
	directives: {
		Resize,
	},
	iconfont: 'mdi'
});
export default new Vuetify({
	theme: {
		options: {
			customProperties: true,
		},
		themes: {
			light: {
				primary: '#01579B',
			},
		},
	},
	lang: {
		locales: { zhHans },
		current: 'zh-Hans',
	},
	icons: {
		iconfont: 'mdi',
	},
});
