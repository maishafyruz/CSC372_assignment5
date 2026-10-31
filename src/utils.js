export function stripHtml(text) {
  return text.replace(/<[^>]*>/g, '')
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return 'Not available'
  }

  const date = new Date(timestamp * 1000)
  return date.toLocaleString()
}