package com.fallmerayer.radathina.webclient;

import com.fallmerayer.radathina.webclient.models.Attraction;

import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;


public class APIClient {
    private RestTemplate restTemplate = new RestTemplate();

    private int port;
    private String hostname;

    public APIClient (String hostname, int port) {
        this.hostname = hostname;
        this.port = port;
    }

    public Attraction getAttractions (String name) {
        String api_path = "api/v1/attractions";
        String request_url = "http://" + hostname + ":" + port + "/" + api_path;

        Attraction a = restTemplate.getForObject(request_url, Attraction.class);
        return a;
    }
}