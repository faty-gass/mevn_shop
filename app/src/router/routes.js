
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/register', name: 'Register', component: () => import('pages/Register.vue') },
      { path: '/login', name: 'Login' ,component: () => import('pages/Login.vue') },
      { path: '/profile', name: 'Profile' ,component: () => import('pages/MyAccount.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
