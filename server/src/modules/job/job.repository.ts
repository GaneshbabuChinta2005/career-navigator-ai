import { JobMatch, IJobMatch } from './job.schema';

export class JobRepository {
    async create(data: Partial<IJobMatch>): Promise<IJobMatch> {
        return JobMatch.create(data);
    }

    async findByUser(userId: string, sortBy = 'matchedAt', order: 'asc' | 'desc' = 'desc'): Promise<IJobMatch[]> {
        return JobMatch.find({ user: userId })
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .limit(50)
            .exec();
    }

    async findOne(userId: string, matchId: string): Promise<IJobMatch | null> {
        return JobMatch.findOne({ _id: matchId, user: userId }).exec();
    }

    async delete(userId: string, matchId: string): Promise<IJobMatch | null> {
        return JobMatch.findOneAndDelete({ _id: matchId, user: userId }).exec();
    }
}

export const jobRepository = new JobRepository();
