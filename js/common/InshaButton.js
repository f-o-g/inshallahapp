/*
* @providesModule InshaButton
* @flow
*/

'use strict'

import Image from 'Image'
import LinearGradient from 'react-native-linear-gradient'
import React, {Component} from 'React'
import StyleSheet from 'StyleSheet'
import { InshaText } from 'InshaText'
import TouchableOpacity from 'TouchableOpacity'
import View from 'View'

class InshaButton extends Component {
 props: {
   type: 'primary' | 'secondary' | 'bordered';
   icon: number;
   caption: string;
   style: any;
   onPress: () => void;
 };

 render() {
   const caption = this.props.caption.toUpperCase()
   let icon
   if (this.props.icon) {
     icon = <Image source={this.props.icon} style={styles.icon} />
   }

   const type = this.props.type
   let content
   if (type === 'primary' || type === 'secondary' || !this.props.type) {
     const colors =
       type === 'primary' ? ['#6A6AD5', '#6F86D9'] :
       type === 'secondary' ? ['', ''] :
       ['#6A6AD5', '#6F86D9']

     content = (
       <LinearGradient
         start={[0.5, 1]} end={[1, 1]}
         colors={colors}
         style={[styles.button, styles.primaryButton]}>
         {icon}
         <InshaText style={[styles.caption, styles.primaryCaption]}>
           {caption}
         </InshaText>
       </LinearGradient>
     )
   } else {
     const border = this.props.type === 'bordered' && styles.border
     content = (
       <View style={[styles.button, border]}>
         {icon}
         <InshaText style={[styles.caption]}>
           {caption}
         </InshaText>
       </View>
     )
   }
   return (
     <TouchableOpacity
       accessibilityTraits="button"
       onPress={this.props.onPress}
       activeOpacity={0.8}
       style={[styles.container, this.props.style]}>
       {content}
     </TouchableOpacity>
   )
 }
}

const HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
     // borderRadius: HEIGHT / 2,
     // borderWidth: 1 / PixelRatio.get(),
   },
   button: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
     paddingHorizontal: 40,
   },
   border: {
     borderWidth: 1,
     borderColor: 'white',
     borderRadius: HEIGHT / 2,
    //  backgroundColor: 'white',
    //  opacity: 0.2
   },
   primaryButton: {
     borderRadius: HEIGHT / 2,
     backgroundColor: 'transparent',
   },
   icon: {
     marginRight: 12,
   },
   caption: {
     letterSpacing: 1,
     fontSize: 12,
     color: 'white',
   },
   primaryCaption: {
     color: 'white',
   },
})

export default InshaButton
