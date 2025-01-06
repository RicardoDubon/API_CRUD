import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':product_id')
  findOne(@Param('product_id') product_id: string) {
    return this.productsService.findOne(product_id);
  }

  @Patch(':product_id')
  update(@Param('product_id') product_id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(product_id, updateProductDto);
  }

  @Delete(':product_id')
  remove(@Param('product_id') product_id: string) {
    return this.productsService.remove(product_id);
  }
}
