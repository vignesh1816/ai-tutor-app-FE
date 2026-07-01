/**
 * Force Update Screen
 * Displayed when app version is below minimum required version
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeColor} from '../../hooks/useThemeColor';
import {useSettings} from '../../context/SettingsContext';
import {APP_VERSION} from '../../config';
import {Button} from '../../components/ui';
import {BorderRadius, FontSizes, Spacing} from '../../constants/theme';

export function ForceUpdateScreen() {
  const {settings} = useSettings();

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const primary = useThemeColor({}, 'primary');
  const card = useThemeColor({}, 'card');

  const handleUpdate = () => {
    const storeUrl = Platform.OS === 'ios' 
      ? settings.appStoreUrl 
      : settings.playStoreUrl;
    
    if (storeUrl) {
      Linking.openURL(storeUrl).catch(err => {
        console.log('Failed to open store:', err);
      });
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconContainer, {backgroundColor: `${primary}15`}]}>
          <Text style={styles.icon}>📱</Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, {color: text}]}>Update Required</Text>

        {/* Message */}
        <Text style={[styles.message, {color: textSecondary}]}>
          {settings.appUpdateMessage || 
            'A new version of the app is available. Please update to continue using the app and enjoy the latest features.'}
        </Text>

        {/* Version Info */}
        <View style={[styles.versionCard, {backgroundColor: card}]}>
          <View style={styles.versionRow}>
            <Text style={[styles.versionLabel, {color: textSecondary}]}>Current Version</Text>
            <Text style={[styles.versionValue, {color: text}]}>{APP_VERSION.version}</Text>
          </View>
          <View style={styles.versionDivider} />
          <View style={styles.versionRow}>
            <Text style={[styles.versionLabel, {color: textSecondary}]}>Required Version</Text>
            <Text style={[styles.versionValue, {color: primary}]}>{settings.appMinVersion}</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, {color: text}]}>What's New:</Text>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✨</Text>
            <Text style={[styles.featureText, {color: textSecondary}]}>Bug fixes and performance improvements</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={[styles.featureText, {color: textSecondary}]}>Enhanced security features</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={[styles.featureText, {color: textSecondary}]}>New learning features</Text>
          </View>
        </View>

        {/* Update Button */}
        <Button
          title="Update Now"
          onPress={handleUpdate}
          fullWidth
          size="lg"
          leftIcon="download"
        />

        {/* Store Badge */}
        <Text style={[styles.storeText, {color: textSecondary}]}>
          {Platform.OS === 'ios' ? 'Available on App Store' : 'Available on Google Play'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: FontSizes.base,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  versionCard: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
  },
  versionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  versionDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  versionLabel: {
    fontSize: FontSizes.sm,
  },
  versionValue: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  featuresContainer: {
    width: '100%',
    marginBottom: Spacing.xl,
  },
  featuresTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.sm,
    flex: 1,
  },
  storeText: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.md,
  },
});

export default ForceUpdateScreen;
