package com.orderprocessing.orderservice.kafka;

import com.orderprocessing.orderservice.entity.Order;
import com.orderprocessing.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentConsumer {

    @Autowired
    private OrderRepository orderRepository;

    @KafkaListener(topics = "payment-success", groupId = "order-service-group")
    public void listenSuccess(String message) {
        System.out.println("Order Service received (payment success): " + message);
        updateOrderStatus(message, "CONFIRMED");
    }

    @KafkaListener(topics = "payment-failed", groupId = "order-service-group")
    public void listenFailed(String message) {
        System.out.println("Order Service received (payment failed): " + message);
        updateOrderStatus(message, "FAILED");
    }

    @KafkaListener(topics = "inventory-failed", groupId = "order-service-group")
    public void listenInventoryFailed(String message) {
        System.out.println("Order Service received (inventory failed): " + message);
        updateOrderStatus(message, "FAILED");
    }

    private void updateOrderStatus(String message, String newStatus) {
        // Message format: "Order Created: ID=X, Product=Y"
        String idPart = message.substring(message.indexOf("ID=") + 3);
        Long orderId = Long.parseLong(idPart.split(",")[0].trim());

        Optional<Order> orderOpt = orderRepository.findById(orderId);
        if (orderOpt.isPresent()) {
            Order order = orderOpt.get();
            order.setStatus(newStatus);
            orderRepository.save(order);
            System.out.println("Order ID=" + orderId + " status updated to " + newStatus);
        }
    }
}