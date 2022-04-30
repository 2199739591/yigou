import Home from '@/views/Home'
import Search from '@/views/Search'
export default [
  { path: '/', redirctive: '/home' },
  { path: '/home', component: Home },
  { path: '/search', component: Search }

]