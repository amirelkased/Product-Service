package com.fawry.productservice.stock;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreService {
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.store.routing.key}")
    private String routingKey;
    private final RabbitTemplate rabbitTemplate;
    private final RetryTemplate retryTemplate;

    @Async
    public void sendProductData(String message){
        log.info("Sending to Store Service -> {}",message);
        retryTemplate.execute(context -> {
           try {
               rabbitTemplate.convertAndSend(exchange, routingKey, message);
               log.info("Product sended successfully...");
               return null;
           } catch (AmqpException e) {
               log.error("Failed to send product, retrying...");
               throw e;
           }
        });
    }
}
