import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUserRelations1606256899011 implements MigrationInterface {
    name = 'addUserRelations1606256899011';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "areaId" uuid`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_6091d3897ce0fffab4bda473d5d" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6091d3897ce0fffab4bda473d5d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "areaId"`);
    }
}
