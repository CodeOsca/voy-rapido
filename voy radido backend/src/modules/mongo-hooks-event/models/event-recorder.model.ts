import { Schema, Document } from 'mongoose';

export interface EventRecorder {
  register<T extends Document>(modelName: string, schema: Schema<T>): void;
}
