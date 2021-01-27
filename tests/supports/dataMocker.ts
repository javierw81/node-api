import { Model, Document } from 'mongoose'

class DataMocker {
    public async clean<M extends Document>(objectModel: Model<M>): Promise<any> {
        return objectModel.deleteMany({}).exec()
    }

    public async addData<M extends Document>(objectModel: Model<M>, data?: any[]): Promise<M | undefined> {
        if (data) {
            return objectModel.create(data);
        }
    }
}

export const dataMocker: DataMocker = new DataMocker();