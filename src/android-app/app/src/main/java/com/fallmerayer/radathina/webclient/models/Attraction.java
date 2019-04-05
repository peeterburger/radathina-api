package com.fallmerayer.radathina.webclient.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Attraction {
    private String name;
    private String beschreibung;
    private double coord_lon;
    private double coord_lat;
    private String imageLink;

    public String getName() {
        return name;
    }

    public double getCoord_lon() {
        return coord_lon;
    }

    public double getCoord_lat() {
        return coord_lat;
    }

    public String getImageLink() {
        return imageLink;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    @Override
    public String toString() {
        return "Attraction{" +
                "name='" + name + '\'' +
                ", beschreibung='" + beschreibung + '\'' +
                ", coord_lon=" + coord_lon +
                ", coord_lat=" + coord_lat +
                ", imageLink='" + imageLink + '\'' +
                '}';
    }
}
