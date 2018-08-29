const increaseDays = (date, daysCount) => {
  let [ increased, daysInMilliseconds ] = [ new Date(date), daysCount * 24 * 60 * 60 * 1000 ]
  increased.setTime(increased.getTime() + daysInMilliseconds)
  console.log(increased)
  return increased
}

export const state = () => ({
  sidebar: false,
  users: {
    'u1': {
      username: 'icarotorres',
      id: 'u1',
      email: 'icaro.stuart@gmail.com',
      profilePicture: 'https://icarotorres.github.io/images/perfil1.jpg',
      tasks: ['t1'],
      projects: ['p1', 'p2'],
      teams: ['tm1'],
      dailyMeetings: ['d1'],
      notifications: ['n1', 'n2', 'n3', 'n4']
    },
    'u2': {
      username: 'giltonsilva',
      id: 'u2',
      email: 'gilton.ferreira@dcomp.ufs.br',
      profilePicture: '',
      tasks: [],
      projects: ['p1', 'p2'],
      teams: ['tm1'],
      dailyMeetings: ['d1'],
      notifications: ['n1']
    }
  },
  projects: {
    'p1': {
      id: 'p1',
      creator: 'u2',
      manager: 'u2',
      coworkers: ['u1', 'u2'],
      title: 'Ferramenta Reativa para Gestão Ágil de Projetos Acadêmicos',
      description: 'Find process problems, co-workers dificulties and get the best returns from your teams engagement',
      company: 'UFS - Universidade Federal de Sergipe',
      blocks: [
        { text: 'To-do', color: 'primary', tasks: ['t1', 't1', 't1'] },
        { text: 'Doing', color: 'info', tasks: ['t1', 't2', 't2', 't2', 't2'] },
        { text: 'To-check', color: 'accent', tasks: ['t3', 't3', 't3', 't3', 't3'] },
        { text: 'To-fix', color: 'warning', tasks: ['t0', 't0', 't0'] },
        { text: 'Done', color: 'success', tasks: ['t4', 't4', 't4', 't4'] }
      ],
      dailyMeetings: ['d1'],
      start: new Date(),
      end: null,
      finished: null,
      notes: '',
      status: 0
    },
    'p2': {
      id: 'p2',
      creator: 'u1',
      manager: 'u1',
      coworkers: ['u1', 'u2'],
      title: 'Dummy Title',
      description: 'Dummy description',
      company: 'UFS - Universidade Federal de Sergipe',
      blocks: [
        { text: 'To-do', color: 'primary', tasks: ['t1', 't1', 't1'] },
        { text: 'Doing', color: 'info', tasks: ['t1', 't2', 't2', 't2', 't2'] },
        { text: 'Done', color: 'success', tasks: ['t4', 't4', 't4', 't4'] }
      ],
      dailyMeetings: ['d1'],
      start: new Date(),
      end: null,
      finished: null,
      notes: '',
      status: 0
    }
  },
  tasks: {
    't0': {
      id: 't0',
      creator: 'u1',
      project: 'p1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/18/2018'),
      end: increaseDays(new Date('08/18/2018'), 15),
      finished: null,
      comments: [],
      status: 4
    },
    't1': {
      id: 't1',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/22/2018'),
      end: increaseDays(new Date('08/22/2018'), 11),
      finished: null,
      comments: [],
      status: 0
    },
    't2': {
      id: 't2',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/25/2018'),
      end: increaseDays(new Date('08/25/2018'), 21),
      finished: null,
      comments: [],
      status: 1
    },
    't3': {
      id: 't3',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/18/2018'),
      end: increaseDays(new Date('08/18/2018'), 8),
      finished: null,
      comments: [],
      status: 2
    },
    't4': {
      id: 't4',
      project: 'p1',
      creator: 'u1',
      assigned: 'u1',
      title: 'Dummy task title',
      description: 'task description',
      start: new Date('08/31/2018'),
      end: increaseDays(new Date('08/31/2018'), 13),
      finished: null,
      comments: [],
      status: 3
    }
  },
  comments: {
    'c1': {
      id: 'c1',
      by: 'u1',
      at: 't1',
      date: new Date(),
      text: 'dummy test comment sample',
      likes: []
    }
  },
  dailyMeetings: {
    'd1': {
      id: 'd1',
      manager: 'u1',
      assigned: 'u1',
      r1: '',
      r2: '',
      r3: '',
      start: new Date(),
      end: null, // 24hr after
      finished: null
    }
  },
  status: {
    0: 'active',
    1: 'done',
    2: 'delayed',
    3: 'closed'
  },
  notifications: {
    'n1': {
      id: 'n1',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    },
    'n2': {
      id: 'n2',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    },
    'n3': {
      id: 'n3',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    },
    'n4': {
      id: 'n4',
      sender: '',
      receiver: 'u1',
      title: 'Test Notification',
      message: 'A dummy Test Notification to be seen',
      route: {
        name: 'notification', // route name
        params: { id: 'n1' }, // route params object
        path: '/notification/n1'// route path
      },
      status: 0
    }
  }
})

export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const getters = {
  users (state) {
    return state.users
  },
  usernames (state) {
    return Object.values(state.users).map(u => u.username)
  },
  user (state) {
    return uid => state.users[uid]
  },
  userByName (state) {
    return username => Object.values(state.users).find(user => user.username === username)
  },
  userProjects (state) {
    return uid => state.users[uid]
      .projects.map(pId => state.projects[pId])
  },
  userNotifications (state) {
    return uid => state.users[uid]
      .notifications.map(nid => state.notifications[nid])
  },
  task (state) {
    return taskId => state.tasks[taskId]
  },
  taskComments (state) { return task => task.comments.map(c => state.comments[c.id]) }
}
