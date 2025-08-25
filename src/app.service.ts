import { Injectable, OnApplicationBootstrap  } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap{
  onApplicationBootstrap() {
    console.log('😎Database connection established successfully.🥶🥶🥸');
  }
  getHello(): string {
    return 'Hello World!';
  }

  getWelcome():string{
    return `Welcome to the Nest js , Al Shahoriar Sourov`
  }
}

