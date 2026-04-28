export function toFriendlyErrorMessage(error) {
  if (!error || !(error instanceof Error)) {
    return 'We could not load the catalog right now. Please try again.'
  }
  return error.message
}
