package com.tanasije.flowershop.backend.model;

public enum ProductType {
    FLOWER("Flower"),
    BOUQUET("Bouquet"),
    PLANT("Plant"),
    POT("Pot"),
    ACCESSORY("Accessory");

    private final String displayName;

    ProductType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
