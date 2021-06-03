import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Admin } from "../model/admin";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
    static getQueryRepository() {
        return getCustomRepository(AdminRepository);
    }
}