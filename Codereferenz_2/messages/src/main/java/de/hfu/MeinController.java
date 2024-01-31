package de.hfu;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import de.hfu.messages.domain.model.Message;
import de.hfu.messages.domain.model.User;
import de.hfu.messages.domain.service.MessageService;
import de.hfu.messages.domain.service.SecurityService;

@Controller
public class MeinController {
 private SecurityService securityService;
 private MessageService messageService;
 
 @Autowired
 public void setMessageService(MessageService messageService) {
 this.messageService = messageService;
 }

 
 @RequestMapping("/user.html")
 public ModelAndView allUser() {
 ModelAndView mav = new ModelAndView();
 mav.addObject("users", messageService.findAllUsers());
 mav.setViewName("alleUser");

 return mav;
 }
 
 @RequestMapping(value="/register.html")
 public ModelAndView registerInput() {
  ModelAndView mav = new ModelAndView();
  mav.setViewName("registerForm");
  return mav;
 } 

 @Autowired
 public void setSecurityService(SecurityService securityService) {
     this.securityService = securityService;
 }
 @RequestMapping(value="/registerSave.html")
 public ModelAndView registerSave(String username, String fullname , String email, String password) {
  ModelAndView mav = new ModelAndView();
  System.out.println("registering user " + username);
  User registerUser = new User(username, securityService.encodePassword(password), fullname, email);
  try {
  messageService.createUser(registerUser);
  mav.setViewName("registerSuccess");
  } catch (Exception exception) {
  mav.addObject("fehler", exception.getMessage());
  mav.setViewName("registerForm");
  System.out.println("cannot create user " + username + " : " + exception.getMessage());
  }
  return mav;
 } 
 
 @RequestMapping(value = "/messageForm.html")
 public String messageForm() {
 return "messageForm";
 } 
 
 @RequestMapping("/createMessage.html")
 public String createMessage(@RequestParam("messageText") String text, Principal principal) {
 System.out.println("user " + principal.getName() + " created message:" + text);
 User user = messageService.findUserByUsername(principal.getName());
 Message message = new Message(text, new Date(), user);
 messageService.saveMessage(message);
 return "createMessage";
 } 
 
 @RequestMapping(value = "/login.html")
 public String login() {
 return "login";
 }
 
 @RequestMapping ("/messages.html")
  public ModelAndView allMessages() {
  ModelAndView mav = new ModelAndView();
  List<Message> messages = messageService.findAllMessages();
  mav.addObject("messages", messages);
  mav.addObject("lastClientMessage",
		  (messages.size() == 0)?0 : messages.get(0).getDate().getTime());
  mav.setViewName("nachrichtenListe");
  return mav
 ;
  }
 @RequestMapping("/ajax/messages.json")
 @ResponseBody
 public List<Message> messages(@RequestParam(required = false) Long lastClientMessage) {
 if (lastClientMessage == null) {
 lastClientMessage = 0L;
 }
 return messageService.findLatestMessages(new Date(lastClientMessage));
 } 
 
}