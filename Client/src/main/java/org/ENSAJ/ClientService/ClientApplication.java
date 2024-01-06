package org.ENSAJ.ClientService;

import org.ENSAJ.ClientService.Model.Client;
import org.ENSAJ.ClientService.Repository.ClientRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@EnableFeignClients
@EnableDiscoveryClient
@SpringBootApplication
public class ClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args);
	}

	@Bean
	CommandLineRunner initialiserBaseH2(ClientRepository clientRepository){
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				clientRepository.save(new Client(Long.parseLong("1"), "Mouket ", Float.parseFloat("24")));
				clientRepository.save(new Client(Long.parseLong("5"), "Fatima zahra", Float.parseFloat("32")));
				clientRepository.save(new Client(Long.parseLong("3"), "ISmail", Float.parseFloat("30")));
				clientRepository.save(new Client(Long.parseLong("4"), "Salma", Float.parseFloat("25")));


			}
		};
	}

}
