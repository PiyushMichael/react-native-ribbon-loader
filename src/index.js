import React, { Component } from 'react';
import { Dimensions, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Width = Dimensions.get('window').width;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export function getPhashedColorCode(phase, correctionFactor = 100) {
  const phaseAngle = phase > 360 ? phase % 360 : phase;
  const midCycle = phaseAngle >= 180;
  const correctionThreshold = 255 - correctionFactor;

  let red = midCycle ? 0 : (360 - (phaseAngle * 2));
  let green = midCycle ? (2 * (360 - phaseAngle)) : (phaseAngle * 2);
  let blue = midCycle ? ((phaseAngle - 180) * 2) : 0;
  red = parseInt(((red * 255) / 360), 10);
  green = parseInt(((green * 255) / 360), 10);
  blue = parseInt(((blue * 255) / 360), 10);

  red = red < correctionThreshold ? red + correctionFactor : red;
  green = green > correctionFactor ? green - correctionFactor : green;
  blue = blue < correctionThreshold ? blue + correctionFactor : blue;

  const rgb = `#${'00'.concat(red.toString(16)).slice(-2)}${'00'.concat(green.toString(16)).slice(-2)}${'00'.concat(blue.toString(16)).slice(-2)}`;
  return rgb;
}

export default class RibbonLoader extends Component {
  state = {
    translateGradient: new Animated.Value(0),
  }

  componentDidMount() {
    this.animation();
  }

	animation() {
		Animated.timing(this.state.translateGradient, {
			toValue: -(Width * 9),
			duration: 3000,
			useNativeDriver: true,
		}).start(() => this.reset());
	}

	reset() {
		Animated.timing(this.state.translateGradient, {
			toValue: 0,
			duration: 0,
			useNativeDriver: true,
		}).start(() => this.animation());
	}

  render() {
    const colorCorrectionFactor = 80;
    const p1 = getPhashedColorCode(0, colorCorrectionFactor);
    const p2 = getPhashedColorCode(180, colorCorrectionFactor);
    const p3 = getPhashedColorCode(360, colorCorrectionFactor);

    return (
      <AnimatedLinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[p1, p2, p3, p2, p1]}
        style={{
          height: 8,
          width: Width * 10,
          transform: [
            { translateX: this.state.translateGradient },
          ],
        }}
      />
    );
  }
}
