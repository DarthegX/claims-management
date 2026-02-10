import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClaimsService } from '../../src/claims/application/claims.service';
import { Claim } from '../../src/claims/persistence/schemas/claim.schema';
import { CreateClaimDto } from '../../src/claims/dto/create-claim.dto';

describe('ClaimsService', () => {
  let service: ClaimsService;
  let model: Model<Claim>;

  const mockClaim = {
    title: 'Water Damage',
    description: 'Pipe burst in kitchen',
    status: 'pending',
    totalAmount: 1000,
    damages: [],
    _id: 'any-id',
  };

  const mockClaimModel = {
    create: jest.fn().mockResolvedValue(mockClaim),
    find: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([mockClaim]),
    }),
    findById: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockClaim),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        {
          provide: getModelToken(Claim.name),
          useValue: mockClaimModel,
        },
      ],
    }).compile();

    service = module.get<ClaimsService>(ClaimsService);
    model = module.get<Model<Claim>>(getModelToken(Claim.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createClaim', () => {
    it('should create a new claim', async () => {
      const createClaimDto: CreateClaimDto = {
        title: 'Water Damage',
        description: 'Pipe burst in kitchen',
      };
      const result = await service.createClaim(createClaimDto);
      expect(result).toEqual(mockClaim);
      expect(model.create).toHaveBeenCalledWith(createClaimDto);
    });
  });

  describe('getAllClaims', () => {
    it('should return all claims', async () => {
      const result = await service.getAllClaims();
      expect(result).toEqual([mockClaim]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a claim by id', async () => {
      const result = await service.findById('any-id');
      expect(result).toEqual(mockClaim);
      expect(model.findById).toHaveBeenCalledWith('any-id');
    });

    it('should return null if claim not found', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);
      const result = await service.findById('non-existent');
      expect(result).toBeNull();
    });
  });
});
