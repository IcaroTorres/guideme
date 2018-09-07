import { mapState, mapMutations, mapGetters } from 'vuex'
// import { state, getters, actions, mutations } from '../store'

// const allState = Reflect.ownKeys(state)
// const allGetters = Reflect.ownKeys(getters)
// const allActions = Reflect.ownKeys(actions)
// const allMutations = Reflect.ownKeys(mutations)

export const globalMixin = {
  data () {
    return {
      apptitle: 'app title',
      dummyavatar: 'https://bit.ly/2CaX7sw'
    }
  },
  computed: {
    ...mapState([
      'sidebar',
      'mini',
      'lightOut',
      'appLoading',
      'appError',
      'loggedUser',
      'teams',
      'projects',
      'blocks',
      'tasks'
    ]),
    ...mapGetters([
      'myProjects',
      'loggedUserObj',
      'users',
      'usernames',
      'user',
      'username',
      'useravatar'
    ]),
    lgAndUp () { return this.$vuetify.breakpoint.lgAndUp }
  },
  methods: {
    ...mapMutations({
      finishTask (commit, payload) { commit('finishTask', payload) },
      deleteTask (commit, payload) { commit('deleteTask', payload) },
      judgeDaily (commit, payload) { commit('judgeDaily', payload) },
      answerDaily (commit, payload) { commit('answerDaily', payload) },
      postComment (commit, payload) { commit('postComment', payload) },
      deleteComment (commit, payload) { commit('deleteComment', payload) },
      toggleSidebar (commit) { commit('toggleSidebar') },
      toggleMini (commit) { commit('toggleMini') },
      toggleLight (commit) { commit('toggleLight') },
      clearError (commit) { commit('clearError') },
      setLoading (commit) { commit('setLoading') }
    }),
    daysBetween: (date1, date2) => Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)),
    stringToDateddmmYYYY (dateString) {
      return (dateString || '').replace(/(\d{4})-(\d{2})-(\d{2})/, (str, y, m, d) => [d, m, y].join('/'))
    },
    dateToISODate (date) {
      return new Date(date).toISOString().split('T')[0]
    },
    isDelayed (t) {
      return (t.status === 0 && new Date(t.end).getTime() < new Date().getTime()) ||
      (t.status === 1 && new Date(t.end).getTime() < new Date(t.finishedAt).getTime())
    },
    formatPostTime (date = new Date()) {
      let d = new Date(date)
      return d.toLocaleDateString('pt-BR') + ' - ' + d.toLocaleTimeString()
    }
  }
}
