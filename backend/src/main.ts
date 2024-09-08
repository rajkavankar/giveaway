import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Giaway example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('giveaways', 'giveaway related endpoints')
    .addTag('participants', 'participants related endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(5000);
}
bootstrap();
