import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IsPositivePipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'number' || value <= 0) {
      throw new BadRequestException('Invalid positive number');
    }
    return value;
  }
}
