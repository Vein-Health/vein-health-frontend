export const GOOGLE_PLAY_SEARCH_URL = 'https://play.google.com/store/search?q=Vein%20Health&c=apps'
export const APP_STORE_SEARCH_URL = 'https://apps.apple.com/us/search?term=Vein%20Health'

export function getAppDownloadUrl(
  userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent,
  platform = typeof navigator === 'undefined' ? '' : navigator.platform,
  maxTouchPoints = typeof navigator === 'undefined' ? 0 : navigator.maxTouchPoints,
) {
  const isAppleDevice = /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(userAgent)
    || (platform === 'MacIntel' && maxTouchPoints > 1)

  return isAppleDevice ? APP_STORE_SEARCH_URL : GOOGLE_PLAY_SEARCH_URL
}
