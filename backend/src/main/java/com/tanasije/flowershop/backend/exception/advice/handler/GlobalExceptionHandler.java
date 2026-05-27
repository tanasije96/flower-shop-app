package com.tanasije.flowershop.backend.exception.advice.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import tools.jackson.databind.exc.InvalidFormatException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleEnumErrors(HttpMessageNotReadableException ex) {

        Throwable cause = ex.getMostSpecificCause();
        System.out.println("CAUSE: " + cause.getClass().getName());

        if (cause instanceof InvalidFormatException mie) {

            if (mie.getTargetType() != null && mie.getTargetType().isEnum()) {

                String fieldName = mie.getPath().isEmpty()
                        ? "unknown"
                        : mie.getPath().get(0).getPropertyName();

                Map<String, String> errors = new HashMap<>();
                errors.put(fieldName, "invalid value");

                return ResponseEntity.badRequest().body(errors);
            }
        }

        return ResponseEntity.badRequest().body(
                Map.of("error", "Malformed JSON request")
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity.badRequest().body(errors);
    }
}
