package com.inshallahapp;

//import android.content.Intent;     // <--- import
//import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

//import com.facebook.CallbackManager;
//import com.facebook.FacebookSdk;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;

public class MainActivity extends ReactActivity {
//    CallbackManager mCallbackManager;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "inshallahapp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
//        mCallbackManager = new CallbackManager.Factory().create();
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage()
//            new FBSDKPackage(mCallbackManager)
        );
    }

//    @Override
//    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//        mCallbackManager.onActivityResult(requestCode, resultCode, data);
//    }
}
