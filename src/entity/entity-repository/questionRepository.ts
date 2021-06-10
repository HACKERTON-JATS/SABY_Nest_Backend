import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Question } from "../model/question";

@EntityRepository(Question) 
export class QuestionRepository extends Repository<Question> {
    static getQueryRepository() {
        return getCustomRepository(QuestionRepository);
    }

    public async getAnswer(answer_id: number): Promise<string> {
        return await this.createQueryBuilder("question")
            .select("question.answer", "answer")
            .where("question.id = :id", { id: answer_id })
            .getRawOne()
    }
}