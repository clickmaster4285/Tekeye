// Session key for Pakistan Customs auth (client-side only)
export const AUTH_SESSION_KEY = "pakistan_customs_auth"

export function setAuthenticated() {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(AUTH_SESSION_KEY, "true")
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return window.sessionStorage.getItem(AUTH_SESSION_KEY) === "true"
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem(AUTH_SESSION_KEY)
  }
}
