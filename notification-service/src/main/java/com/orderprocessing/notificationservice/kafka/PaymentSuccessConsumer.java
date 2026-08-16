package com.orderprocessing.notificationservice.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentSuccessConsumer {

    @KafkaListener(topics = "payment-success", groupId = "notification-service-group")
    public void listen(String message) {
        System.out.println("Notification Service received: " + message);
        System.out.println("Sending confirmation email... Email sent for: " + message);
    }
}