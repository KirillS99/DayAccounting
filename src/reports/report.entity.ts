import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('report')
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => UserEntity, (entity) => entity.id)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  text: string;

  @Column()
  total_time: number;
}
