import store from '@/store'

const { body } = document

const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route() {
      if (this.device === 'Mobile' && this.sidebar.opened) {
        store.dispatch('setting/closeSidebar', { withoutAnimation: false })
      }
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('setting/changeDevice', 'Mobile')
      store.dispatch('setting/closeSidebar', { withoutAnimation: true })
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()

        store.dispatch('setting/changeDevice', isMobile ? 'Mobile' : 'Desktop')

        if (isMobile) {
          store.dispatch('setting/closeSidebar', { withoutAnimation: true })
        }
      }
    },
  },
}
