package org.ENSAJ;

import org.ENSAJ.Model.Voiture;
import org.ENSAJ.Repository.VoitureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;

@EnableFeignClients
@SpringBootApplication
public class VoitureApplication {
    private VoitureRepository voitureRepository;
    private ClientService clientService;

    public static void main(String[] args) {
        SpringApplication.run(VoitureApplication.class, args);
    }

    @FeignClient(name = "SERVICE-CLIENT")
    interface ClientService {
        @GetMapping(path = "/clients/{id}")
        public Client clientById(@PathVariable Long id);
    }

    @Transactional
    @Bean
    CommandLineRunner initializeDatabase(VoitureRepository voitureRepository, ClientService clientService) {
        return args -> {
            Client c1 = clientService.clientById(Long.parseLong("1"));
            Client c2 = clientService.clientById(Long.parseLong("2"));
            Client c3 = clientService.clientById(Long.parseLong("3"));
            Client c4 = clientService.clientById(Long.parseLong("4"));
            Client c5 = clientService.clientById(Long.parseLong("5"));
            Client c6 = clientService.clientById(Long.parseLong("6"));
            Client c7 = clientService.clientById(Long.parseLong("7"));


        };

    }

}
