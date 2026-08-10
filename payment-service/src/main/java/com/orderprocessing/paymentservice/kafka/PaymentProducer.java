package com.orderprocessing.paymentservice.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentProducer {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void sendPaymentSuccess(String message) {
        kafkaTemplate.send("payment-success", message);
        System.out.println("Published PaymentSuccess event: " + message);
    }

    public void sendPaymentFailed(String message) {
        kafkaTemplate.send("payment-failed", message);
        System.out.println("Published PaymentFailed event: " + message);
    }
}