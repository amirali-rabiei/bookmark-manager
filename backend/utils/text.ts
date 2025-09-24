export const truncateText = (text: string | undefined) => {
    return text?.slice(0, 71).trim() + '...'
}