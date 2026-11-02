import { describe, expect, it } from 'vitest'

import { getAppDownloadUrl } from './app-download'

describe('app download routing', () => {
  it('routes Windows and Android visitors to Google Play search', () => {
    expect(getAppDownloadUrl('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Win32')).toContain('play.google.com')
    expect(getAppDownloadUrl('Mozilla/5.0 (Linux; Android 14; Pixel 8)', 'Linux armv8l')).toContain('play.google.com')
  })

  it('routes Apple visitors to App Store search', () => {
    expect(getAppDownloadUrl('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 'iPhone')).toContain('apps.apple.com')
    expect(getAppDownloadUrl('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0)', 'MacIntel')).toContain('apps.apple.com')
  })
})
