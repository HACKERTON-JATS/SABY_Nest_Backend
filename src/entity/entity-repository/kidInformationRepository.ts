import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { kidInformation } from "../model/kid_information";

@EntityRepository(kidInformation)
export class KidInformationRepository extends Repository<kidInformation> {

    static getQueryRepository() {
        return getCustomRepository(KidInformationRepository);
    }

    public async createInformation(reservationId: number, kidInformation: kidInformation): Promise<void> {
        await this.createQueryBuilder()
            .insert()
            .values([
                {
                    reservation_id: reservationId,
                    birth_date: kidInformation.birth_date,
                    kid_name: kidInformation.kid_name,
                    vaccination: kidInformation.vaccination,
                    fetus_name: kidInformation.fetus_name,
                    request: kidInformation.request,
                    caution: kidInformation.caution,
                    give_later: kidInformation.give_later
                }
            ])
            .execute()
    }
}