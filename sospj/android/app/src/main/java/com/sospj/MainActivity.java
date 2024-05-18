package com.sospj;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast; 
import android.util.Log;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.net.Uri;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.os.Parcelable;
import android.provider.Settings;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
public class MainActivity extends ReactActivity {
  @Override
    public void onNewIntent(Intent intent) {
      super.onNewIntent(intent);
      String msg = intent.getAction();
      if (Intent.ACTION_VIEW.equals(intent.getAction()) || NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())) {
        String androidId = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
        Uri uri = intent.getData();
        String test2 = uri.getQueryParameter("param1");
        String type = uri.getQueryParameter("type");
        
        
        LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Location loc_Current = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

        double cur_lat = loc_Current.getLatitude(); //위도
        double cur_lon = loc_Current.getLongitude(); //경도

        String URL = "http://192.168.0.22:3000/sos?param1="+test2+"&param2="+androidId+ "&lat=" + cur_lat + "&lon=" + cur_lon + "&type=" + type;
      // NFC 기능이 없는 경우 처리
        RequestQueue queue = Volley.newRequestQueue(this);

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the response string.
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // Handle errors
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);

        Toast.makeText(this, msg+test2, Toast.LENGTH_SHORT).show();
      }
      else{
          Toast.makeText(this,msg, Toast.LENGTH_SHORT).show();
      }
        
    }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "sospj";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    Intent intent = getIntent();
    String msg = intent.getAction();
    if (Intent.ACTION_VIEW.equals(intent.getAction()) || NfcAdapter.ACTION_NDEF_DISCOVERED.equals(intent.getAction())) {
      String androidId = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
      Uri uri = intent.getData();
      String test2 = uri.getQueryParameter("param1");
      String type = uri.getQueryParameter("type");
      LocationManager locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Location loc_Current = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);

        double cur_lat = loc_Current.getLatitude(); //위도
        double cur_lon = loc_Current.getLongitude(); //경도
      String URL = "http://192.168.0.22:3000/sos?param1="+test2+"&param2="+androidId+ "&lat=" + cur_lat + "&lon=" + cur_lon + "&type=" + type;
      // NFC 기능이 없는 경우 처리
      //3.39.177.116:3000
      //192.168.0.22:3000
        RequestQueue queue = Volley.newRequestQueue(this);

        // Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        // Display the response string.
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // Handle errors
            }
        });

        // Add the request to the RequestQueue.
        queue.add(stringRequest);
      Toast.makeText(this, msg+test2, Toast.LENGTH_SHORT).show();
      
    // NFC 기능이 없는 경우 처리
      
    }
    else{
        Toast.makeText(this,msg, Toast.LENGTH_SHORT).show();
    }
    
    
  }
  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the rendered you wish to use (Fabric or the older renderer).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }
  }
}
