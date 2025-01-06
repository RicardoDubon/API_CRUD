import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(product_id: string): Promise<Product> {
    const product = await this.productModel.findOne({ product_id }).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    return product;
  }

  async update(product_id: string, updateProductDto: any): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate(
      { product_id },
      updateProductDto,
      { new: true },
    );
    if (!product) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    return product;
  }

  async remove(product_id: string): Promise<any> {
    const result = await this.productModel.deleteOne({ product_id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Product with ID ${product_id} not found`);
    }
    return result;
  }
}
