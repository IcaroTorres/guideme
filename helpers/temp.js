import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export const obj = {
  ...mapActions([
    'toggleTask',
    'toggleArchiving',
    'invite',
    'deleteTask',
    'postComment',
    'deleteComment',
    'answerDaily',
    'judgeDaily',
    'moveTask'
  ]),
  ...mapMutations([
    'toggleSnack',
    'setError',
    'clearError',
    'setLoading'
  ]),
  ...mapState([
    'sidebar',
    'mini',
    'lightOut',
    'appLoading',
    'appError',
    'loggedUser',
    'users',
    'projects',
    'blocks',
    'tasks',
    'dailyMeetings',
    'snack'
  ]),
  ...mapGetters([
    'myProjects',
    'myArchive',
    'loggedUserObj',
    'usernames',
    'username',
    'useravatar',
    'userProjects',
    'userTasks',
    'userByName',
    'projectBlocks',
    'projectTasks',
    'doneTasks',
    'delayedTasks',
    'isDelayed',
    'temperColor',
    'temperColorInvert',
    'memberScoreForTasks',
    'memberScoreForDailies',
    'daysBetween',
    'task',
    'xlOnly',
    'lgAndUp',
    'lgAndDown',
    'lgOnly',
    'mdAndUp',
    'mdAndDown',
    'mdOnly',
    'smAndUp',
    'smAndDown',
    'smOnly',
    'xsOnly'
  ])
}
