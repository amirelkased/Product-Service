package com.fawry.productservice.util;

import java.security.SecureRandom;
import java.util.Random;

public class ProductSkuGenerator {
    public static String generateAlphabeticNumberSku(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder sku = new StringBuilder();
        Random random = new SecureRandom();

        for (int i = 0; i < length; i++) {
            sku.append(chars.charAt(random.nextInt(chars.length())));
        }

        return sku.toString();
    }
}
