export function statusMessageTemplate(status, message) {
  if (status === 'error' || status === 'empty') {
    return `<p class="status-message" role="status">${message}</p>`
  }
  return ''
}
