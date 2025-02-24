import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap(): Promise<void> {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin : "http://localhost:4000",
      methods : ['GET','HEAD','PUT','PATCH','POST','DELETE'],
      credentials : true,
    });
    app.use(cookieParser());
    const port = process.env.PORT || 3000; // Provide a default value
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // Exit the process if the server fails to start
  }
}

// Ensure the promise is handled properly
bootstrap().catch((err) => {
  console.error('Unexpected error:', err);
});
