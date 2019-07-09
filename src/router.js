import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const routes = [
  {
    path: '*',
    name: 'home',
    component: Home
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('./views/index.vue')
  },
  {
    path: '/a',
    meta: { requireAuth: true, }, component: () => import('./html/a.vue'),

  },

  {
    path: '/b',
    meta: { requireAuth: true, }, component: () => import('./html/b.vue')
  },
  {
    path: '/b2',
    meta: { requireAuth: true, }, component: () => import('./html/b2.vue')
  },
  {
    path: '/c',
    meta: { requireAuth: true, }, component: () => import('./html/c.vue')
  },
  {
    path: '/d',
    meta: { requireAuth: true, }, component: () => import('./html/d.vue')
  },
  {
    path: '/e',
    meta: { requireAuth: true, }, component: () => import('./html/e.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/f',
    meta: { requireAuth: true, }, component: () => import('./html/f.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/g',
    meta: { requireAuth: true, }, component: () => import('./html/g.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/h',
    meta: { requireAuth: true, }, component: () => import('./html/h.vue')
  },
  {
    path: '/i',
    meta: { requireAuth: true, }, component: () => import('./html/i.vue'),
    props: router => ({
      ryId: router.query.ryId,
      bId: router.query.bId,
      fId: router.query.fId
    })
  },

  {
    path: '/j',
    meta: { requireAuth: true, }, component: () => import('./html/j.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/k',
    meta: { requireAuth: true, }, component: () => import('./html/k.vue')
  },
  {
    path: '/l',
    meta: { requireAuth: true, }, component: () => import('./html/l.vue'),
    props: router => ({
      safeId: router.query.safeId,
      bId: router.query.bId,
      fId: router.query.fId
    })
  },

  {
    path: '/m',
    meta: { requireAuth: true, }, component: () => import('./html/m.vue')
  },
  {
    path: '/n',
    meta: { requireAuth: true, }, component: () => import('./html/n.vue'),
    props: router => ({
      workpersonId: router.query.workpersonId,
      bId: router.query.bId,
      fId: router.query.fId
    })
  },

  {
    path: '/o',
    meta: { requireAuth: true, }, component: () => import('./html/o.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },
  {
    path: '/p',
    meta: { requireAuth: true, }, component: () => import('./html/p.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/q',
    meta: { requireAuth: true, }, component: () => import('./html/q.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/r',
    meta: { requireAuth: true, }, component: () => import('./html/r.vue')
  },
  {
    path: '/s',
    meta: { requireAuth: true, }, component: () => import('./html/s.vue'),
    props: router => ({
      bId: router.query.bId,
      fId: router.query.fId
    })
  },
  {
    path: '/t',
    meta: { requireAuth: true, }, component: () => import('./html/t.vue'),
    props: router => ({
      isDone: router.query.isDone,
    })
  },

  {
    path: '/u',
    meta: { requireAuth: true, }, component: () => import('./html/u.vue')
  },
  {
    path: '/v',
    meta: { requireAuth: true, }, component: () => import('./html/v.vue')
  },
  {
    path: '/w',
    meta: { requireAuth: true, }, component: () => import('./html/w.vue')
  },
  {
    path: '/x',
    meta: { requireAuth: true, }, component: () => import('./html/x.vue')
  },
  {
    path: '/y',
    meta: { requireAuth: true, }, component: () => import('./html/y.vue')
  },
  {
    path: '/z',
    meta: { requireAuth: true, }, component: () => import('./html/z.vue')
  },
  {
    path: '/chat',
    meta: { requireAuth: true, }, component: () => import('./html/chat.vue')
  },
  {
    path: '/select',
    meta: { requireAuth: true, }, component: () => import('./components/select.vue')
  },

  {
    path: '/work',
    name: 'work',
    meta: {
      requireAuth: true,
    },
    // props: router => ({
    //   id: router.query.id,
    //   title:router.query.title,
    //   type:router.query.type
    // }),
    component: () => import('./views/Work.vue')
  },
  {
    path: '/workList',
    name: 'workList',
    // meta: {
    //   requireAuth: true,
    // },
    // props: (route) => ({id: route.query.id}),
    component: () => import('./views/WorkList.vue')
  },
  {
    path: '/workDetail',
    name: 'workDetail',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/WorkDetail.vue')
  },
  {
    path: '/bid',
    name: 'bid',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/bid.vue')
  },
  {
    path: '/takeIDCardForWriteWorkInfo',
    name: 'takeIDCardForWriteWorkInfo',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/TakeIDCardForWriteWorkInfo.vue')
  },
  {
    path: '/takePhotoForWriteWorkInfo',
    name: 'takePhotoForWriteWorkInfo',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/TakePhotoForWriteWorkInfo.vue')
  },
  {
    path: '/sealApplication',
    name: 'sealApplication',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/SealApplication.vue')
  },
  {
    path: '/sealApplicationHandle',
    name: 'sealApplicationHandle',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/SealApplicationHandle.vue')
  },
  {
    path: '/dynaactionform',
    name: 'dynaactionform',
    meta: {
      requireAuth: true,
    },
    props: router => ({
      id: router.query.id,
      index:router.query.index
    }),
    component: () => import('./views/Dynaactionform.vue')
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: () => import('./views/HomePage.vue')
  },
  {
    path: '/TwoNavBar',
    name: 'TwoNavBar',
    // meta: {
    //   requireAuth: true,
    // },
    component: () => import('./views/TwoNavBar.vue')
  },
  {
    path: '/myWork',
    name: 'myWork',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/MyWork.vue')
  },
  {
    path: '/cOrCDetail',
    name: 'cOrCDetail',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/COrCDetail.vue')
  },
  {
    path: '/myWorkList',
    name: 'myWorkList',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/MyWorkList.vue')
  },
  {
    path: '/hallList',
    name: 'hallList',
    component: () => import('./views/HallList.vue')
  },
  {
    path: '/search',
    name: 'search',
    // meta: {
    //   requireAuth: true,
    // },
    component: () => import('./views/Search.vue')
  },
  {
    path: '/complaint',
    name: 'complaint',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/Complaint.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/Feedback.vue')
  },
  {
    path: '/myWorkReceipt',
    name: 'myWorkReceipt',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/MyWorkReceipt.vue')
  },
  {
    path: '/myWorkDetailNoNeedToChange',
    name: 'myWorkDetailNoNeedToChange',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/MyWorkDetailNoNeedToChange.vue')
  },
  {
    path: '/photoDetailForMyWorkDetail',
    name: 'photoDetailForMyWorkDetail',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/PhotoDetailForMyWorkDetail.vue')
  },
  {
    path: '/newsDetail',
    name: 'newsDetail',
    // meta: {
    //   requireAuth: true,
    // },
    component: () => import('./views/NewsDetail.vue')
  },
  {
    path: '/cardPackage',
    name: 'cardPackage',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/CardPackage.vue')
  },
  {
    path: '/myCardDetail',
    name: 'myCardDetail',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/MyCardDetail.vue')
  },
  {
    path: '/iDCardModify',
    name: 'iDCardModify',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/IDCardModify.vue')
  },
  {
    path: '/loginOne',
    name: 'loginOne',
    component: () => import('./views/LoginOne.vue')
  },
  {
    path: '/loginTwo',
    name: 'loginTwo',
    component: () => import('./views/LoginTwo.vue')
  },
  {
    path: '/expressDelivery',
    name: 'expressDelivery',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/ExpressDelivery.vue')
  },
  {
    path: '/expressDeliveryDetail',
    name: 'expressDeliveryDetail',
    meta: {
      requireAuth: true,
    },
    component: () => import('./views/ExpressDeliveryDetail.vue')
  }
]

export default new Router({
  routes,
  base: '/dist',
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  fallback: true
})
