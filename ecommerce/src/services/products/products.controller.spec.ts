import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    product_id: 'some-id',
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    stock: 10,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockProductDto: CreateProductDto = {
    name: 'Product 1',
    description: 'Description of Product 1',
    price: 100,
    stock: 10,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue({ deletedCount: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const result = await controller.create(mockProductDto);
    expect(result).toEqual(mockProduct);
    expect(service.create).toHaveBeenCalledWith(mockProductDto);
  });

  it('should find all products', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockProduct]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find a product by id', async () => {
    const result = await controller.findOne('some-id');
    expect(result).toEqual(mockProduct);
    expect(service.findOne).toHaveBeenCalledWith('some-id');
  });

  it('should update a product', async () => {
    const result = await controller.update('some-id', mockProductDto);
    expect(result).toEqual(mockProduct);
    expect(service.update).toHaveBeenCalledWith('some-id', mockProductDto);
  });

  it('should delete a product', async () => {
    const result = await controller.remove('some-id');
    expect(result).toEqual({ deletedCount: 1 });
    expect(service.remove).toHaveBeenCalledWith('some-id');
  });
});
