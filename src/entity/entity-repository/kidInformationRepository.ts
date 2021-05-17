import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { kidInformation } from "../model/kid_information";

@EntityRepository(kidInformation)
export class KidInformationRepository extends Repository<kidInformation> {

    static getQueryRepository() {
        return getCustomRepository(KidInformationRepository);
    }

    public async getInformation(reservation_id: number): Promise<kidInformation> {
        return this.createQueryBuilder()
            .where("kidInformation.reservation_id = :id", { id: reservation_id})
            .getOne()
    }
}