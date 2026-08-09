package com.orderprocessing.inventoryservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumer {

    @KafkaListener(topics = "order-created", groupId = "inventory-service-group")
    public void listen(String message) {
        System.out.println("Inventory Service received: " + message);
    }
}