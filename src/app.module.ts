import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { async } from 'rxjs';
@Module({
  imports: [ AuthModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configservice.get('DB_HOST'),
          port: configservice.get('DB_PORT'),
          username: configservice.get('DB_USERNAME'),
          password: configservice.get('DB_PASSWORD'),
          database: configservice.get('DB_DATABASE'),
        };
      },
    }),
  
  ],
})
export class AppModule {}
