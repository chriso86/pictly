import {LicenseDto} from './license.dto';

export interface GetLicensesDto {
    licenses: {
        license: LicenseDto[]
    };
}
