package de.hfu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import de.hfu.messages.domain.model.Message;
import de.hfu.messages.domain.service.MessageService;

@Component
public class MessagePrinter {

	@Autowired
	private MessageService ms;


	public void setMs(MessageService ms) {
		this.ms = ms;
	}
	
	public void outputMessages() {
		for (Message message : ms.findAllMessages()) {
			System.out.println("Nachricht: " + message.getText());
		}
	}
	
	
	
}
