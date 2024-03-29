import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDebtors1627268421751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "debtors",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                  generationStrategy: "uuid",
                  default: "uuid_generate_v4()",
                },
                {
                  name: "nameDebtor",
                  type: "varchar",
                },
                {
                  name: "date",
                  type: "timestamp with time zone",
                },
                {
                    name: "value",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                },
                {
                    name: "product",
                    type: "varchar",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("debtors");
    }

}
