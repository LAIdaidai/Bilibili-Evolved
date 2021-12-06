import { ComponentMetadata } from '@/components/types'
import { getUID, none } from '@/core/utils'
import { autoMatchMedal } from './auto-match'

export const component: ComponentMetadata = {
  name: 'badgeHelper',
  displayName: '直播勋章快速更换',
  description: {
    'zh-CN': '在直播区中, 可从功能面板中直接切换勋章和头衔. 默认加载 256 个 (同时也是上限), 可在选项中修改.',
  },
  entry: () => autoMatchMedal(),
  reload: none,
  unload: none,
  tags: [
    componentsTags.live,
  ],
  widget: {
    component: () => import('./BadgeHelper.vue').then(m => m.default),
    condition: () => Boolean(getUID()),
  },
  options: {
    autoMatchMedal: {
      defaultValue: true,
      displayName: '自动佩戴当前直播间勋章',
    },
    maxBadgeCount: {
      defaultValue: 256,
      displayName: '最大加载数量',
      validator: (value: number) => lodash.clamp(value, 1, 256),
    },
    defaultMedalID: {
      displayName: '默认勋章ID',
      hidden: true,
      defaultValue: 0,
    },
  },
  urlInclude: [
    '//live.bilibili.com',
  ],
}
