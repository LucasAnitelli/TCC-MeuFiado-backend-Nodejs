import { Request, Response } from 'express';
import Debtor from '../../typeorm/entities/Debtor';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import { getRepository } from 'typeorm';
import CreateDebtorService from '@modules/debtors/services/CreateDebtorService';


export default class DebtorsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { nameDebtor, date, value, product } = request.body;

    const parsedDate = parseISO(date);

    const createDebtor = container.resolve(CreateDebtorService);

    const debtors = await createDebtor.execute({
      nameDebtor,
      date: parsedDate,
      value,
      product,
      user_id,
    });

    return response.json(debtors);
  }

  public async listFilter(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const debtorsRepository = getRepository(Debtor);
    const debtors = debtorsRepository
      .createQueryBuilder('debtors')
      .where('debtors.user_id in (:user_id)', { user_id })
      .andWhere("debtors.nameDebtor like :filter", { filter: `%${request.query.filter}%` })
      .orderBy("debtors.nameDebtor", 'ASC')
    const newDebtors = await debtors.getMany();
    if (newDebtors.length && !!request.query.filter) {
      return response.json({
        Data: newDebtors,
        Success: true,
      });
    }
    return response.status(404).json({
      Status: "error",
      Message: "Devedor não encontrado",
      Data: {},
      Success: false,
    })
  }

  public async listPagination(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const debtorsRepository = getRepository(Debtor);
    const page: number = parseInt(request.query.page as any) || 1;
    const perPage: number = parseInt(request.query.perPage as any) || 20;
    let offset = 0;
    offset = (page * perPage) - perPage;
    const debtors = debtorsRepository
      .createQueryBuilder('debtors')
      .where('debtors.user_id in (:user_id)', { user_id })
      .orderBy('debtors.date', 'DESC')
      .offset(offset)
      .limit(perPage);
    const TotalDebtors = await debtors.getCount();
    const list = await debtors.getMany();
    const TotalPages = Math.ceil(TotalDebtors / perPage);
    if (!!request.query.page && request.query.perPage) {
      return response.json({
        Data: list,
        TotalDebtors,
        TotalPages,
        Success: true,
      });
    }

    return response.status(404).json({
      Status: "error",
      Message: "Ocorreu um erro na hora de listar os devedores",
      Data: {},
      Success: false,
    });
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const debtorsRepository = getRepository(Debtor);
    const debtors = await debtorsRepository.update(id, request.body)

    if (debtors.affected === 1) {
      const debtorsUpdate = await debtorsRepository.findOne(id)
      return response.json({
        Data: debtorsUpdate,
        Success: true
      });
    }

    return response.status(404).json({
      Status: "error",
      Message: "Não foi possível encontrar este devedor",
      Data: {},
      Success: false,
    })
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const debtorsRepository = getRepository(Debtor);
    const debtors = await debtorsRepository.delete(id)

    if (debtors.affected === 1) {
      await debtorsRepository.findOne(id)
      return response.json({
        Data: {},
        Success: true
      });
    }

    return response.status(404).json({
      Status: "error",
      Message: "Não foi possível encontrar este devedor",
      Data: {},
      Success: false,
    })
  }

}

