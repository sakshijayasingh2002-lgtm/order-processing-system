package com.orderprocessing.inventoryservice.kafka;

import com.orderprocessing.inventoryservice.entity.InventoryItem;
import com.orderprocessing.inventoryservice.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderConsumer {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private InventoryProducer inventoryProducer;

    @KafkaListener(topics = "order-created", groupId = "inventory-service-group")
    public void listen(String message) {
        System.out.println("Inventory Service received: " + message);

        // Extract product name from the message
        // Message format: "Order Created: ID=X, Product=ProductName"
        String productName = message.substring(message.indexOf("Product=") + 8);

        Optional<InventoryItem> itemOpt = inventoryRepository.findAll().stream()
                .filter(item -> item.getProductName().equalsIgnoreCase(productName))
                .findFirst();

        if (itemOpt.isPresent() && itemOpt.get().getStockQuantity() > 0) {
            InventoryItem item = itemOpt.get();
            item.setStockQuantity(item.getStockQuantity() - 1);
            inventoryRepository.save(item);
            inventoryProducer.sendInventoryReserved(message);
        } else {
            inventoryProducer.sendInventoryFailed(message);
        }
    }
}