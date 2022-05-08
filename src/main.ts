import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const config = new DocumentBuilder()
    .setTitle('Finance Control API')
    .setDescription(
      'Edição #2: Desafio Back-End Crie uma API Rest funcional focada em controle financeiro'
    )
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}

bootstrap().catch((e) => {
  console.error(e)
  process.exit(1)
})
