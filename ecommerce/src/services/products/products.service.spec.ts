import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<Product>;

  const mockProduct = {
    product_id: 'some-id',
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    stock: 10,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const updatedProduct = { ...mockProduct, updated_at: new Date() };

  const products = [mockProduct, mockProduct];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(products),
            }),
            findOne: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockProduct),
            }),
            findOneAndUpdate: jest.fn().mockResolvedValue(updatedProduct),
            deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all products', async () => {
    const result = await service.findAll();

    expect(result).toEqual(products);
    expect(productModel.find().exec).toHaveBeenCalled();
  });

  it('should find a product by id', async () => {
    const result = await service.findOne('some-id');

    expect(result).toEqual(mockProduct);
    expect(productModel.findOne({ product_id: 'some-id' }).exec).toHaveBeenCalled();
  });

  it('should update a product', async () => {
    const mockProductDto = {
      name: 'Updated Product',
      description: 'Updated description',
      price: 150,
      stock: 20,
      updated_at: new Date(),
    };

    const result = await service.update('some-id', mockProductDto);

    expect(result).toEqual(updatedProduct);
    expect(productModel.findOneAndUpdate).toHaveBeenCalledWith(
      { product_id: 'some-id' },
      { ...mockProductDto, updated_at: expect.any(Date) },
      { new: true },
    );
  });

  it('should delete a product', async () => {
    const result = await service.remove('some-id');

    expect(result).toEqual({ deletedCount: 1 });
    expect(productModel.deleteOne).toHaveBeenCalledWith({ product_id: 'some-id' });
  });
});
