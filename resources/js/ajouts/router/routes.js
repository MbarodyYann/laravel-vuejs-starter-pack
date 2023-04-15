import HomeView from '../../pages/HomeView.vue'
import Login from '../../pages/auth/login.vue'
import Register from '../../pages/auth/register.vue'
import PasswordEmail from '../../pages/auth/password/email.vue'
import PasswordReset from '../../pages/auth/password/reset.vue'
import VerificationVerify from '../../pages/auth/verification/verify.vue'
import VerificationResend from '../../pages/auth/verification/resend.vue'
import SettingsIndex from '../../pages/settings/index.vue'
import SettingsProfile from '../../pages/settings/profile.vue'
import SettingsPassword from '../../pages/settings/password.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/password/reset', name: 'password.request', component: PasswordEmail },
  { path: '/password/reset/:token', name: 'password.reset', component: PasswordReset },
  { path: '/email/verify/:id', name: 'verification.verify', component: VerificationVerify },
  { path: '/email/resend', name: 'verification.resend', component: VerificationResend },
  {
    path: '/settings',
    component: SettingsIndex,
    children: [
      { path: '', redirect: { name: 'settings.profile' } },
      { path: 'profile', name: 'settings.profile', component: SettingsProfile },
      { path: 'password', name: 'settings.password', component: SettingsPassword },
    ]
  },
]