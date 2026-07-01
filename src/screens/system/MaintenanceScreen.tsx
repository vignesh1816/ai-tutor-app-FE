/**
 * Maintenance Screen
 * Displayed when the app is under maintenance
 */

import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useThemeColor} from '../../hooks/useThemeColor';
import {useSettings} from '../../context/SettingsContext';
import {Icon, Button} from '../../components/ui';
import {BorderRadius, FontSizes, Spacing} from '../../constants/theme';

export function MaintenanceScreen() {
  const {settings, refreshSettings} = useSettings();

  const background = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const textMuted = useThemeColor({}, 'textMuted');
  const primary = useThemeColor({}, 'primary');
  const card = useThemeColor({}, 'card');

  // Animation for gears
  const gear1Rotation = useRef(new Animated.Value(0)).current;
  const gear2Rotation = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Gear 1 animation
    Animated.loop(
      Animated.timing(gear1Rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Gear 2 animation (reverse)
    Animated.loop(
      Animated.timing(gear2Rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const gear1Spin = gear1Rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const gear2Spin = gear2Rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const handleContact = (type: 'email' | 'phone' | 'whatsapp') => {
    switch (type) {
      case 'email':
        Linking.openURL(`mailto:${settings.supportEmail}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${settings.supportPhone}`);
        break;
      case 'whatsapp':
        Linking.openURL(`https://wa.me/${settings.whatsappNumber}`);
        break;
    }
  };

  const handleRefresh = async () => {
    await refreshSettings();
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: background}]} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Animated Gears */}
        <View style={styles.gearsContainer}>
          <Animated.Text
            style={[
              styles.gear,
              styles.gear1,
              {transform: [{rotate: gear1Spin}, {scale: pulseAnim}]},
            ]}>
            ⚙️
          </Animated.Text>
          <Animated.Text
            style={[
              styles.gear,
              styles.gear2,
              {transform: [{rotate: gear2Spin}]},
            ]}>
            🔧
          </Animated.Text>
          <Animated.Text
            style={[
              styles.gear,
              styles.gear3,
              {transform: [{rotate: gear1Spin}]},
            ]}>
            ⚙️
          </Animated.Text>
        </View>

        {/* Title */}
        <Text style={[styles.title, {color: text}]}>We'll Be Back Soon!</Text>

        {/* Message */}
        <Text style={[styles.message, {color: textSecondary}]}>
          {settings.maintenanceMessage ||
            'We are currently performing scheduled maintenance to improve your experience. Please check back shortly.'}
        </Text>

        {/* Contact Card */}
        <View style={[styles.contactCard, {backgroundColor: card}]}>
          <Text style={[styles.contactTitle, {color: text}]}>Need Help?</Text>
          
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('email')}>
            <View style={[styles.contactIcon, {backgroundColor: `${primary}15`}]}>
              <Icon name="mail" size={18} color={primary} />
            </View>
            <Text style={[styles.contactText, {color: textSecondary}]}>
              {settings.supportEmail}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('phone')}>
            <View style={[styles.contactIcon, {backgroundColor: `${primary}15`}]}>
              <Icon name="phone" size={18} color={primary} />
            </View>
            <Text style={[styles.contactText, {color: textSecondary}]}>
              {settings.supportPhone}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContact('whatsapp')}>
            <View style={[styles.contactIcon, {backgroundColor: '#25D36615'}]}>
              <Icon name="message-circle" size={18} color="#25D366" />
            </View>
            <Text style={[styles.contactText, {color: textSecondary}]}>
              WhatsApp Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* Refresh Button */}
        <Button
          title="Check Again"
          variant="outline"
          onPress={handleRefresh}
          leftIcon="refresh-cw"
          fullWidth
        />

        {/* Footer */}
        <Text style={[styles.footer, {color: textMuted}]}>
          Thank you for your patience! 🙏
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
  gearsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
  },
  gear: {
    fontSize: 40,
    marginHorizontal: Spacing.sm,
  },
  gear1: {
    fontSize: 48,
  },
  gear2: {
    fontSize: 36,
    marginTop: 20,
  },
  gear3: {
    fontSize: 42,
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
  contactCard: {
    width: '100%',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  contactTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  contactText: {
    fontSize: FontSizes.sm,
    flex: 1,
  },
  footer: {
    fontSize: FontSizes.xs,
    marginTop: Spacing.lg,
  },
});

export default MaintenanceScreen;
