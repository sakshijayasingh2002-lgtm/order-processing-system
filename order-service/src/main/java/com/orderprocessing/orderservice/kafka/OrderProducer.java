package com.orderprocessing.orderservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {

    private static final String TOPIC = "order-created";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendOrderCreatedEvent(String message) {
        kafkaTemplate.send(TOPIC, message);
        System.out.println("Published OrderCreated event: " + message);
    }
}