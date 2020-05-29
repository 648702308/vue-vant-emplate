import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@/pages/home/Index.vue')
  }
];


// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

/*
* mode: 'hash' or 'history',
* */
const router = new Router({mode: 'history', routes});

/* eslint-disable no-new */
router.beforeEach(function (to, from, next) {
  // document.title = to.meta.title || process.env.TITLE;
  /* 路由发生变化修改页面title */
  // record => record.meta.requireAuth
  if (to.matched.some(function (record) {
    return record.meta.requireAuth
  })) { // 判断该路由是否需要登录权限
    next()
  } else {
    next();
  }
});


export default router;
