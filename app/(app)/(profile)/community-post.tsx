import CommunityView from '@/components/PostViews/CommunityView'
import { SettingsWrapper } from '@/components/Wrappers/SettingsWrapper'
import { router } from 'expo-router'

export default function CommunityScreen() {
  return (
    <SettingsWrapper header="">
        <CommunityView />
    </SettingsWrapper>
  )
}
