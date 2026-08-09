package com.orderprocessing.inventoryservice.controller;

import com.orderprocessing.inventoryservice.entity.InventoryItem;
import com.orderprocessing.inventoryservice.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping
    public InventoryItem addItem(@RequestBody InventoryItem item) {
        return inventoryRepository.save(item);
    }

    @GetMapping
    public Iterable<InventoryItem> getAllItems() {
        return inventoryRepository.findAll();
    }
}