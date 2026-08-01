import Roadmap, { IRoadmap } from './roadmap.schema';

export class RoadmapRepository {
    async create(data: Partial<IRoadmap>): Promise<IRoadmap> {
        return Roadmap.create(data);
    }

    async findByUser(userId: string, status?: string): Promise<IRoadmap[]> {
        const filter: any = { user: userId };
        if (status) filter.status = status;
        return Roadmap.find(filter).sort({ createdAt: -1 }).exec();
    }

    async findOne(userId: string, roadmapId: string): Promise<IRoadmap | null> {
        return Roadmap.findOne({ _id: roadmapId, user: userId }).exec();
    }

    async findLatestByUser(userId: string): Promise<IRoadmap | null> {
        return Roadmap.findOne({ user: userId }).sort({ analyzedAt: -1 }).exec();
    }

    async archiveActive(userId: string): Promise<void> {
        await Roadmap.updateMany({ user: userId, status: 'active' }, { status: 'archived' });
    }

    async save(roadmap: any): Promise<IRoadmap> {
        return roadmap.save();
    }

    async delete(userId: string, roadmapId: string): Promise<IRoadmap | null> {
        return Roadmap.findOneAndDelete({ _id: roadmapId, user: userId }).exec();
    }
}

export const roadmapRepository = new RoadmapRepository();
