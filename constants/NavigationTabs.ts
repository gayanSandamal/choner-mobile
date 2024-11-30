import { IconNames, TabType } from "@/types/Components";

export const tabs: TabType[] = [
  {
    name: 'index',
    title: 'Insights',
    icon: {
      name: IconNames.dashboard,
      link: ''
    }
  },
  {
    name: 'community',
    title: 'Community',
    icon: {
      name: IconNames.handshake,
      link: '/(app)/(tabs)/community'
    },
    meta: {
      search: true,
    },
  },
  {
    name: 'interests',
    title: 'Interests',
    icon: {
      name: IconNames.interests,
      link: '/(app)/(tabs)/interests'
    },
    meta: {
      search: true,
    },
  },
  {
    name: 'video',
    title: 'Video',
    icon: {
      name: IconNames.play,
      link: 'video'
    },
    meta: {
      search: true,
    },
    hide: true,
  },
  {
    name: 'challenges',
    title: 'Challenges',
    icon: {
      name: IconNames.trophy,
      link: '/(app)/(tabs)/challenges'
    },
    meta: {
      search: true,
    },
  },
]