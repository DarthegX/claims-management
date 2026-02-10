import { ConfigService } from "@nestjs/config";

export const mongoConfig = async (configService: ConfigService) => {
    const mongoUri = configService.get<string>('MONGODB_URI');

    return {
        uri: mongoUri,
    };
}