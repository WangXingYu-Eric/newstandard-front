import defaultSettings from '@/settings'

const title = defaultSettings.title || '中科软悦客联络平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
