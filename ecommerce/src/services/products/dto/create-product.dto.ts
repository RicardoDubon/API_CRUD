import { IsNotEmpty, IsString, IsNumber, Min, IsDateString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'NAME_REQUIRED' })
  @IsString({ message: 'NAME_INVALID_TYPE' })
  name: string;

  @IsNotEmpty({ message: 'DESCRIPTION_REQUIRED' })
  @IsString({ message: 'DESCRIPTION_INVALID_TYPE' })
  description: string;

  @IsNotEmpty({ message: 'PRICE_REQUIRED' })
  @IsNumber({}, { message: 'PRICE_INVALID_TYPE' })
  @Min(0, { message: 'PRICE_MIN_VALUE' })
  price: number;

  @IsNotEmpty({ message: 'STOCK_REQUIRED' })
  @IsNumber({}, { message: 'STOCK_INVALID_TYPE' })
  @Min(0, { message: 'STOCK_MIN_VALUE' })
  stock: number;

  @IsOptional()
  @IsDateString({}, { message: 'CREATED_AT_INVALID_TYPE' })
  created_at?: Date;

  @IsOptional()
  @IsDateString({}, { message: 'UPDATED_AT_INVALID_TYPE' })
  updated_at?: Date;
}

