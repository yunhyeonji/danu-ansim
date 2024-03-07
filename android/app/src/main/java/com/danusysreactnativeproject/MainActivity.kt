package com.danusysreactnativeproject

import android.view.KeyEvent
import android.widget.Toast
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "danusysReactNativeProject"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  private var volumeUpCount = 0
  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
      return when(keyCode) {
          KeyEvent.KEYCODE_VOLUME_UP -> {
              volumeUpCount++
              if (volumeUpCount == 3) {
                  sendVolumeUpEventToReactNative()
                  volumeUpCount = 0 // 카운트 초기화
              }
//              Toast.makeText(this, "Volume Up Pressed", Toast.LENGTH_SHORT).show()
              true
          }
          KeyEvent.KEYCODE_VOLUME_DOWN -> {
              Toast.makeText(this, "Volume Down Pressed", Toast.LENGTH_SHORT).show()
              true
          }
          else -> super.onKeyDown(keyCode, event)
      }
  }
  private fun sendVolumeUpEventToReactNative() {
      val reactContext: ReactContext? = reactInstanceManager?.currentReactContext
      reactContext?.let {
          UiThreadUtil.runOnUiThread {
              it
                  .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                  .emit("VolumeUpPressed", null)
          }
      }
  }
}
