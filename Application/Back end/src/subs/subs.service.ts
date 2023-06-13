import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sub } from './subs.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriptionService {

    constructor(@InjectRepository(Sub) private subscriptionRepository : Repository<Sub>) {}

    async findAll(): Promise<Sub[]> {
        return await this.subscriptionRepository.find();
    }

    async findOne(id: number): Promise<Sub> {
        return await this.subscriptionRepository.findOneBy({id});
    }

    async findOneBySubscriberAndSubscribee(subscriberId: number, subscribeeId: number): Promise<Sub> {
        return await this.subscriptionRepository.findOne({
            where: {
                subscribedUser: { id: subscriberId },
                subscribeeUser: { id: subscribeeId }
            }
        })
    }

    async create(subscription: Sub): Promise<Sub> {
        return await this.subscriptionRepository.save(subscription);
    }

    async delete(id: number): Promise<void> {
        await this.subscriptionRepository.delete(id);
    }
}
