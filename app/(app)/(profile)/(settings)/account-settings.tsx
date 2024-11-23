import { fblogOut } from "@/auth"
import { Btn, BtnDetailed } from "@/components/Base/Button"
import Label from "@/components/Base/Label"
import Modal from "@/components/Base/Modal"
import { Spacer } from "@/components/Base/Spacer"
import { SettingsWrapper } from "@/components/Wrappers/SettingsWrapper"
import { Colors } from "@/constants/Colors"
import { useSession } from "@/hooks/ctx"
import { useDeleteUser } from "@/hooks/mutate/useMutateUser"
import { useAuthUserId } from "@/hooks/useAuthUser"
import { FontTypes, IconNames, InputSizes } from "@/types/Components"
import { useCallback, useState } from "react"
import { SectionList, View } from "react-native"

const SECTIONS = [
    {
        title: "Actions",
        data: [
            { label: "Delete account", icon: IconNames.delete, hideRightIcon: true },
        ],
    },
]

export default function AccountSettings() {
    const userId = useAuthUserId()
    const {signOut} = useSession()

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

    const {mutate: deleteAccount, isPending: isDeleting} = useDeleteUser(() => onLogOut(), () => {})

  const onLogOut = useCallback(() => {
    fblogOut()
      .then(() => {
        signOut(userId)
      })
      .catch((error: any) => {
        console.error('Error signing out:', error)
      })
  }, [userId])

    return (
        <>
            <SettingsWrapper header="Account settings">
            <SectionList className={'mt-12'}
                sections={SECTIONS}
                keyExtractor={(item, index) => item.label + index}
                renderItem={({ item }) => (
                    <BtnDetailed
                        leftIcon={{name: item.icon}}
                        rightIcon={!item.hideRightIcon ? {name: IconNames.chevronMiniRight}: undefined}
                        label={item.label}
                        onPress={() => item.label === 'Delete account' && setShowDeleteModal(true)}
                    />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Label underline type={FontTypes.FLabelBold} label={title} />
                )}
                SectionSeparatorComponent={() => <Spacer height={20} />}
            />
            </SettingsWrapper>
            <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
                <Label type={FontTypes.FTitle1} label={'Do you want to delete this account?'} />
                <Label classNames="mt-5" type={FontTypes.FLabelBold} label={'Your data will be permanently deleted!'} />
                <View className="mt-10 ml-0.5 mr-0.5 flex-row justify-between">
                    <Btn outlined disabled={isDeleting} onPress={() => setShowDeleteModal(false)} icon={IconNames.cancel} size={InputSizes.md} color={Colors.light.white} label="Cancel" />
                    <Btn isLoading={isDeleting} disabled={isDeleting} onPress={() => userId && deleteAccount({userId})} icon={IconNames.save} size={InputSizes.md} backgroundColor={Colors.dark.red} label="Yes, Delete" />
                </View>
            </Modal>
        </>
    )
}