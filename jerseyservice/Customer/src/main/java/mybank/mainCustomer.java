package mybank;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.grizzly.http.server.StaticHttpHandler;


import java.io.IOException;
import java.net.URI;

/**
 * Main class.
 *
 */
public class mainCustomer {
    // Base URI the Grizzly HTTP server will listen on
    public static final String BASE_URI = "http://localhost:8081/mybank/";

    /**
     * Starts Grizzly HTTP server exposing JAX-RS resources defined in this application.
     * @return Grizzly HTTP server.
     */
    public static HttpServer startServer() {
        // create a resource config that scans for JAX-RS resources and providers
        // in com.example.rest package
        final ResourceConfig rc = new ResourceConfig().packages("mybank");

        // create and start a new instance of grizzly http server
        // exposing the Jers	ey application at BASE_URI
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
		
    }
	
	

    /**
     * Main method.
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        final HttpServer server = startServer();
		
		server.getServerConfiguration().addHttpHandler(new StaticHttpHandler("C:\\Cloud\\mybankwebsite\\"),"/");   
	
		
        System.out.println(String.format("Jersey app started with WADL available at "
                + "%sapplication.wadl\nHit enter to stop it...", BASE_URI));
        // Open the URI in chrome (windows)
        Runtime rt = Runtime.getRuntime();
        rt.exec("rundll32 url.dll,FileProtocolHandler " + "http://localhost:8081/mybank.html");
        
        System.in.read();
        server.stop();
    }
}

