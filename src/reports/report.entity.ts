import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;
}
