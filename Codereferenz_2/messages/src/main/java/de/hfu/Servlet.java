package de.hfu;



import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import de.hfu.messages.domain.model.Message;
import de.hfu.messages.domain.service.MessageService;
 
@WebServlet("/hello.html") 

public class Servlet extends HttpServlet
{
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException
    {
        
        response.setContentType("text/html;charset=UTF-8");
         
        PrintWriter out = response.getWriter();
        	WebApplicationContext applicationContext =
        		 WebApplicationContextUtils.getWebApplicationContext(req.getServletContext());
        		 MessageService messageService =
        		 (MessageService) applicationContext.getBean("messageService");
        		 
        		 for (Message message : messageService.findAllMessages()) {
        			    
        			 out.append(""
        			 		+ "<!DOCTYPE html>"
        			 		+ "<html>"
        			 		+ "<body>"
        			 		+ "<ul>"
        			 		+"<li>"
        			 		+"" +message.getUser().getFullname()+" "+ message.getDate()+"<br>"
        			 		+ ""+message.getText()
        			 		+"</li>"
        			 		+ "</ul>"
        			 		+ "</body>"
        			 		+ "</html>");
        			}    		
    }   
}
