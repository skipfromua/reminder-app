export const AUTH_BY_CREDENTIALS_LINK = '/auth/sessions'
export const REGISTRATION_LINK = '/auth/registrations'
export const EVENTS = '/rest/v1/events'
export const DELETE_EVENTS = '/rest/v1/events/delete_events'
export const NOTIFICATIONS = (event_id) => { return `/rest/v1/events/${event_id}/notifications` }
