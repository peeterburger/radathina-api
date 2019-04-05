package com.fallmerayer.radathina;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.fallmerayer.radathina.webclient.APIClient;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        APIClient ac = new APIClient("localhost", 3000);
        ac.getAttractions("Parthenon");
    }
}
