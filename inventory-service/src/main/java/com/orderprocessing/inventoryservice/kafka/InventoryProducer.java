package com.orderprocessing.inventoryservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class InventoryProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendInventoryReserved(String message) {
        kafkaTemplate.send("inventory-reserved", message);
        System.out.println("Published InventoryReserved event: " + message);
    }

    public void sendInventoryFailed(String message) {
        kafkaTemplate.send("inventory-failed", message);
        System.out.println("Published InventoryFailed event: " + message);
    }
}