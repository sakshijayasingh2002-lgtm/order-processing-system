package com.orderprocessing.paymentservice.kafka;

import com.orderprocessing.paymentservice.entity.PaymentTransaction;
import com.orderprocessing.paymentservice.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class InventoryConsumer {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentProducer paymentProducer;

    @KafkaListener(topics = "inventory-reserved", groupId = "payment-service-group")
    public void listen(String message) {
        System.out.println("Payment Service received: " + message);

        PaymentTransaction transaction = new PaymentTransaction();
        transaction.setOrderInfo(message);
        transaction.setProcessedAt(LocalDateTime.now());

        // Mock payment logic: randomly succeed (90% of the time) for realism
        boolean success = Math.random() < 0.9;

        if (success) {
            transaction.setStatus("SUCCESS");
            paymentRepository.save(transaction);
            paymentProducer.sendPaymentSuccess(message);
        } else {
            transaction.setStatus("FAILED");
            paymentRepository.save(transaction);
            paymentProducer.sendPaymentFailed(message);
        }
    }
}