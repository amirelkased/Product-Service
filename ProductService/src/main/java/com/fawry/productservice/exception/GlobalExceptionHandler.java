package com.fawry.productservice.exception;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.amqp.AmqpConnectException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> handleEntityNotFound(EntityNotFoundException exp, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, exp.getMessage(), request);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ErrorResponse> handleIllegalArgException(IllegalArgumentException exp, HttpServletRequest request) {
        return buildErrorResponse(HttpStatus.NOT_FOUND, exp.getMessage(), request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<ErrorResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException exp, HttpServletRequest request) {
        Map<String, String> fieldErrors = new HashMap<>();
        exp.getBindingResult()
                .getFieldErrors()
                .forEach(error -> fieldErrors.put(error.getField(), error.getDefaultMessage()));

        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .date(LocalDateTime.now())
                .message("Validation failed for one or more fields.")
                .errors(fieldErrors)
                .path(getRequestPath(request))
                .build();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception exp, HttpServletRequest request) {
        String errorMessage = "An unexpected error occurred. Please try again later.";
        errorMessage = errorMessage.concat(exp.getMessage());
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage, request);
    }

    @ExceptionHandler(AmqpConnectException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ErrorResponse> handleAmqpException(Exception exp, HttpServletRequest request) {
        String errorMessage = "There is exception from AMQP Connection failed %s".formatted(exp.getMessage());
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage, request);
    }

    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String message, HttpServletRequest request) {
        ErrorResponse errorResponse = ErrorResponse.builder()
                .status(status.value())
                .date(LocalDateTime.now())
                .message(message)
                .path(getRequestPath(request))
                .build();

        return ResponseEntity.status(status).body(errorResponse);
    }

    private String getRequestPath(HttpServletRequest request) {
        return request.getPathInfo() != null ? request.getPathInfo() : request.getServletPath();
    }
}
