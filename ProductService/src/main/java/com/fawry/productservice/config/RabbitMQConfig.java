package com.fawry.productservice.config;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
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
    @Lazy(value = false)
    public Queue queue() {
        return new Queue(queue);
    }

    @Bean
    @Lazy(value = false)
    public TopicExchange topicExchange() {
        return new TopicExchange(exchange);
    }

    @Bean
    @Lazy(value = false)
    public Binding binding() {
        return BindingBuilder.bind(queue())
                .to(topicExchange())
                .with(routingKey);
    }

    @Bean
    @Lazy(value = false)
    public RetryTemplate retryTemplate() {
        return RetryTemplate.builder()
                .maxAttempts(retryMaxAttemps)
                .fixedBackoff(retryBackoff)
                .retryOn(AmqpException.class)
                .build();
    }
}
