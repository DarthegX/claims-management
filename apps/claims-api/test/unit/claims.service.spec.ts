import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClaimsService } from '../../src/claims/application/claims.service';
import { Claim } from '../../src/claims/persistence/schemas/claim.schema';
import { CreateClaimDto } from '../../src/claims/dto/create-claim.dto';
import { UpdateClaimDto } from '../../src/claims/dto/update-claim.dto';

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
    findByIdAndUpdate: jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockClaim),
    }),
  };

  const mockCalculator = {
    calculate: jest.fn().mockReturnValue(1500),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimsService,
        {
          provide: getModelToken(Claim.name),
          useValue: mockClaimModel,
        },
        {
          provide: 'TotalCalculator',
          useValue: mockCalculator,
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

  describe('updateClaim', () => {
    it('should update a claim successfully', async () => {
      const updateClaimDto: UpdateClaimDto = {
        title: 'Updated Title',
        description: 'Updated description',
        damages: [],
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockClaim as any);

      await service.updateClaim('any-id', updateClaimDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('any-id', updateClaimDto);
    });

    it('should handle update with partial data', async () => {
      const updateClaimDto: UpdateClaimDto = {
        title: 'Only Title Updated',
        description: 'Same description',
        damages: [],
      };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockClaim as any);

      await service.updateClaim('any-id', updateClaimDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('any-id', updateClaimDto);
    });
  });

  describe('updateStatus', () => {
    it('should update claim status successfully', async () => {
      const statusDto = { status: 'approved' };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockClaim as any);

      await service.updateStatus('any-id', statusDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('any-id', statusDto);
    });

    it('should update status to rejected', async () => {
      const statusDto = { status: 'rejected' };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(mockClaim as any);

      await service.updateStatus('any-id', statusDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('any-id', statusDto);
    });
  });

  describe('addDamage', () => {
    it('should add a damage to a claim and update total amount', async () => {
      const updatedClaim = { ...mockClaim, damages: [{ price: 500 }, { price: 1000 }] };
      const calculationResult = 1500;

      mockCalculator.calculate.mockReturnValue(calculationResult);

      // First call for $push
      mockClaimModel.findByIdAndUpdate.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(updatedClaim),
      } as any);

      // Second call from updateTotalAmount
      mockClaimModel.findByIdAndUpdate.mockResolvedValueOnce({ ...updatedClaim, totalAmount: calculationResult } as any);

      const result = await service.addDamage('any-id', 'damage-id-1');

      expect(mockClaimModel.findByIdAndUpdate).toHaveBeenCalledWith(
        'any-id',
        { $push: { damages: 'damage-id-1' } },
        { returnDocument: 'after' },
      );

      expect(mockCalculator.calculate).toHaveBeenCalledWith(updatedClaim.damages);
      expect(mockClaimModel.findByIdAndUpdate).toHaveBeenCalledWith('any-id', { totalAmount: calculationResult });
      expect(result).toEqual({ ...updatedClaim, totalAmount: calculationResult });
    });

    it('should handle null claim when adding damage', async () => {
      // First call for $push returns null
      mockClaimModel.findByIdAndUpdate.mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const calculationResult = 0;
      mockCalculator.calculate.mockReturnValue(calculationResult);
      mockClaimModel.findByIdAndUpdate.mockResolvedValueOnce(null);

      await service.addDamage('any-id', 'damage-id-1');

      expect(mockCalculator.calculate).toHaveBeenCalledWith([]);
      expect(mockClaimModel.findByIdAndUpdate).toHaveBeenCalledWith('any-id', { totalAmount: calculationResult });
    });
  });

  describe('updateTotalAmount', () => {
    it('should calculate and update the total amount of a claim', async () => {
      const damages = [{ price: 100 } as any, { price: 200 } as any];
      const calculationResult = 300;
      mockCalculator.calculate.mockReturnValue(calculationResult);
      mockClaimModel.findByIdAndUpdate.mockResolvedValueOnce({ ...mockClaim, totalAmount: calculationResult } as any);

      await service.updateTotalAmount('any-id', damages);

      expect(mockCalculator.calculate).toHaveBeenCalledWith(damages);
      expect(mockClaimModel.findByIdAndUpdate).toHaveBeenCalledWith('any-id', { totalAmount: calculationResult });
    });
  });

  describe('recalculateTotalAmount (internal)', () => {
    it('should use the calculator to determine the total', () => {
      const damages = [{ price: 10 } as any];
      service['recalculateTotalAmount'](damages);
      expect(mockCalculator.calculate).toHaveBeenCalledWith(damages);
    });
  });

  describe('isDescriptionGreatherThan100', () => {
    it('should return true when description is greater than 100 characters', () => {
      const longDescription = 'a'.repeat(101);

      const result = service.isDescriptionGreatherThan100(longDescription);

      expect(result).toBe(true);
    });

    it('should return false when description is exactly 100 characters', () => {
      const exactDescription = 'a'.repeat(100);

      const result = service.isDescriptionGreatherThan100(exactDescription);

      expect(result).toBe(false);
    });

    it('should return false when description is less than 100 characters', () => {
      const shortDescription = 'Short description';

      const result = service.isDescriptionGreatherThan100(shortDescription);

      expect(result).toBe(false);
    });

    it('should return false for empty string', () => {
      const result = service.isDescriptionGreatherThan100('');

      expect(result).toBe(false);
    });
  });

  describe('removeDamageFromClaim', () => {
    it('should remove a damage from a claim', async () => {
      const updatedClaim = { ...mockClaim, damages: [] };
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(updatedClaim),
      } as any);

      const result = await service.removeDamageFromClaim('any-id', 'damage-id-1');

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        'any-id',
        { $pull: { damages: 'damage-id-1' } },
        { new: true },
      );
      expect(result).toEqual(updatedClaim);
    });

    it('should handle removing non-existent damage', async () => {
      const updatedClaim = { ...mockClaim, damages: ['damage-id-1'] };
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        populate: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(updatedClaim),
      } as any);

      const result = await service.removeDamageFromClaim('any-id', 'non-existent-damage');

      expect(result).toEqual(updatedClaim);
    });
  });
});
