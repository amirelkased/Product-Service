package com.fawry.productservice.config;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.retry.support.RetryTemplate;

@Configuration
public class RabbitMQConfig {
    @Value("${rabbitmq.store.queue.name}")
    private String queue;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.store.routing.key}")
    private String routingKey;
    @Value("${rabbitmq.retry.template.maxAttemps}")
    private int retryMaxAttemps;
    @Value("${rabbitmq.retry.template.backoff.milliseconds}")
    private long retryBackoff;

    @Bean
    public Queue queue() {
        return new Queue(queue);
    }

    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(exchange);
    }

    @Bean
    public Binding binding() {
        return BindingBuilder.bind(queue())
                .to(topicExchange())
                .with(routingKey);
    }

    @Bean
    public RetryTemplate retryTemplate() {
        return RetryTemplate.builder()
                .maxAttempts(retryMaxAttemps)
                .fixedBackoff(retryBackoff)
                .retryOn(AmqpException.class)
                .build();
    }
}
