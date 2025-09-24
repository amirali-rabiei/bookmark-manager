import { useBookmarkStore } from "../bookmarkStore"
import { useUser } from "../userStore"

export const startAllStores = async () => {
    await useBookmarkStore().fetchBookmarks()
    await useUser().fetchUserInfo()
}