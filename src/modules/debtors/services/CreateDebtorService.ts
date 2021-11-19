import { ResponseDebtorDTO } from "../../../modules/users/dtos/ResponseDTO";
import { startOfHour } from "date-fns";
import { getRepository } from "typeorm";
import Debtor from "../infra/typeorm/entities/Debtor";

interface Request {
  nameDebtor: string;
  date: Date;
  value: number;
  product: string;
  user_id: string;
}

class CreateDebtorService {
  public async execute({ nameDebtor, date, value, product, user_id }: Request): Promise<ResponseDebtorDTO> {
    const debtorsRepository = getRepository(Debtor);

    const debtorDate = startOfHour(date);

    const debtor = debtorsRepository.create({
      nameDebtor,
      date: debtorDate,
      value,
      product,
      user_id,
    });

    await debtorsRepository.save(debtor);

    const bodyData: ResponseDebtorDTO = {
      Success: true,
      Data: debtor,
    }
    return bodyData;
  }
}

export default CreateDebtorService;