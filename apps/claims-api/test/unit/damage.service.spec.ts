import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DamagesService } from '../../src/claims/application/damage.service';
import { Damage } from '../../src/claims/persistence/schemas/damage.schema';
import { Severity } from '../../src/claims/domain/severity.enum';

describe('DamagesService', () => {
    let service: DamagesService;
    let model: Model<Damage>;

    const mockDamage = {
        _id: 'damage-id',
        part: 'Front Bumper',
        imageURL: 'http://image.com',
        severity: Severity.LOW,
        price: 500,
        toJSON: jest.fn().mockReturnValue({
            _id: 'damage-id',
            part: 'Front Bumper',
            imageURL: 'http://image.com',
            severity: Severity.LOW,
            price: 500,
        }),
    };

    const mockDamageModel = {
        create: jest.fn().mockResolvedValue(mockDamage),
        findByIdAndUpdate: jest.fn().mockResolvedValue(mockDamage),
        findByIdAndDelete: jest.fn().mockResolvedValue(undefined),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DamagesService,
                {
                    provide: getModelToken(Damage.name),
                    useValue: mockDamageModel,
                },
            ],
        }).compile();

        service = module.get<DamagesService>(DamagesService);
        model = module.get<Model<Damage>>(getModelToken(Damage.name));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createDamage', () => {
        it('should create a damage and return the document', async () => {
            const dto = {
                part: 'Front Bumper',
                imageURL: 'http://image.com',
                severity: Severity.LOW,
                price: 500,
            };
            const result = await service.createDamage(dto as any);
            expect(result).toEqual(mockDamage);
            expect(model.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findHighSeverityDamagesByClaim', () => {
        it('should return true if there is a high severity damage', () => {
            const damages = [
                { severity: Severity.LOW },
                { severity: Severity.HIGH },
            ];
            const result = service.findHighSeverityDamagesByClaim(damages as any);
            expect(result).toBe(true);
        });

        it('should return false if there is no high severity damage', () => {
            const damages = [
                { severity: Severity.LOW },
                { severity: Severity.MID },
            ];
            const result = service.findHighSeverityDamagesByClaim(damages as any);
            expect(result).toBe(false);
        });

        it('should return false if the damages array is empty', () => {
            const result = service.findHighSeverityDamagesByClaim([]);
            expect(result).toBe(false);
        });
    });

    describe('updateDamage', () => {
        it('should update a damage', async () => {
            const dto = {
                part: 'Updated Part',
                imageURL: 'http://updated.com',
                severity: Severity.MID,
                price: 600,
            };
            await service.updateDamage('damage-id', dto as any);
            expect(model.findByIdAndUpdate).toHaveBeenCalledWith('damage-id', dto);
        });

        it('should handle non-existent damage update logging', async () => {
            mockDamageModel.findByIdAndUpdate.mockResolvedValueOnce(null);
            const dto = {
                part: 'Updated Part',
                imageURL: 'http://updated.com',
                severity: Severity.MID,
                price: 600,
            };
            await service.updateDamage('non-existent', dto as any);
            expect(model.findByIdAndUpdate).toHaveBeenCalledWith('non-existent', dto);
        });
    });

    describe('deleteDamage', () => {
        it('should delete a damage', async () => {
            await service.deleteDamage('damage-id');
            expect(model.findByIdAndDelete).toHaveBeenCalledWith('damage-id');
        });
    });
});
