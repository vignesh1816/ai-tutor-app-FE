/**
 * App Version Configuration
 * This should match the version in android/app/build.gradle and ios Info.plist
 */

export const APP_VERSION = {
  // Current app version - Update this when releasing new versions
  version: '1.0.0',
  buildNumber: '1',
};

/**
 * Compare two version strings
 * Returns: 
 *  -1 if v1 < v2
 *   0 if v1 == v2
 *   1 if v1 > v2
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  const maxLength = Math.max(parts1.length, parts2.length);
  
  for (let i = 0; i < maxLength; i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }
  
  return 0;
}

/**
 * Check if current version is below minimum required version
 */
export function isVersionBelowMinimum(currentVersion: string, minVersion: string): boolean {
  return compareVersions(currentVersion, minVersion) < 0;
}

export default APP_VERSION;
